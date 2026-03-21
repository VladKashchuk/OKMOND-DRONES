'use client'

import { useEffect, useRef } from 'react'

export default function Preloader() {
  const preRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!preRef.current || !numRef.current || !barRef.current) return
    const pre   = preRef.current as HTMLDivElement
    const numEl = numRef.current as HTMLSpanElement
    const barEl = barRef.current as HTMLDivElement

    // Block scroll while preloader is active
    document.body.classList.add('preloading')

    const DURATION = 2400

    function ease(t: number) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }

    const t0 = performance.now()
    let done = false
    let rafId: number

    function tick(now: number) {
      if (done) return
      const raw = Math.min((now - t0) / DURATION, 1)
      const val = Math.round(ease(raw) * 100)

      numEl.textContent = String(val)
      barEl.style.width = val + '%'

      if (raw < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        done = true
        numEl.textContent = '100'
        barEl.style.width = '100%'

        setTimeout(() => {
          pre.classList.add('pre-exit')

          pre.addEventListener(
            'animationend',
            () => {
              pre.style.display = 'none'
              document.body.classList.remove('preloading')
              document.body.style.overflow = ''
              window.dispatchEvent(new CustomEvent('preloaderDone'))
            },
            { once: true }
          )
        }, 380)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div id="preloader" ref={preRef}>
      <div className="pre-top">
        <span className="pre-brand">OKMOND · DRONES — UAV SYSTEMS</span>
        <span className="pre-ver">v2.4 · 2024</span>
      </div>
      <div className="pre-bottom">
        <div className="pre-row">
          <span className="pre-label">Ініціалізація систем</span>
          <div className="pre-counter">
            <span id="preNum" ref={numRef}>0</span>
            <span className="pre-sym">%</span>
          </div>
        </div>
        <div className="pre-bar-track">
          <div id="preBar" ref={barRef}></div>
        </div>
      </div>
    </div>
  )
}
