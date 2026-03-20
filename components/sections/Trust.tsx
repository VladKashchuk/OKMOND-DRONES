export default function Trust() {
  const testimonials = [
    {
      quote: 'OKMOND-7 показав виняткову надійність у складних бойових умовах. Захищений канал зв\'язку не давав збоїв навіть в зоні активного РЕБ. Рекомендуємо для розвідувальних та ударних місій.',
      author: 'Офіцер ЗСУ, ДШВ',
      role: 'Аеророзвідка · Польові випробування 2024',
    },
    {
      quote: 'OK-FPV перевершив конкуруючі рішення за маневреністю та швидкістю реакції. Карбоновий корпус витримав умови, при яких аналоги виходили з ладу. Це найкращий FPV на ринку для бойового застосування.',
      author: 'Командир підрозділу, НГУ',
      role: 'FPV Рейди · Практичне застосування 2024',
    },
  ]

  const badges = [
    { title: 'ISO 9001',         sub: 'Certified Quality'    },
    { title: 'NATO STANAG',      sub: 'Compatible Systems'   },
    { title: 'Зроблено в Україні', sub: '100% Ukrainian Made' },
    { title: 'ЗСУ Постачальник', sub: 'Official Supplier'    },
  ]

  return (
    <section id="trust">
      <div className="trust-header" data-reveal="">
        <div>
          <span className="overline" style={{ display: 'block', marginBottom: '16px' }}>Нам довіряють</span>
          <h2 className="trust-title">БОЙОВА ПЕРЕВІРКА</h2>
        </div>
        <div className="trust-stat">
          <div className="trust-stat-num">200+</div>
          <div className="trust-stat-label">Одиниць у бойовому<br />застосуванні</div>
        </div>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-item" data-reveal="" data-delay={i > 0 ? '1' : undefined}>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">{t.author}</div>
            <div className="testimonial-role">{t.role}</div>
          </div>
        ))}
      </div>

      <div className="trust-badges">
        {badges.map((b, i) => (
          <div key={i} className="trust-badge" data-reveal="" data-delay={i > 0 ? String(Math.min(i, 6)) : undefined}>
            <div className="badge-icon" />
            <div className="badge-content">
              <div className="badge-title">{b.title}</div>
              <div className="badge-sub">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
