'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SHOWCASE_MODELS } from '@/lib/data'

export default function Showcase() {
  const [activeTab, setActiveTab] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const specValsRef = useRef<NodeListOf<HTMLElement> | null>(null)

  useEffect(() => {
    specValsRef.current = document.querySelectorAll<HTMLElement>('.spec-strip-value')
  }, [])

  function handleTabClick(i: number) {
    if (i === activeTab) return

    const img = imgRef.current
    const title = titleRef.current
    const specVals = specValsRef.current

    if (img) img.classList.add('fading')
    if (title) title.classList.add('fading')

    setTimeout(() => {
      setActiveTab(i)
      if (img) {
        img.classList.remove('fading')
      }
      if (title) title.classList.remove('fading')
      if (specVals) {
        specVals.forEach((v, idx) => {
          if (idx < 4) v.textContent = SHOWCASE_MODELS[i].specs[idx]
        })
      }
    }, 380)
  }

  const current = SHOWCASE_MODELS[activeTab]

  return (
    <section id="showcase">
      <div className="showcase-bg-title" data-reveal="fade">OK-7</div>
      <div className="showcase-overline" data-reveal="">
        <span className="overline">Серія OKMOND · Assault Class</span>
      </div>
      <div className="showcase-subtitle" ref={titleRef} data-reveal="">
        {current.title}
      </div>

      <div className="showcase-image-wrap" data-reveal="scale">
        <Image
          ref={imgRef as React.Ref<HTMLImageElement>}
          src={current.img}
          alt="Showcase drone"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </div>

      <div className="showcase-tabs" data-reveal="fade">
        <div
          className={`showcase-tab${activeTab === 0 ? ' active' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          <div className="tab-model">OK-7</div>
          <div className="tab-role">Assault Quadcopter</div>
        </div>
        <div
          className={`showcase-tab${activeTab === 1 ? ' active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          <div className="tab-model">OK-FPV</div>
          <div className="tab-role">FPV Raid Drone</div>
        </div>
        <div
          className={`showcase-tab${activeTab === 2 ? ' active' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          <div className="tab-model">OK-RECON</div>
          <div className="tab-role">Reconnaissance</div>
        </div>
        <div
          className={`showcase-tab${activeTab === 3 ? ' active' : ''}`}
          onClick={() => handleTabClick(3)}
        >
          <div className="tab-model">OK-RELAY</div>
          <div className="tab-role">Signal Relay</div>
        </div>
      </div>

      <div className="spec-strip">
        <div className="spec-strip-item" data-reveal="" data-delay="1">
          <div className="spec-strip-label">Дальність</div>
          <div className="spec-strip-value">{current.specs[0]}</div>
        </div>
        <div className="spec-strip-item" data-reveal="" data-delay="2">
          <div className="spec-strip-label">Навантаження</div>
          <div className="spec-strip-value">{current.specs[1]}</div>
        </div>
        <div className="spec-strip-item" data-reveal="" data-delay="3">
          <div className="spec-strip-label">Швидкість</div>
          <div className="spec-strip-value">{current.specs[2]}</div>
        </div>
        <div className="spec-strip-item" data-reveal="" data-delay="4">
          <div className="spec-strip-label">Маса</div>
          <div className="spec-strip-value">{current.specs[3]}</div>
        </div>
        <div
          className="spec-strip-item"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '80px' }}
        >
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              textDecoration: 'none',
              fontWeight: 400,
            }}
          >
            → ПОВНА СПЕЦИФІКАЦІЯ
          </a>
        </div>
      </div>
    </section>
  )
}
