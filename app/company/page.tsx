'use client'

import Image from 'next/image'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ScrollRevealProvider from '@/components/ui/ScrollRevealProvider'

const STATS = [
  { value: '2022', label: 'РІК ЗАСНУВАННЯ' },
  { value: '200+', label: 'СИСТЕМ ПОСТАВЛЕНО' },
  { value: '50+', label: 'ПІДРОЗДІЛІВ ЗСУ' },
  { value: '99%', label: 'ТОЧНІСТЬ ЦІЛІ' },
]

const VALUES = [
  { num: '01', title: 'ЯКІСТЬ', text: 'Кожен дрон проходить 47-точковий контроль якості перед відправкою. Жодних компромісів.' },
  { num: '02', title: 'НАДІЙНІСТЬ', text: 'Протестовано в реальних бойових умовах. Від -20°C до +55°C. IP54 захист.' },
  { num: '03', title: 'ІННОВАЦІЇ', text: 'Постійне вдосконалення на основі зворотного зв\'язку від операторів на передовій.' },
]

const TIMELINE = [
  { year: '2022', title: 'ЗАСНУВАННЯ', desc: 'Створення компанії у Дніпрі. Перший прототип штурмового квадрокоптера.' },
  { year: '2023', title: 'СЕРІЙНЕ ВИРОБНИЦТВО', desc: 'Запуск серійного виробництва OK-7 Assault. Перші поставки підрозділам ЗСУ.' },
  { year: '2024', title: 'РОЗШИРЕННЯ ЛІНІЙКИ', desc: 'Випуск OK-FPV Raid, OK-Recon та OK-Relay. 200+ систем поставлено.' },
  { year: '2025', title: 'НАТО СТАНДАРТИ', desc: 'Сертифікація за стандартами NATO STANAG. Розширення виробничих потужностей.' },
]

export default function CompanyPage() {
  return (
    <>
      <ScrollRevealProvider />
      <Navbar />

      {/* Page Hero */}
      <section id="page-hero" className="page-hero-tall">
        <Image
          className="hero-bg-image"
          src="/images/1P7A1354.JPG"
          alt="OKMOND Factory"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.3) contrast(1.2) saturate(0.7)' }}
          priority
        />
        <div className="hero-overlay"></div>
        <div className="page-hero-inner">
          <div className="overline" data-reveal="fade">Про компанію</div>
          <h1 className="page-hero-title" data-reveal="">
            OKMOND<span className="hl-gold">.</span>
          </h1>
          <p className="page-hero-desc" data-reveal="" data-delay="1">
            Українська оборонна компанія. Розробляємо та виробляємо тактичні безпілотні системи для Збройних Сил України.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section id="company-stats">
        <div className="company-stats-grid">
          {STATS.map((s, i) => (
            <div className="company-stat" key={s.label} data-reveal="" data-delay={String(i + 1)}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section id="company-mission">
        <div className="company-mission-inner">
          <div className="section-intro" data-reveal="fade">
            <span className="number">01</span>
            <div className="line"></div>
          </div>
          <div className="company-mission-content">
            <h2 className="company-mission-title" data-reveal="">НАША МІСІЯ</h2>
            <p className="company-mission-text" data-reveal="" data-delay="1">
              Забезпечити Збройні Сили України найсучаснішими безпілотними системами, що дають тактичну перевагу на полі бою. Ми створюємо зброю нового покоління — надійну, точну та адаптовану до реальних умов бойового застосування.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="company-values">
        <div className="company-values-inner">
          <div className="section-intro" data-reveal="fade">
            <span className="number">02</span>
            <div className="line"></div>
          </div>
          <h2 className="partner-section-title" data-reveal="">ЦІННОСТІ</h2>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div className="value-item" key={v.num} data-reveal="" data-delay={String(i + 1)}>
                <span className="feature-num">{v.num}</span>
                <h3 className="feature-title">{v.title}</h3>
                <p className="feature-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="company-timeline">
        <div className="company-timeline-inner">
          <div className="section-intro" data-reveal="fade">
            <span className="number">03</span>
            <div className="line"></div>
          </div>
          <h2 className="partner-section-title" data-reveal="">ІСТОРІЯ</h2>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div className="timeline-item" key={t.year} data-reveal="" data-delay={String(i + 1)}>
                <span className="timeline-year">{t.year}</span>
                <div className="timeline-content">
                  <h3 className="timeline-title">{t.title}</h3>
                  <p className="timeline-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="cta-content" data-reveal="">
          <div className="cta-overline">Приєднуйтесь</div>
          <h2 className="cta-title">РАЗОМ ДО ПЕРЕМОГИ</h2>
          <p className="cta-sub">Ми шукаємо інженерів, операторів та партнерів, які поділяють нашу місію.</p>
          <div className="cta-buttons">
            <a href="/partners" className="btn-dark">Зв&apos;язатися</a>
            <a href="/products" className="btn-dark-outline">Продукція</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
