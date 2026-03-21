'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    setLenis(instance)

    function raf(time: number) {
      instance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    // Stop lenis when body has overflow hidden (preloader, mobile menu)
    const observer = new MutationObserver(() => {
      const isHidden =
        document.body.classList.contains('preloading') ||
        document.body.style.overflow === 'hidden'

      if (isHidden) {
        instance.stop()
      } else {
        instance.start()
      }
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    })

    // If body already has preloading class, stop immediately
    if (document.body.classList.contains('preloading')) {
      instance.stop()
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
      instance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
