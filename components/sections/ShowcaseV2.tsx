'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { CAROUSEL_CARDS } from '@/lib/data'

const N = CAROUSEL_CARDS.length

function sizeOf(rel: number) {
  if (rel === 0) return 'lg'
  if (Math.abs(rel) === 1) return 'md'
  return 'sm'
}

export default function ShowcaseV2() {
  const [activeIdx, setActiveIdx] = useState(2) // OK-7 ASSAULT starts featured
  const [initialized, setInitialized] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable transitions for initial paint
    setInitialized(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setInitialized(true)
      })
    })
  }, [])

  function navigateTo(newIdx: number) {
    setActiveIdx(newIdx)
  }

  function navigateBy(delta: number) {
    navigateTo(((activeIdx + delta) % N + N) % N)
  }

  const activeCard = CAROUSEL_CARDS[activeIdx]

  return (
    <section id="showcase-v2">
      <div className="sv2-header" data-reveal="">
        <div className="sv2-title-row">
          <div className="sv2-title">
            <span className="t-dim">ЛІНІЙКА</span><br />
            <span className="t-bright">ПРОДУКТІВ</span><br />
            <span className="t-gold">OKMOND</span>
          </div>
          <div className="sv2-header-right">
            <p>Від легкого FPV рейдера до важкого штурмового квадрокоптера — кожна модель спроектована під конкретну бойову задачу.</p>
            <div className="sv2-nav">
              <a
                href="#"
                className="sv2-nav-btn"
                onClick={e => { e.preventDefault(); navigateBy(-1) }}
              >
                <svg viewBox="0 0 24 24" strokeWidth="1.5"><polyline points="15,18 9,12 15,6" /></svg>
              </a>
              <a
                href="#"
                className="sv2-nav-btn"
                style={{ borderColor: 'rgba(200,168,75,0.4)' }}
                onClick={e => { e.preventDefault(); navigateBy(1) }}
              >
                <svg viewBox="0 0 24 24" strokeWidth="1.5" style={{ stroke: 'var(--gold)' }}><polyline points="9,6 15,12 9,18" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel cards track */}
      <div className="sv2-track" data-reveal="scale" ref={trackRef}>
        {CAROUSEL_CARDS.map((card, idx) => {
          let rel = idx - activeIdx
          if (rel > N / 2) rel -= N
          if (rel < -N / 2) rel += N

          const visible = Math.abs(rel) <= 2
          const size = sizeOf(rel)
          const isActive = rel === 0

          return (
            <div
              key={idx}
              className={`sv2-card ${size}${isActive ? ' active-card' : ''}`}
              style={{
                order: rel,
                cursor: isActive ? 'default' : 'pointer',
                width: !visible ? '0' : undefined,
                opacity: !visible ? 0 : undefined,
                pointerEvents: !visible ? 'none' : undefined,
                transition: initialized ? undefined : 'none',
              }}
              onClick={() => {
                if (!isActive) navigateTo(idx)
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image src={card.img} alt={card.model.replace('\n', ' ')} fill className="object-cover" />
              </div>
              <div className="sv2-card-inner">
                <span
                  className="sv2-card-badge"
                  style={card.gold ? { borderColor: 'rgba(200,168,75,.6)', background: 'rgba(200,168,75,.1)' } : undefined}
                >
                  {card.badge}
                </span>
                <div className="sv2-card-foot">
                  <div
                    className="sv2-card-model"
                    style={{ fontSize: isActive ? '48px' : undefined }}
                    dangerouslySetInnerHTML={{ __html: card.model.replace('\n', '<br>') }}
                  />
                  <div className="sv2-card-role">{card.role}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="sv2-bottom">
        {activeCard.bottomLabels.map((label, i) => (
          <div key={i} className="sv2-bottom-item" data-reveal="" data-delay={i > 0 ? String(Math.min(i, 6)) : undefined}>
            <div className="sv2-bottom-label">{label}</div>
            <div className="sv2-bottom-value">{activeCard.bottomVals[i]}</div>
          </div>
        ))}
        <div className="sv2-bottom-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '80px' }}>
          <a href="#" style={{ fontFamily: 'var(--font-condensed)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', fontWeight: 400 }}>
            → ВСІ ПРОДУКТИ
          </a>
        </div>
      </div>
    </section>
  )
}
