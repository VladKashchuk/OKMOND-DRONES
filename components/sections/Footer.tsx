import Link from 'next/link'

export default function Footer() {
  const cols = [
    {
      title: 'Продукти',
      links: ['OK-7 Assault', 'OK-FPV Raid', 'OK-Recon', 'Аксесуари'],
    },
    {
      title: 'Компанія',
      links: ["Про нас", 'Виробництво', 'Команда', "Кар'єра"],
    },
    {
      title: 'Партнерам',
      links: ['Умови постачання', 'Сертифікати', 'Документація', 'Підтримка'],
    },
    {
      title: 'Контакт',
      links: ['info@okmond.ua', '+380 (44) 000-0000', 'Telegram', 'Signal'],
    },
  ]

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand" data-reveal="">
          <span className="footer-logo">OKMOND<span>.</span></span>
          <p className="footer-tagline">Precision. Dominance. Ukraine.</p>
          <div className="footer-coord">48°27&apos;17&quot;N&nbsp;&nbsp;35°01&apos;48&quot;E</div>
          <div className="footer-coord" style={{ marginTop: '4px' }}>UKRAINE · EST. 2022</div>
        </div>

        {cols.map(col => (
          <div key={col.title}>
            <div className="footer-col-title">{col.title}</div>
            <ul className="footer-links">
              {col.links.map(link => (
                <li key={link}>
                  <Link href="#">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2024 OKMOND DRONES. Всі права захищені.</span>
        <span className="footer-ukraine">Зроблено в Україні 🇺🇦</span>
      </div>
    </footer>
  )
}
