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

/* Card pixel widths per breakpoint — must match globals.css */
function getCardSizes() {
  if (typeof window === 'undefined') return { lg: 360, md: 270, sm: 220, gap: 10 }
  const vw = window.innerWidth
  if (vw <= 768) return { lg: 260, md: 200, sm: 160, gap: 8 }
  return { lg: 360, md: 270, sm: 220, gap: 10 }
}

/* Pixel offset from center for a given rel position */
function getOffset(
  rel: number,
  s: { lg: number; md: number; sm: number; gap: number },
) {
  const a = Math.abs(rel)
  const sign = rel > 0 ? 1 : -1
  if (a === 0) return 0
  if (a === 1) return sign * (s.lg / 2 + s.gap + s.md / 2)
  if (a === 2) return sign * (s.lg / 2 + s.gap + s.md + s.gap + s.sm / 2)
  // hidden cards — park off-screen so they never flash in view
  return sign * (s.lg / 2 + s.gap + s.md + s.gap + s.sm + 300)
}

export default function ShowcaseV2() {
  const [activeIdx, setActiveIdx] = useState(2) // OK-7 ASSAULT starts featured
  const [initialized, setInitialized] = useState(false)
  const [sizes, setSizes] = useState({ lg: 360, md: 270, sm: 220, gap: 10 })
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSizes(getCardSizes())
    setInitialized(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setInitialized(true)
      })
    })

    const onResize = () => setSizes(getCardSizes())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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

      {/* Carousel — absolutely positioned cards, animated via transform */}
      <div className="sv2-track" data-reveal="scale" ref={trackRef}>
        {CAROUSEL_CARDS.map((card, idx) => {
          let rel = idx - activeIdx
          if (rel > N / 2) rel -= N
          if (rel < -N / 2) rel += N

          const visible = Math.abs(rel) <= 2
          const size = sizeOf(rel)
          const isActive = rel === 0
          const offset = getOffset(rel, sizes)

          return (
            <div
              key={idx}
              className={`sv2-card ${size}${isActive ? ' active-card' : ''}`}
              style={{
                transform: `translateX(calc(-50% + ${offset}px))`,
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? undefined : 'none',
                transition: initialized ? undefined : 'none',
                zIndex: 3 - Math.min(Math.abs(rel), 3),
                cursor: isActive ? 'default' : 'pointer',
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
