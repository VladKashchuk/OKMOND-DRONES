'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { HERO_SEQ } from '@/lib/data'

export default function Hero() {
  useEffect(() => {
    function runHeroEntrance() {
      const nav = document.querySelector('nav') as HTMLElement | null
      const heroBg = document.querySelector('.hero-bg-image') as HTMLElement | null
      if (nav) nav.style.animation = 'navIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards'
      if (heroBg) heroBg.style.animation = 'heroBgIn 1.4s cubic-bezier(0.16,1,0.3,1) forwards'

      HERO_SEQ.forEach(({ sel, delay }) => {
        const el = document.querySelector(sel) as HTMLElement | null
        if (!el) return
        setTimeout(() => el.classList.add('is-hero'), delay + 80)
      })
    }

    window.addEventListener('preloaderDone', runHeroEntrance, { once: true })
    if (!document.getElementById('preloader')) runHeroEntrance()

    // Count-up for hero card value
    function animateCount(el: HTMLElement, duration = 1400) {
      const savedHtml = el.innerHTML
      const match = el.textContent?.trim().match(/^(\d+)/)
      if (!match) return
      const target = parseInt(match[1])
      const restHtml = savedHtml.replace(/^\d+/, '')
      const startTime = performance.now()

      function tick(now: number) {
        const p = Math.min((now - startTime) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        el.innerHTML = Math.round(ease * target) + restHtml
        if (p < 1) requestAnimationFrame(tick)
        else el.innerHTML = target + restHtml
      }
      requestAnimationFrame(tick)
    }

    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement
        if (entry.isIntersecting && !target.dataset.counted) {
          target.dataset.counted = '1'
          animateCount(target)
          countObs.unobserve(target)
        }
      })
    }, { threshold: 0.5 })

    document.querySelectorAll<HTMLElement>('.hcl-value').forEach(el => {
      countObs.observe(el)
    })

    return () => {
      window.removeEventListener('preloaderDone', runHeroEntrance)
      countObs.disconnect()
    }
  }, [])

  return (
    <section id="hero">
      <Image
        className="hero-bg-image"
        src="/images/1P7A1367.JPG"
        alt="OKMOND-7 Drone"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        priority
      />
      <div className="hero-overlay"></div>
      <div className="hero-tint"></div>

      <div className="hero-vert-label" data-hero="fade">
        PRECISION · DOMINANCE · UKRAINE · 2024
      </div>

      <div className="hero-topleft-label">
        <div className="htl-overline" data-hero="left">Ukrainian Defense Technology</div>
        <h3 data-hero="left">
          Зброя<br />нового покоління/
        </h3>
      </div>

      <div className="hero-headline-wrap">
        <h1 data-hero="right">
          ТАКТИЧНІ БПЛА<br />
          <span className="hl-gold">OKMOND</span>
        </h1>
        <div className="hero-sub-right" data-hero="">
          <p>
            <strong>Для сил спеціальних операцій.</strong><br />
            Розроблено в Україні для реального<br />бойового застосування.
          </p>
          <a href="#" className="hero-arrow-btn">
            <svg viewBox="0 0 24 24" strokeWidth="1.5">
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="9,5 19,5 19,15" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-cards">
        <div className="hero-card-light" data-hero="scale">
          <div className="hcl-label">Час польоту</div>
          <div className="hcl-value">45</div>
          <div className="hcl-sub">хвилин · OK-7 Assault</div>
        </div>
        <div className="hero-card-dark" data-hero="scale">
          <div className="hcd-header">
            <div className="hcd-title">OKMOND-7</div>
            <div className="hcd-icon">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
              </svg>
            </div>
          </div>
          <p className="hcd-text">
            Штурмовий квадрокоптер з корисним навантаженням 3 кг. Захищений канал зв&apos;язку, Carbon Fiber 5 мм.
          </p>
        </div>
      </div>

      <div className="hero-tags" data-hero="fade">
        <div className="hero-tag-star">✦</div>
        <span className="hero-tag">ASSAULT CLASS</span>
        <span className="hero-tag">FPV RAID</span>
        <span className="hero-tag">РОЗВІДКА</span>
        <span className="hero-tag">РЕТРАНСЛЯЦІЯ</span>
      </div>

      <div className="hero-strip" data-hero="fade">
        <span>48°27&apos;N&nbsp;&nbsp;35°01&apos;E — UKRAINE</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div className="hero-strip-dot"></div>
          <span>СИСТЕМА АКТИВНА · ГОТОВА ДО МІСІЇ</span>
        </div>
        <span>MODEL: OK-7 / OK-FPV</span>
      </div>
    </section>
  )
}
