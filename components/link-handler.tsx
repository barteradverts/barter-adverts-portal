"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { fixBrokenLink } from "@/lib/link-checker"

// This component handles redirects for known broken links
export function LinkHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    // Check if current path is a known broken link
    const fixedLink = fixBrokenLink(pathname)

    // If the link was fixed and is different from current path, redirect
    if (fixedLink !== pathname) {
      router.replace(fixedLink)
    }
  }, [pathname, router])

  return <>{children}</>
}
