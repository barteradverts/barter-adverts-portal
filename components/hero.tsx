"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Clean Background Shape */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Clean Badge */}
          <div className="inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 mb-8 text-white text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
            Glocal First Unified Barter Marketplace
          </div>

          {/* Main Heading - Simplified */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Trade Your Way to
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-2">
              Better Marketing
            </span>
          </h1>

          {/* Clean Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Connect with media owners and advertisers for mutually beneficial exchanges.
            <br className="hidden md:block" />
            No cash required, just value for value.
          </p>

          {/* Simplified CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-5 text-xl font-semibold shadow-2xl rounded-full"
            >
              <Link href="/register">
                Start Trading Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-5 text-xl font-semibold backdrop-blur-sm rounded-full"
            >
              <Play className="mr-3 h-6 w-6" />
              Watch Demo
            </Button>
          </div>

          {/* Clean Stats - Simplified */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,500+</div>
              <div className="text-white/80 text-sm md:text-base">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">₹2.5Cr+</div>
              <div className="text-white/80 text-sm md:text-base">Value Traded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.8★</div>
              <div className="text-white/80 text-sm md:text-base">User Rating</div>
            </div>
          </div>

          {/* Static Testimonial */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <blockquote className="text-white text-lg md:text-xl italic mb-4">
                "Increased our billboard utilization by 40% through smart barter deals."
              </blockquote>
              <div className="text-white/90 font-semibold">Rajesh Kumar</div>
              <div className="text-white/70 text-sm">Metro Advertising</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
