'use client'

import { useEffect, useRef, useState } from 'react'
import { CONFIGURATOR_MODELS } from '@/lib/data'

interface ConfigModel {
  model: string
  name: string
  flight: string
  speed: string
  range: string
  payload: string
  active?: boolean
}

export default function Drone3DViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const hintRef   = useRef<HTMLSpanElement>(null)

  const [activeModel, setActiveModel] = useState<ConfigModel>(
    CONFIGURATOR_MODELS.find(m => m.active) ?? CONFIGURATOR_MODELS[1]
  )
  const [mission, setMission] = useState('Штурм')
  const [range,   setRange  ] = useState('10 км')
  const [payload, setPayload] = useState('3 кг · ударний')

  const droneTargetYRef = useRef(0)
  const controlsRef     = useRef<any>(null)

  useEffect(() => {
    if (!canvasRef.current || !wrapRef.current) return

    let animId: number
    let ro: ResizeObserver

    ;(async () => {
      const THREE = await import('three')
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js' as any)

      const canvas = canvasRef.current!
      const wrap   = wrapRef.current!
      const hint   = hintRef.current

      const W = () => Math.max(wrap.offsetWidth,  1)
      const H = () => Math.max(wrap.offsetHeight, 1)

      // Renderer
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W(), H())
      renderer.toneMapping        = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.35

      // Scene
      const scene = new THREE.Scene()

      // Camera
      const camera = new THREE.PerspectiveCamera(38, W() / H(), 0.05, 100)
      camera.position.set(3.8, 2.2, 4.4)

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping   = true
      controls.dampingFactor   = 0.07
      controls.autoRotate      = true
      controls.autoRotateSpeed = 0.85
      controls.enableZoom      = false
      controls.minPolarAngle   = Math.PI * 0.1
      controls.maxPolarAngle   = Math.PI * 0.7
      controls.target.set(0, 0.05, 0)
      controlsRef.current = controls

      controls.addEventListener('start', () => { controls.autoRotate = false })

      canvas.addEventListener('pointerdown', () => {
        if (hint) hint.classList.add('hidden')
      }, { once: true })

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 1.6))

      const keyLight = new THREE.DirectionalLight(0xfff5e8, 4.5)
      keyLight.position.set(6, 10, 7)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0x9bb8ff, 2.2)
      fillLight.position.set(-6, 4, 3)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0xffffff, 3.0)
      rimLight.position.set(4, 3, -8)
      scene.add(rimLight)

      const goldBounce = new THREE.PointLight(0xC8A84B, 3.5, 14)
      goldBounce.position.set(2, -1.5, 3)
      scene.add(goldBounce)

      const underFill = new THREE.PointLight(0x4466aa, 1.2, 12)
      underFill.position.set(-2, -3, -2)
      scene.add(underFill)

      // Materials
      const steelMat     = new THREE.MeshStandardMaterial({ color: 0x9aacba, roughness: 0.14, metalness: 0.94 })
      const steelDarkMat = new THREE.MeshStandardMaterial({ color: 0x6a7a88, roughness: 0.18, metalness: 0.92 })
      const polishedMat  = new THREE.MeshStandardMaterial({ color: 0xd8e4ee, roughness: 0.06, metalness: 0.98 })
      const motorBellMat = new THREE.MeshStandardMaterial({ color: 0xbcccda, roughness: 0.08, metalness: 0.97 })
      const propMat      = new THREE.MeshStandardMaterial({ color: 0x3a4858, roughness: 0.30, metalness: 0.82, side: THREE.DoubleSide })
      const goldMat      = new THREE.MeshStandardMaterial({ color: 0xC8A84B, roughness: 0.12, metalness: 0.96 })
      const batteryMat   = new THREE.MeshStandardMaterial({ color: 0x2a3a4c, roughness: 0.65, metalness: 0.45 })
      const pcbMat       = new THREE.MeshStandardMaterial({ color: 0x182a3a, roughness: 0.60, metalness: 0.35 })
      const redMat       = new THREE.MeshStandardMaterial({ color: 0xaa1a1a, roughness: 0.7,  metalness: 0.15 })

      // Helpers
      const box = (w: number, h: number, d: number, mat: THREE.Material) =>
        new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
      const cyl = (rt: number, rb: number, h: number, seg: number, mat: THREE.Material) =>
        new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat)

      // Build drone
      const drone = new THREE.Group()
      scene.add(drone)

      const topPlate = box(1.55, 0.038, 0.88, steelMat)
      topPlate.position.set(0, 0.19, 0)
      drone.add(topPlate)

      const botPlate = box(1.55, 0.038, 0.88, steelMat)
      botPlate.position.set(0, -0.06, 0)
      drone.add(botPlate)

      ;[0.72, -0.72].forEach(xPos => {
        const bar = box(0.06, 0.18, 0.82, steelDarkMat)
        bar.position.set(xPos, 0.07, 0)
        drone.add(bar)
      })

      const standoffGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.27, 8)
      ;[[-0.52, -0.32], [-0.52, 0.32], [0.52, -0.32], [0.52, 0.32]].forEach(([x, z]) => {
        const s = new THREE.Mesh(standoffGeo, goldMat)
        s.position.set(x, 0.065, z)
        drone.add(s)
      })

      const stack = box(0.62, 0.10, 0.58, pcbMat)
      stack.position.set(0, 0.125, 0)
      drone.add(stack)

      const battery = box(0.85, 0.12, 0.48, batteryMat)
      battery.position.set(0, -0.19, 0)
      drone.add(battery)

      const strap = box(0.88, 0.018, 0.52, redMat)
      strap.position.set(0, -0.13, 0)
      drone.add(strap)

      const camMount = box(0.09, 0.21, 0.05, steelDarkMat)
      camMount.position.set(0.67, 0.06, 0)
      drone.add(camMount)

      const camBody = box(0.08, 0.14, 0.12, polishedMat)
      camBody.position.set(0.72, 0.07, 0)
      drone.add(camBody)

      const camLens = cyl(0.052, 0.052, 0.055, 16, motorBellMat)
      camLens.rotation.z = Math.PI / 2
      camLens.position.set(0.757, 0.07, 0)
      drone.add(camLens)

      const lensRing = cyl(0.056, 0.056, 0.01, 16, goldMat)
      lensRing.rotation.z = Math.PI / 2
      lensRing.position.set(0.746, 0.07, 0)
      drone.add(lensRing)

      const antBase = cyl(0.016, 0.016, 0.08, 8, steelDarkMat)
      antBase.position.set(-0.4, 0.26, -0.22)
      drone.add(antBase)
      const antTop = cyl(0.01, 0.01, 0.55, 8, new THREE.MeshStandardMaterial({ color: 0x445566, roughness: 0.7, metalness: 0.6 }))
      antTop.position.set(-0.4, 0.62, -0.22)
      drone.add(antTop)

      const gpsPuck = cyl(0.085, 0.085, 0.024, 16, new THREE.MeshStandardMaterial({ color: 0x2a3a4a, roughness: 0.5, metalness: 0.6 }))
      gpsPuck.position.set(-0.3, 0.215, 0.25)
      drone.add(gpsPuck)

      // Arms + Motors + Props
      const ARM_CONFIGS = [
        { angle:  45, x:  1, z:  1 },
        { angle: -45, x:  1, z: -1 },
        { angle: 135, x: -1, z:  1 },
        { angle: 225, x: -1, z: -1 },
      ]
      const ARM_REACH = 0.86
      const propGroups: { group: THREE.Group; dir: number }[] = []
      const propDirs = [1, -1, -1, 1]

      ARM_CONFIGS.forEach(({ angle, x, z }, i) => {
        const rad = (angle * Math.PI) / 180

        const arm = box(1.82, 0.06, 0.09, steelDarkMat)
        arm.rotation.y = -rad + Math.PI / 2
        arm.position.set(x * 0.44, 0.065, z * 0.44)
        drone.add(arm)

        const mx = x * ARM_REACH, mz = z * ARM_REACH

        const mBase  = cyl(0.095, 0.095, 0.052, 16, steelMat);    mBase.position.set(mx, 0.04,  mz); drone.add(mBase)
        const mBody  = cyl(0.085, 0.09,  0.075, 16, polishedMat); mBody.position.set(mx, 0.10,  mz); drone.add(mBody)
        const mBell  = cyl(0.095, 0.085, 0.068, 16, motorBellMat); mBell.position.set(mx, 0.165, mz); drone.add(mBell)
        const mShaft = cyl(0.012, 0.012, 0.075, 8,  goldMat);     mShaft.position.set(mx, 0.21,  mz); drone.add(mShaft)
        const mHub   = cyl(0.022, 0.022, 0.035, 12, polishedMat); mHub.position.set(mx, 0.245, mz); drone.add(mHub)

        const propGroup = new THREE.Group()
        propGroup.position.set(mx, 0.252, mz)

        const bladeShape = new THREE.Shape()
        bladeShape.moveTo(0, -0.04)
        bladeShape.quadraticCurveTo(0.18, -0.045, 0.58, 0)
        bladeShape.quadraticCurveTo(0.36,  0.06,  0,    0.032)
        bladeShape.closePath()
        const bladeGeo = new THREE.ShapeGeometry(bladeShape, 12)

        ;[-1, 1].forEach(dir => {
          const bg = new THREE.Group()
          const blade = new THREE.Mesh(bladeGeo, propMat)
          blade.rotation.x = -Math.PI / 2
          bg.rotation.y = dir > 0 ? 0 : Math.PI
          bg.rotation.z = dir * 0.055
          bg.add(blade)
          propGroup.add(bg)
        })

        propGroups.push({ group: propGroup, dir: propDirs[i] })
        drone.add(propGroup)
      })

      // Animate
      function animate() {
        animId = requestAnimationFrame(animate)
        controls.update()

        drone.rotation.y += (droneTargetYRef.current - drone.rotation.y) * 0.08
        propGroups.forEach(({ group, dir }) => { group.rotation.y += dir * 0.38 })
        drone.position.y = Math.sin(performance.now() * 0.001 * 1.1) * 0.018

        renderer.render(scene, camera)
      }
      animate()

      // Sync size
      function syncSize() {
        const w = W(), h = H()
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      syncSize()
      setTimeout(syncSize, 50)
      setTimeout(syncSize, 200)

      ro = new ResizeObserver(syncSize)
      ro.observe(wrap)
    })()

    return () => {
      if (animId) cancelAnimationFrame(animId)
      if (ro) ro.disconnect()
    }
  }, [])

  function handleLeft() {
    if (controlsRef.current) controlsRef.current.autoRotate = false
    droneTargetYRef.current -= Math.PI / 4
  }

  function handleRight() {
    if (controlsRef.current) controlsRef.current.autoRotate = false
    droneTargetYRef.current += Math.PI / 4
  }

  return (
    <section id="drone3d">
      {/* 3D canvas + controls (65%) */}
      <div className="drone3d-viewer" data-reveal="left">
        <div className="drone3d-canvas-wrap" ref={wrapRef}>
          <canvas id="drone3dCanvas" ref={canvasRef} />
        </div>
        <div className="drone3d-controls">
          <button className="d3d-ctrl-btn" onClick={handleLeft} title="Повернути ліворуч">
            <svg viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6" /></svg>
          </button>
          <span className="d3d-ctrl-hint" ref={hintRef} id="drone3dHint">
            <svg viewBox="0 0 24 24">
              <path d="M9 3H5a2 2 0 0 0-2 2v4m0 6v4a2 2 0 0 0 2 2h4M21 9V5a2 2 0 0 0-2-2h-4m6 12v4a2 2 0 0 0-2 2h-4" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Drag to rotate
          </span>
          <button className="d3d-ctrl-btn" onClick={handleRight} title="Повернути праворуч">
            <svg viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6" /></svg>
          </button>
        </div>
      </div>

      {/* Configurator panel (35%) */}
      <div className="drone3d-panel" data-reveal="">
        <div className="d3d-panel-inner">
          <div>
            <div className="d3d-model-tag">OK · MOND — Конфігуратор</div>
            <div className="d3d-model-name">{activeModel.name}</div>
          </div>

          {/* Model select */}
          <div className="d3d-group">
            <div className="d3d-group-label">Модель</div>
            <div className="d3d-pills">
              {CONFIGURATOR_MODELS.map(m => (
                <button
                  key={m.model}
                  className={`d3d-pill${activeModel.model === m.model ? ' active' : ''}`}
                  onClick={() => setActiveModel(m)}
                >
                  {m.model}
                </button>
              ))}
            </div>
          </div>

          {/* Mission type */}
          <div className="d3d-group">
            <div className="d3d-group-label">Місія</div>
            <div className="d3d-pills">
              {['Штурм', 'Розвідка', 'Ретрансляція'].map(m => (
                <button key={m} className={`d3d-pill${mission === m ? ' active' : ''}`} onClick={() => setMission(m)}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Range */}
          <div className="d3d-group">
            <div className="d3d-group-label">Дальність</div>
            <div className="d3d-pills">
              {['1 км', '5 км', '10 км', '15+ км'].map(r => (
                <button key={r} className={`d3d-pill${range === r ? ' active' : ''}`} onClick={() => setRange(r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Payload */}
          <div className="d3d-group">
            <div className="d3d-group-label">Навантаження</div>
            <div className="d3d-pills">
              {['3 кг · ударний', '0.8 кг · рейд', '0.5 кг · розвідка'].map(p => (
                <button key={p} className={`d3d-pill${payload === p ? ' active' : ''}`} onClick={() => setPayload(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="d3d-spec-block">
            {[
              { label: 'Час польоту', value: activeModel.flight },
              { label: 'Швидкість',   value: activeModel.speed  },
              { label: 'Дальність',   value: activeModel.range  },
              { label: 'Навантаження',value: activeModel.payload },
            ].map(({ label, value }) => (
              <div key={label} className="d3d-spec-row">
                <span>{label}</span>
                <span className="d3d-spec-val">{value}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary d3d-cta">Зв&apos;язатися з нами →</button>
        </div>
      </div>
    </section>
  )
}
