"use client"

import { useRef, useEffect } from "react"

interface AnimatedLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function AnimatedLogo({ className = "", size = "md" }: AnimatedLogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Video autoplay failed")
      })
    }
  }, [])

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg overflow-hidden bg-blue-600 flex items-center justify-center ${className}`}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => {
          // Hide video and show fallback
          e.currentTarget.style.display = "none"
          const fallback = e.currentTarget.nextElementSibling as HTMLElement
          if (fallback) fallback.style.display = "flex"
        }}
      >
        <source src="/logo/barter.mp4" type="video/mp4" />
      </video>
      {/* Fallback logo */}
      <div className="w-full h-full bg-blue-600 flex items-center justify-center" style={{ display: "none" }}>
        <span className="text-white font-bold text-sm">BA</span>
      </div>
    </div>
  )
}
