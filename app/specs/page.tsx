'use client'

import Image from 'next/image'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ScrollRevealProvider from '@/components/ui/ScrollRevealProvider'
import { SPEC_ROWS, CONFIGURATOR_MODELS } from '@/lib/data'

export default function SpecsPage() {
  return (
    <>
      <ScrollRevealProvider />
      <Navbar />

      {/* Page Hero */}
      <section id="page-hero">
        <div className="page-hero-inner">
          <div className="overline" data-reveal="fade">Технічні дані</div>
          <h1 className="page-hero-title" data-reveal="">
            СПЕЦИФІ&shy;КАЦІЇ<span className="hl-gold">.</span>
          </h1>
          <p className="page-hero-desc" data-reveal="" data-delay="1">
            Детальні характеристики кожної моделі. Всі дані підтверджені польовими випробуваннями.
          </p>
        </div>
      </section>

      {/* Models comparison */}
      <section id="specs-compare">
        <div className="specs-compare-inner">
          <div className="section-intro" data-reveal="fade">
            <span className="number">01</span>
            <div className="line"></div>
          </div>
          <h2 className="specs-compare-title" data-reveal="">ПОРІВНЯННЯ МОДЕЛЕЙ</h2>

          <div className="specs-compare-grid">
            {CONFIGURATOR_MODELS.map((m, i) => (
              <div className={`specs-model-card ${m.active ? 'flagship' : ''}`} key={m.model} data-reveal="" data-delay={String(i + 1)}>
                <div className="specs-model-card-img">
                  <Image
                    src={i === 0 ? '/images/1P7A9958.JPG' : i === 1 ? '/images/1P7A1367.JPG' : i === 2 ? '/images/1P7A1360.JPG' : '/images/1P7A9944.JPG'}
                    alt={m.name} fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  />
                  <div className="product-card-overlay" />
                </div>
                {m.active && <span className="product-card-flag">★ Флагман</span>}
                <h3 className="specs-model-card-name">{m.name}</h3>
                <div className="specs-model-card-specs">
                  <div className="smcs-row"><span>Час польоту</span><span>{m.flight}</span></div>
                  <div className="smcs-row"><span>Швидкість</span><span>{m.speed}</span></div>
                  <div className="smcs-row"><span>Дальність</span><span>{m.range}</span></div>
                  <div className="smcs-row"><span>Навантаження</span><span>{m.payload}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full spec table for OK-7 */}
      <section id="specs-full">
        <div className="specs-full-inner">
          <div className="specs-full-left" data-reveal="left">
            <Image src="/images/1P7A9958.JPG" alt="OK-7 Assault" className="specs-full-img" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: 'auto' }} />
            <h3 className="specs-model-primary">OK-7</h3>
            <h4 className="specs-model-secondary">ASSAULT</h4>
            <p className="specs-desc">
              Розроблено для реального бойового застосування. Кожен компонент відібрано під умови України — від корпусу з карбонового волокна до захищеного каналу зв&apos;язку. Відповідає стандартам НАТО для безпілотних тактичних систем.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="specs-badge">🇺🇦 ЗРОБЛЕНО В УКРАЇНІ</span>
              <span className="specs-badge">НАТО СУМІСНИЙ</span>
            </div>
          </div>
          <div className="specs-full-right" data-reveal="">
            <div className="specs-table">
              {SPEC_ROWS.map(row => (
                <div className="spec-row" key={row.key}>
                  <span className="spec-key">{row.key}</span>
                  <span className="spec-val">{row.val}</span>
                </div>
              ))}
            </div>
            <div className="specs-right-bottom">
              <div className="specs-right-bottom-label">Сертифікація</div>
              <p className="specs-right-bottom-text">
                Усі системи OKMOND пройшли сертифікацію за стандартами NATO STANAG та підтверджені незалежними випробуваннями в умовах реального бойового застосування.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
