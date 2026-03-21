import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterCol {
  title: string
  links: FooterLink[]
}

export default function Footer() {
  const cols: FooterCol[] = [
    {
      title: 'Продукти',
      links: [
        { label: 'OK-7 Assault', href: '/products/ok-7-assault' },
        { label: 'OK-FPV Raid', href: '/products/ok-fpv-raid' },
        { label: 'OK-Recon', href: '/products/ok-recon' },
        { label: 'Всі продукти', href: '/products' },
      ],
    },
    {
      title: 'Компанія',
      links: [
        { label: 'Про нас', href: '/company' },
        { label: 'Специфікації', href: '/specs' },
      ],
    },
    {
      title: 'Партнерам',
      links: [
        { label: 'Умови співпраці', href: '/partners' },
        { label: 'Запит на постачання', href: '/partners' },
      ],
    },
    {
      title: 'Контакт',
      links: [
        { label: 'info@okmond.ua', href: 'mailto:info@okmond.ua' },
        { label: '+380 (44) 000-0000', href: 'tel:+380440000000' },
        { label: 'Telegram', href: '/partners' },
      ],
    },
  ]

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand" data-reveal="">
          <span className="footer-logo">OKMOND<span>.</span></span>
          <p className="footer-tagline">Precision. Dominance. Ukraine.</p>
          <div className="footer-coord">48&deg;27&apos;17&quot;N&nbsp;&nbsp;35&deg;01&apos;48&quot;E</div>
          <div className="footer-coord" style={{ marginTop: '4px' }}>UKRAINE · EST. 2022</div>
        </div>

        {cols.map(col => (
          <div key={col.title}>
            <div className="footer-col-title">{col.title}</div>
            <ul className="footer-links">
              {col.links.map(link => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">&copy; 2024 OKMOND DRONES. Всі права захищені.</span>
        <span className="footer-ukraine">Зроблено в Україні 🇺🇦</span>
      </div>
    </footer>
  )
}
