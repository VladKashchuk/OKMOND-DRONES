'use client'

import { useEffect } from 'react'

function useScrollReveal() {
  useEffect(() => {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            revealObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => revealObs.observe(el))

    return () => revealObs.disconnect()
  }, [])
}

function useCountUp() {
  useEffect(() => {
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

    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting && !target.dataset.counted) {
            target.dataset.counted = '1'
            animateCount(target)
            countObs.unobserve(target)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll<HTMLElement>('.stat-value, .trust-stat-num').forEach((el) => {
      countObs.observe(el)
    })

    return () => countObs.disconnect()
  }, [])
}

export default function Features() {
  useScrollReveal()
  useCountUp()

  return (
    <section id="features">
      <div className="features-bg-text">БПЛА</div>

      <div className="features-header">
        <h2 className="features-title" data-reveal="left">
          БОЙОВІ<br />МОЖЛИВОСТІ
        </h2>
        <p className="features-desc" data-reveal="">
          Кожна система спроектована з урахуванням
          реального бойового застосування — від розвідки
          до точного ураження цілі на відстані до 10 км.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-item" data-reveal="" data-delay="1">
          <div className="feature-num">01</div>
          <div className="feature-title">Точність<br />Ураження</div>
          <p className="feature-text">
            Інтегрована FPV-система з затримкою менше 28 мс.
            Двоканальний відеосигнал із захищеним шифруванням
            забезпечує точне наведення на ціль у реальному часі.
          </p>
        </div>
        <div className="feature-item" data-reveal="" data-delay="2">
          <div className="feature-num">02</div>
          <div className="feature-title">Захищений<br />Зв&apos;язок</div>
          <p className="feature-text">
            Протокол FHSS зі 128-бітним шифруванням.
            Стійкість до засобів РЕБ підтверджена в польових умовах.
            Дальність керування до 10 км без втрати сигналу.
          </p>
        </div>
        <div className="feature-item" data-reveal="" data-delay="3">
          <div className="feature-num">03</div>
          <div className="feature-title">Карбоновий<br />Корпус</div>
          <p className="feature-text">
            Рамка з карбонового волокна 5 мм — легка, жорстка,
            стійка до ударів. Виготовлено в Україні. Робочий діапазон
            температур від -20°C до +55°C.
          </p>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item" data-reveal="" data-delay="1">
          <div className="stat-value">10<span>КМ</span></div>
          <div className="stat-label">Радіус зв&apos;язку</div>
        </div>
        <div className="stat-item" data-reveal="" data-delay="2">
          <div className="stat-value">45<span>ХВ</span></div>
          <div className="stat-label">Час польоту</div>
        </div>
        <div className="stat-item" data-reveal="" data-delay="3">
          <div className="stat-value">3<span>КГ</span></div>
          <div className="stat-label">Корисне навантаження</div>
        </div>
        <div className="stat-item" data-reveal="" data-delay="4">
          <div className="stat-value">99<span>%</span></div>
          <div className="stat-label">Точність цілі</div>
        </div>
      </div>
    </section>
  )
}
