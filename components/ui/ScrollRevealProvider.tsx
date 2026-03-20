'use client'

import { useEffect } from 'react'
import { HERO_SEQ } from '@/lib/data'

export default function ScrollRevealProvider() {
  useEffect(() => {
    // ── Scroll reveal via IntersectionObserver ──
    const revealObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            revealObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el))

    // ── Count-up animation ──
    function animateCount(el: Element, duration = 1400) {
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
      entries => {
        entries.forEach(entry => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting && !el.dataset.counted) {
            el.dataset.counted = '1'
            animateCount(el)
            countObs.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('.stat-value, .trust-stat-num, .hcl-value').forEach(el => {
      countObs.observe(el)
    })

    // ── Hero entrance ──
    function runHeroEntrance() {
      const nav    = document.querySelector<HTMLElement>('nav')
      const heroBg = document.querySelector<HTMLElement>('.hero-bg-image')
      if (nav)    nav.style.animation    = 'navIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards'
      if (heroBg) heroBg.style.animation = 'heroBgIn 1.4s cubic-bezier(0.16,1,0.3,1) forwards'

      HERO_SEQ.forEach(({ sel, delay }) => {
        const el = document.querySelector(sel)
        if (!el) return
        setTimeout(() => el.classList.add('is-hero'), delay + 80)
      })
    }

    window.addEventListener('preloaderDone', runHeroEntrance, { once: true })
    if (!document.getElementById('preloader')) runHeroEntrance()

    return () => {
      revealObs.disconnect()
      countObs.disconnect()
      window.removeEventListener('preloaderDone', runHeroEntrance)
    }
  }, [])

  return null
}
