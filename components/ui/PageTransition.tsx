'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLenis } from './LenisProvider'

export default function PageTransition() {
  const pathname = usePathname()
  const lenis = useLenis()
  const [phase, setPhase] = useState<'idle' | 'enter' | 'exit'>('idle')
  const prevPathRef = useRef(pathname)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const runExit = useCallback(() => {
    setPhase('exit')
    setTimeout(() => setPhase('idle'), 900)
  }, [])

  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname
      runExit()
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }, [pathname, runExit])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return
      if (href === pathname) return
      setPhase('enter')
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  if (!mounted) return null

  return createPortal(
    <div className={`page-transition ${phase}`} style={{ display: phase === 'idle' ? 'none' : 'flex' }}>
      <div className="page-transition-bar" />
      <div className="page-transition-label">
        <span>OKMOND</span>
      </div>
    </div>,
    document.body
  )
}
