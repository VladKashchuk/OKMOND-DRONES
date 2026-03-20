'use client'

import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ScrollRevealProvider from '@/components/ui/ScrollRevealProvider'

const PARTNER_BENEFITS = [
  { num: '01', title: 'ПРІОРИТЕТНЕ ПОСТАЧАННЯ', text: 'Партнери отримують пріоритет у виробничій лінії та гарантовані терміни поставки.' },
  { num: '02', title: 'ТЕХНІЧНА ПІДТРИМКА 24/7', text: 'Виділена команда інженерів для оперативного вирішення технічних питань у польових умовах.' },
  { num: '03', title: 'КАСТОМІЗАЦІЯ', text: 'Адаптація систем під конкретні оперативні потреби: навантаження, дальність, частоти зв\'язку.' },
  { num: '04', title: 'НАВЧАННЯ ОПЕРАТОРІВ', text: 'Повний курс підготовки операторів БПЛА з сертифікацією та польовими випробуваннями.' },
  { num: '05', title: 'СЕРВІСНЕ ОБСЛУГОВУВАННЯ', text: 'Регулярне ТО, заміна компонентів, оновлення ПЗ протягом усього терміну експлуатації.' },
  { num: '06', title: 'ЛОГІСТИЧНА ПІДТРИМКА', text: 'Організація доставки запасних частин та комплектуючих у будь-яку точку.' },
]

const COOPERATION_STEPS = [
  { step: '01', title: 'ЗАЯВКА', desc: 'Заповніть форму запиту або зв\'яжіться з нашим відділом продажів.' },
  { step: '02', title: 'КОНСУЛЬТАЦІЯ', desc: 'Обговорення потреб, обсягів та умов партнерства з менеджером.' },
  { step: '03', title: 'КОНТРАКТ', desc: 'Узгодження умов, підписання договору та внесення передоплати.' },
  { step: '04', title: 'ПОСТАВКА', desc: 'Виробництво, тестування, навчання та передача систем замовнику.' },
]

export default function PartnersPage() {
  return (
    <>
      <ScrollRevealProvider />
      <Navbar />

      {/* Page Hero */}
      <section id="page-hero">
        <div className="page-hero-inner">
          <div className="overline" data-reveal="fade">Співпраця</div>
          <h1 className="page-hero-title" data-reveal="">
            ПАРТНЕ&shy;РАМ<span className="hl-gold">.</span>
          </h1>
          <p className="page-hero-desc" data-reveal="" data-delay="1">
            Програма партнерства для підрозділів ЗСУ, волонтерських організацій та державних замовників.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section id="partner-benefits">
        <div className="partner-benefits-inner">
          <div className="section-intro" data-reveal="fade">
            <span className="number">01</span>
            <div className="line"></div>
          </div>
          <h2 className="partner-section-title" data-reveal="">ПЕРЕВАГИ ПАРТНЕРСТВА</h2>
          <div className="partner-grid">
            {PARTNER_BENEFITS.map((b, i) => (
              <div className="partner-benefit" key={b.num} data-reveal="" data-delay={String((i % 3) + 1)}>
                <span className="feature-num">{b.num}</span>
                <h3 className="feature-title">{b.title}</h3>
                <p className="feature-text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="partner-steps">
        <div className="partner-steps-inner">
          <div className="section-intro" data-reveal="fade">
            <span className="number">02</span>
            <div className="line"></div>
          </div>
          <h2 className="partner-section-title" data-reveal="">ЯК РОЗПОЧАТИ СПІВПРАЦЮ</h2>
          <div className="steps-grid">
            {COOPERATION_STEPS.map((s, i) => (
              <div className="step-card" key={s.step} data-reveal="" data-delay={String(i + 1)}>
                <span className="step-num">{s.step}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="cta-content" data-reveal="">
          <div className="cta-overline">Запит на партнерство</div>
          <h2 className="cta-title">СТАТИ ПАРТНЕРОМ</h2>
          <p className="cta-sub">Залиште заявку і наш менеджер зв&apos;яжеться з вами протягом 24 годин.</p>
          <div className="cta-buttons">
            <a href="#" className="btn-dark">Залишити заявку</a>
            <a href="#" className="btn-dark-outline">Умови співпраці</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
