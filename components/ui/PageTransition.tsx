'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'

export default function PageTransition() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'enter' | 'exit'>('idle')
  const [prevPath, setPrevPath] = useState(pathname)

  const runExit = useCallback(() => {
    setPhase('exit')
    setTimeout(() => setPhase('idle'), 600)
  }, [])

  useEffect(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname)
      runExit()
      // scroll to top on page change
      window.scrollTo(0, 0)
    }
  }, [pathname, prevPath, runExit])

  // Intercept link clicks to trigger enter animation
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('http')) return
      if (href === pathname) return

      setPhase('enter')
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  if (phase === 'idle') return null

  return (
    <div className={`page-transition ${phase}`}>
      <div className="page-transition-bar" />
      <div className="page-transition-label">
        <span>OKMOND</span>
      </div>
    </div>
  )
}
