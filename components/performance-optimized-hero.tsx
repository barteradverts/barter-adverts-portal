"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const slides = [
  {
    title: "Trade Your Way to Success",
    subtitle: "Connect with 10,000+ businesses for barter advertising deals",
    description: "Skip the cash - exchange your products, services, or ad space directly with other businesses.",
    cta: "Start Trading Now",
  },
  {
    title: "Every Media Type, One Platform",
    subtitle: "From billboards to influencers - find it all here",
    description: "Access TV, radio, digital, print, outdoor, and influencer advertising opportunities.",
    cta: "Explore Marketplace",
  },
  {
    title: "Smart Matching Technology",
    subtitle: "AI-powered connections for perfect barter deals",
    description: "Our intelligent system matches your offerings with businesses seeking exactly what you provide.",
    cta: "Get Matched",
  },
]

export function PerformanceOptimizedHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, isAutoPlaying])

  const handleInteraction = useCallback(() => {
    setIsAutoPlaying(false)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">{slides[currentSlide].title}</h1>
              <p className="text-lg md:text-xl lg:text-2xl text-blue-100">{slides[currentSlide].subtitle}</p>
              <p className="text-base md:text-lg text-blue-50 leading-relaxed">{slides[currentSlide].description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="inline-block">
                <button className="w-full sm:w-auto bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center group">
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/marketplace" className="inline-block">
                <button className="w-full sm:w-auto border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Browse Marketplace
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 text-blue-100">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold">10,000+</div>
                <div className="text-xs md:text-sm">Active Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold">₹50Cr+</div>
                <div className="text-xs md:text-sm">Deals Facilitated</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold">95%</div>
                <div className="text-xs md:text-sm">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl md:text-6xl mb-4">🚀</div>
                <div className="text-lg md:text-xl font-semibold">Barter Advertising</div>
                <div className="text-sm md:text-base opacity-80">Platform</div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimized Slide Navigation */}
        <div className="flex justify-center items-center mt-8 md:mt-12 space-x-4">
          <button
            onClick={() => {
              prevSlide()
              handleInteraction()
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors touch-target"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  handleInteraction()
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors touch-target ${
                  index === currentSlide ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              nextSlide()
              handleInteraction()
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors touch-target"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
