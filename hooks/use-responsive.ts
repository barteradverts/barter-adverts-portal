"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg")
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setWidth(width)
      setHeight(height)

      // Set breakpoint
      if (width < breakpoints.sm) {
        setBreakpoint("xs")
      } else if (width < breakpoints.md) {
        setBreakpoint("sm")
      } else if (width < breakpoints.lg) {
        setBreakpoint("md")
      } else if (width < breakpoints.xl) {
        setBreakpoint("lg")
      } else if (width < breakpoints["2xl"]) {
        setBreakpoint("xl")
      } else {
        setBreakpoint("2xl")
      }

      // Set device type
      setIsMobile(width < breakpoints.md)
      setIsTablet(width >= breakpoints.md && width < breakpoints.lg)
      setIsDesktop(width >= breakpoints.lg)
    }

    // Initial call
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    breakpoint,
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints,
  }
}
