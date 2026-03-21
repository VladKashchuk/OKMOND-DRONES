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
          <Link href="/partners" className="btn-dark">Подати запит</Link>
          <Link href="/products" className="btn-dark-outline">Каталог продукції</Link>
        </div>
      </div>
    </section>
  )
}
