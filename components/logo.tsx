"use client"

import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  linkToHome?: boolean
}

export function Logo({ size = "md", className = "", linkToHome = true }: LogoProps) {
  const sizeConfig = {
    sm: { width: 100, height: 28, className: "h-6 w-auto" },
    md: { width: 140, height: 40, className: "h-8 w-auto sm:h-10" },
    lg: { width: 180, height: 52, className: "h-12 w-auto sm:h-14" },
    xl: { width: 220, height: 64, className: "h-16 w-auto sm:h-18" },
  }

  const config = sizeConfig[size]

  const logoImage = (
    <Image
      src="/logo/barter-logo.png"
      alt="Barter Adverts"
      width={config.width}
      height={config.height}
      className={`${config.className} object-contain ${className}`}
      priority
    />
  )

  if (linkToHome) {
    return (
      <Link href="/" className="inline-block">
        {logoImage}
      </Link>
    )
  }

  return logoImage
}
