"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  UserPlus,
  FileText,
  Search,
  MessageSquare,
  Handshake,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Play,
} from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Verify",
    description: "Create your account and choose your role - Advertiser or Media Owner",
    details: [
      "Quick 2-minute registration",
      "Identity verification for trust",
      "Complete business profile",
      "Choose your categories",
    ],
    color: "from-blue-500 to-cyan-500",
    time: "2 mins",
  },
  {
    icon: FileText,
    title: "Create Your Listing",
    description: "Post what you're offering or what advertising space you have",
    details: [
      "Upload high-quality images",
      "Set estimated value",
      "Define your requirements",
      "Specify what you're seeking",
    ],
    color: "from-green-500 to-emerald-500",
    time: "5 mins",
  },
  {
    icon: Search,
    title: "Find Perfect Matches",
    description: "Browse opportunities and discover ideal barter partners",
    details: [
      "AI-powered recommendations",
      "Advanced search filters",
      "View detailed profiles",
      "Save interesting deals",
    ],
    color: "from-purple-500 to-pink-500",
    time: "10 mins",
  },
  {
    icon: MessageSquare,
    title: "Connect & Negotiate",
    description: "Chat with potential partners and discuss deal terms",
    details: [
      "Secure in-app messaging",
      "Share additional details",
      "Negotiate terms & timeline",
      "Exchange contact information",
    ],
    color: "from-orange-500 to-red-500",
    time: "1-3 days",
  },
  {
    icon: Handshake,
    title: "Finalize the Deal",
    description: "Agree on terms and create a formal deal agreement",
    details: [
      "Digital contract creation",
      "Set clear deliverables",
      "Define success metrics",
      "Optional escrow protection",
    ],
    color: "from-indigo-500 to-purple-500",
    time: "1 day",
  },
  {
    icon: TrendingUp,
    title: "Execute & Grow",
    description: "Complete the exchange and track your success",
    details: [
      "Monitor progress dashboard",
      "Upload proof of delivery",
      "Rate your partner",
      "Build long-term relationships",
    ],
    color: "from-pink-500 to-rose-500",
    time: "Ongoing",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "5x Faster",
    description: "Close deals faster than traditional advertising",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Verified users and secure transactions",
  },
  {
    icon: CheckCircle,
    title: "99% Success Rate",
    description: "High completion rate for all deals",
  },
]

const demoVideo = {
  thumbnail: "/placeholder.svg?height=400&width=600",
  title: "See How It Works in 2 Minutes",
  duration: "2:30",
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Simple Process</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Barter Adverts
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Actually Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From registration to successful deal completion - here's your complete journey in 6 simple steps.
          </p>
        </div>

        {/* Benefits Bar */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center justify-center bg-white rounded-xl p-6 shadow-lg">
              <benefit.icon className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Steps Process */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Steps List */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  activeStep === index
                    ? "border-blue-500 shadow-xl scale-105"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`bg-gradient-to-br ${step.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          Step {index + 1}: {step.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.time}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-3">{step.description}</p>

                      {activeStep === index && (
                        <div className="space-y-2 animate-fade-in">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {detail}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Video */}
          <div className="sticky top-8">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="relative">
                <img
                  src={demoVideo.thumbnail || "/placeholder.svg"}
                  alt={demoVideo.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full shadow-xl"
                    onClick={() => setShowVideo(true)}
                  >
                    <Play className="w-6 h-6 mr-3" />
                    Watch Demo
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {demoVideo.duration}
                </div>
              </div>

              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{demoVideo.title}</h4>
                <p className="text-gray-600 mb-4">
                  Watch our quick demo to see exactly how the platform works and how you can start trading today.
                </p>
                <div className="flex items-center space-x-4">
                  <Button className="flex-1" onClick={() => setShowVideo(true)}>
                    <Play className="w-4 h-4 mr-2" />
                    Play Video
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already growing through smart bartering. Your first deal is just minutes away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4">
              Start Trading Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4"
            >
              Browse Opportunities
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-80">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No hidden fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Instant approval
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
