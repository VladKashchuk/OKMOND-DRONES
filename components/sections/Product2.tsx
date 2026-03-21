import Image from 'next/image'
import Link from 'next/link'

export default function Product2() {
  return (
    <section id="product2">
      <div className="product2-image">
        <Image src="/images/1P7A1367.JPG" alt="OK-FPV Raid Drone" fill className="object-cover" />
      </div>
      <div className="product2-content" data-reveal="">
        <div className="product2-eyebrow">Серія OKMOND</div>
        <h2 className="product2-title">OK-FPV<br />RAID</h2>
        <p className="product2-desc">
          Тактичний FPV дрон для дій у складному рельєфі.
          Карбонова рамка забезпечує максимальну жорсткість
          при мінімальній масі. Призначений для завдань,
          де потрібна висока швидкість і маневреність.
        </p>
        <div className="product2-specs">
          {[
            { label: 'Двигун',      value: '5" 2306' },
            { label: 'Швидкість',   value: '180 км/год' },
            { label: 'Час польоту', value: '12 хвилин' },
            { label: 'Навантаження',value: '0.8 кг' },
          ].map(({ label, value }) => (
            <div key={label} className="p2-spec">
              <div className="p2-spec-label">{label}</div>
              <div className="p2-spec-value">{value}</div>
            </div>
          ))}
        </div>
        <Link href="/products/ok-7-assault" className="btn-secondary" style={{ borderColor: 'rgba(200,168,75,0.4)', color: 'var(--gold)', alignSelf: 'flex-start' }}>
          Детальніше →
        </Link>
      </div>
    </section>
  )
}
