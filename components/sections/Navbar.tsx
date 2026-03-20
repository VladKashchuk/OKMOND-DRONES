'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo">
          OKMOND<span>.</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/products">Продукти</Link></li>
          <li><Link href="/specs">Специфікації</Link></li>
          <li><Link href="/partners">Партнерам</Link></li>
          <li><Link href="/company">Компанія</Link></li>
        </ul>
        <Link href="/partners" className="nav-cta">Запит на постачання</Link>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={isOpen}
        >
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu overlay — portaled to body for correct positioning */}
      {mounted && isOpen && createPortal(
        <div className="nav-mobile-overlay">
          <button
            className="nav-mobile-close"
            onClick={() => setIsOpen(false)}
            aria-label="Закрити меню"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <ul className="nav-mobile-links">
            <li><Link href="/products" onClick={() => setIsOpen(false)}>Продукти</Link></li>
            <li><Link href="/specs" onClick={() => setIsOpen(false)}>Специфікації</Link></li>
            <li><Link href="/partners" onClick={() => setIsOpen(false)}>Партнерам</Link></li>
            <li><Link href="/company" onClick={() => setIsOpen(false)}>Компанія</Link></li>
          </ul>
          <Link href="/partners" className="nav-mobile-cta" onClick={() => setIsOpen(false)}>
            Запит на постачання
          </Link>
        </div>,
        document.body
      )}
    </>
  )
}
