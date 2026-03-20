'use client'

import dynamic from 'next/dynamic'

const Drone3DViewer = dynamic(() => import('./Drone3DViewer'), {
  ssr: false,
  loading: () => (
    <section id="drone3d" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '800px', background: 'var(--bg)' }}>
      <div style={{ color: 'var(--gray)', fontFamily: 'var(--font-condensed)', letterSpacing: '0.2em', fontSize: '12px' }}>
        ЗАВАНТАЖЕННЯ 3D МОДЕЛІ…
      </div>
    </section>
  ),
})

export default function Drone3D() {
  return <Drone3DViewer />
}
