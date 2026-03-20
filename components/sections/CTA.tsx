import Link from 'next/link'

export default function CTA() {
  return (
    <section id="cta">
      <div className="cta-content" data-reveal="scale">
        <div className="cta-overline">Зв&apos;яжіться з нами</div>
        <h2 className="cta-title">ГОТОВІ ДО<br />МІСІЇ?</h2>
        <p className="cta-sub">
          Зв&apos;яжіться з нашою командою для тактичних консультацій,
          демонстрації та оформлення постачання.
        </p>
        <div className="cta-buttons">
          <Link href="#" className="btn-dark">Подати запит</Link>
          <Link href="#" className="btn-dark-outline">Завантажити каталог</Link>
        </div>
      </div>
    </section>
  )
}
