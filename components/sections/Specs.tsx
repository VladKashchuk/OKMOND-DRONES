import Image from 'next/image'
import { SPEC_ROWS } from '@/lib/data'

export default function Specs() {
  return (
    <section id="specs">
      <div className="specs-inner">
        <div className="specs-left" data-reveal="left">
          <span className="overline" style={{ display: 'block', marginBottom: '28px' }}>
            Технічні характеристики
          </span>
          <div style={{ position: 'relative', width: '100%', height: '280px', marginBottom: '48px' }}>
            <Image
              className="specs-left-img"
              src="/images/1P7A9958.JPG"
              alt="OK-FPV Frame Detail"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div className="specs-model-primary">
            OK-7<br />ASSAULT
          </div>
          <p className="specs-desc">
            Розроблено для реального бойового застосування.
            Кожен компонент відібрано під умови України —
            від корпусу з карбонового волокна до захищеного
            каналу зв&apos;язку. Відповідає стандартам НАТО
            для безпілотних тактичних систем.
          </p>
          <div>
            <span className="specs-badge">IP54</span>
            <span className="specs-badge">НАТО Сумісний</span>
            <span className="specs-badge">Зроблено в Україні</span>
          </div>
        </div>

        <div className="specs-right" data-reveal="">
          <span className="overline" style={{ display: 'block', marginBottom: '40px' }}>
            OK-7 · Повні характеристики
          </span>
          <div className="specs-table">
            {SPEC_ROWS.map((row, i) => (
              <div key={i} className="spec-row">
                <span className="spec-key">{row.key}</span>
                <span className="spec-val">{row.val}</span>
              </div>
            ))}
          </div>
          <div className="specs-right-bottom">
            <div className="specs-right-bottom-label">Польові випробування</div>
            <p className="specs-right-bottom-text">
              Всі системи OKMOND пройшли польові випробування в умовах реального бойового застосування.
              Результати перевищують заявлені характеристики на 15–20% у стандартних умовах.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
