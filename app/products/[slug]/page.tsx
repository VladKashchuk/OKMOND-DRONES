'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ScrollRevealProvider from '@/components/ui/ScrollRevealProvider'
import { CAROUSEL_CARDS, SPEC_ROWS } from '@/lib/data'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const card = CAROUSEL_CARDS.find(c => c.slug === slug)

  if (!card) notFound()

  const modelName = card.model.replace('\n', ' ')

  // Find next/prev products for navigation
  const idx = CAROUSEL_CARDS.indexOf(card)
  const prev = CAROUSEL_CARDS[(idx - 1 + CAROUSEL_CARDS.length) % CAROUSEL_CARDS.length]
  const next = CAROUSEL_CARDS[(idx + 1) % CAROUSEL_CARDS.length]

  return (
    <>
      <ScrollRevealProvider />
      <Navbar />

      {/* Hero */}
      <section id="page-hero" className="page-hero-tall">
        <Image
          className="hero-bg-image"
          src={card.img}
          alt={modelName}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.25) contrast(1.2) saturate(0.7)' }}
          priority
        />
        <div className="hero-overlay"></div>
        <div className="page-hero-inner">
          <div className="overline" data-reveal="fade">{card.badge}</div>
          <h1 className="page-hero-title" data-reveal="">
            {card.model.includes('\n')
              ? <>{card.model.split('\n')[0]}<br /><span className="hl-gold">{card.model.split('\n')[1]}</span></>
              : <>{modelName}<span className="hl-gold">.</span></>
            }
          </h1>
          <p className="page-hero-desc" data-reveal="" data-delay="1">
            {card.description || card.role}
          </p>
        </div>
      </section>

      {/* Specs Grid */}
      <section id="product-detail-specs">
        <div className="product-detail-inner">
          <div className="section-intro" data-reveal="fade">
            <span className="number">01</span>
            <div className="line"></div>
          </div>
          <h2 className="partner-section-title" data-reveal="">ХАРАКТЕРИСТИКИ</h2>

          <div className="product-detail-grid">
            <div className="product-detail-image" data-reveal="">
              <Image src={card.img} alt={modelName} fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
            </div>
            <div className="product-detail-specs-list">
              {card.bottomLabels.map((label, i) => (
                <div className="product-detail-spec" key={label} data-reveal="" data-delay={String(i + 1)}>
                  <span className="product-detail-spec-label">{label}</span>
                  <span className="product-detail-spec-value">{card.bottomVals[i]}</span>
                </div>
              ))}
              {card.gold && SPEC_ROWS.slice(0, 6).map((row, i) => (
                <div className="product-detail-spec" key={row.key} data-reveal="" data-delay={String(i + 5)}>
                  <span className="product-detail-spec-label">{row.key}</span>
                  <span className="product-detail-spec-value">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="product-detail-features">
        <div className="product-detail-inner">
          <div className="section-intro" data-reveal="fade">
            <span className="number">02</span>
            <div className="line"></div>
          </div>
          <h2 className="partner-section-title" data-reveal="">ПЕРЕВАГИ</h2>
          <div className="values-grid">
            <div className="value-item" data-reveal="" data-delay="1">
              <span className="feature-num">01</span>
              <h3 className="feature-title">НАДІЙНІСТЬ</h3>
              <p className="feature-text">Протестовано в реальних бойових умовах. Температурний діапазон від -20°C до +55°C.</p>
            </div>
            <div className="value-item" data-reveal="" data-delay="2">
              <span className="feature-num">02</span>
              <h3 className="feature-title">ЗАХИСТ</h3>
              <p className="feature-text">Захищений канал зв&apos;язку FHSS з 128-bit AES шифруванням. IP54 рейтинг.</p>
            </div>
            <div className="value-item" data-reveal="" data-delay="3">
              <span className="feature-num">03</span>
              <h3 className="feature-title">РОЗГОРТАННЯ</h3>
              <p className="feature-text">Час підготовки до польоту — менше 3 хвилин. Компактний транспортний кейс.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nav between products */}
      <section id="product-nav">
        <div className="product-nav-inner">
          <Link href={`/products/${prev.slug}`} className="product-nav-link" data-reveal="">
            <span className="product-nav-dir">← Попередній</span>
            <span className="product-nav-name">{prev.model.replace('\n', ' ')}</span>
          </Link>
          <Link href="/products" className="product-nav-all" data-reveal="" data-delay="1">
            Всі продукти
          </Link>
          <Link href={`/products/${next.slug}`} className="product-nav-link product-nav-right" data-reveal="" data-delay="2">
            <span className="product-nav-dir">Наступний →</span>
            <span className="product-nav-name">{next.model.replace('\n', ' ')}</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="cta-content" data-reveal="">
          <div className="cta-overline">Запит на постачання</div>
          <h2 className="cta-title">ГОТОВІ ДО МІСІЇ?</h2>
          <p className="cta-sub">Зв&apos;яжіться з нами для отримання комерційної пропозиції на {modelName}.</p>
          <div className="cta-buttons">
            <Link href="/partners" className="btn-dark">Зв&apos;язатися</Link>
            <Link href="/specs" className="btn-dark-outline">Специфікації</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
