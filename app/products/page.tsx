'use client'

import Image from 'next/image'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ScrollRevealProvider from '@/components/ui/ScrollRevealProvider'
import Link from 'next/link'
import { CAROUSEL_CARDS } from '@/lib/data'

export default function ProductsPage() {
  return (
    <>
      <ScrollRevealProvider />
      <Navbar />

      {/* Page Hero */}
      <section id="page-hero">
        <div className="page-hero-inner">
          <div className="overline" data-reveal="fade">Лінійка продуктів</div>
          <h1 className="page-hero-title" data-reveal="">
            ТАКТИЧНІ<br />БПЛА<span className="hl-gold">.</span>
          </h1>
          <p className="page-hero-desc" data-reveal="" data-delay="1">
            Повний спектр безпілотних рішень для штурму, розвідки, FPV-ударів та ретрансляції сигналу.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products-grid">
        <div className="products-grid-inner">
          {CAROUSEL_CARDS.map((card, i) => (
            <div className="product-card" key={card.model} data-reveal="" data-delay={String((i % 3) + 1)}>
              <div className="product-card-image">
                <Image src={card.img} alt={card.model} fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
                <div className="product-card-overlay" />
                {card.gold && <span className="product-card-flag">★ Флагман</span>}
              </div>
              <div className="product-card-body">
                <span className="product-card-badge">{card.badge}</span>
                <h3 className="product-card-model">{card.model.replace('\n', ' ')}</h3>
                <p className="product-card-role">{card.role}</p>
                <div className="product-card-specs">
                  {card.bottomLabels.map((label, j) => (
                    <div className="product-card-spec" key={label}>
                      <span className="product-card-spec-label">{label}</span>
                      <span className="product-card-spec-val">{card.bottomVals[j]}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/products/${card.slug}`} className="btn-secondary product-card-btn">Детальніше</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="cta-content" data-reveal="">
          <div className="cta-overline">Запит на постачання</div>
          <h2 className="cta-title">ГОТОВІ ДО МІСІЇ?</h2>
          <p className="cta-sub">Зв&apos;яжіться з нами для отримання комерційної пропозиції та умов співпраці.</p>
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
