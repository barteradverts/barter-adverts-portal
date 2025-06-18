"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"

interface LazyLoadingWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
}

export function LazyLoadingWrapper({
  children,
  fallback = <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  rootMargin = "100px",
}: LazyLoadingWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin])

  return <div ref={ref}>{isVisible ? children : fallback}</div>
}
