"use client"

import Image from "next/image"
import { useState } from "react"

interface ResponsiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = "",
  sizes = "100vw",
  priority = false,
  quality = 75,
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`overflow-hidden ${isLoading ? "bg-gray-200 animate-pulse" : ""}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"} transition-all duration-500`}
        sizes={sizes}
        priority={priority}
        quality={quality}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
