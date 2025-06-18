"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Handshake,
  Megaphone,
  UserPlus,
  FileText,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const mainSteps = [
  {
    icon: UserPlus,
    title: "Sign Up & Choose Your Role",
    description: "Register as an Advertiser (offering products/services) or Media Owner (offering ad space)",
    details: [
      "Quick 2-minute registration process",
      "Choose between Advertiser or Media Owner",
      "Verify your identity for trust & safety",
      "Complete your profile with business details",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Create Your Listing",
    description: "Post what you're offering or what advertising space you have available",
    details: [
      "Upload high-quality images and descriptions",
      "Set your estimated value and requirements",
      "Choose categories and target audience",
      "Specify what you're seeking in return",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "Discover & Match",
    description: "Browse opportunities and find perfect matches for your barter needs",
    details: [
      "Use advanced filters to find relevant opportunities",
      "View detailed profiles and past reviews",
      "Get AI-powered match recommendations",
      "Save favorites and track interesting deals",
    ],
    color: "from-green-500 to-teal-500",
  },
  {
    icon: MessageSquare,
    title: "Negotiate & Connect",
    description: "Chat with potential partners to discuss terms and finalize details",
    details: [
      "Built-in messaging system for secure communication",
      "Share additional details and requirements",
      "Negotiate terms and timeline",
      "Exchange contact information when ready",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Handshake,
    title: "Finalize the Deal",
    description: "Agree on terms, create a deal contract, and set milestones",
    details: [
      "Create a formal deal agreement",
      "Set clear deliverables and timelines",
      "Choose payment protection if needed",
      "Define success metrics and milestones",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Megaphone,
    title: "Execute & Grow",
    description: "Complete the barter exchange and watch your brand visibility soar",
    details: [
      "Track progress through our dashboard",
      "Upload proof of delivery/execution",
      "Rate and review your partner",
      "Celebrate your successful barter!",
    ],
    color: "from-pink-500 to-rose-500",
  },
]

const userJourneys = {
  advertiser: {
    title: "For Advertisers",
    subtitle: "Turn your products/services into advertising power",
    steps: [
      {
        title: "List Your Offering",
        description: "Post what you can trade - products, services, vouchers, or experiences",
        example: "Coffee shop offers ₹15,000 worth of coffee vouchers",
      },
      {
        title: "Find Media Partners",
        description: "Browse billboards, influencers, radio stations, and digital publishers",
        example: "Discovers a billboard owner on MG Road seeking coffee for their office",
      },
      {
        title: "Negotiate the Trade",
        description: "Discuss terms, duration, and specific requirements",
        example: "Agrees to 6-month coffee supply for 2-week billboard display",
      },
      {
        title: "Execute & Measure",
        description: "Complete the exchange and track your advertising results",
        example: "Delivers coffee monthly, gets prime billboard space, tracks foot traffic increase",
      },
    ],
  },
  mediaOwner: {
    title: "For Media Owners",
    subtitle: "Monetize your unused inventory with valuable trades",
    steps: [
      {
        title: "List Your Inventory",
        description: "Post your available ad space with audience details and pricing",
        example: "Billboard owner lists MG Road location with 50K daily impressions",
      },
      {
        title: "Browse Barter Offers",
        description: "Find businesses offering products/services you need",
        example: "Finds coffee shop offering premium coffee subscription",
      },
      {
        title: "Negotiate Terms",
        description: "Discuss campaign duration, creative requirements, and deliverables",
        example: "Agrees to display coffee shop ad for 2 weeks in exchange for 6-month coffee supply",
      },
      {
        title: "Deliver & Receive",
        description: "Provide the advertising service and receive your bartered goods",
        example: "Displays the ad, receives monthly coffee delivery, builds ongoing relationship",
      },
    ],
  },
}

const benefits = [
  {
    icon: TrendingUp,
    title: "No Cash Required",
    description: "Trade directly without upfront advertising costs",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Verified users, secure messaging, and dispute resolution",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Find matches and close deals faster than traditional advertising",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Diverse Network",
    description: "Access to all media formats in one platform",
    color: "from-orange-500 to-red-500",
  },
]

const faqs = [
  {
    question: "How do I determine the value of my offering?",
    answer:
      "Use market rates as a baseline. For products, use retail value. For services, use your standard pricing. Our platform provides guidance and you can always negotiate with partners.",
  },
  {
    question: "What if the other party doesn't deliver as promised?",
    answer:
      "We have a dispute resolution system and offer Trust+ Escrow service for high-value deals. All users are verified and rated by the community.",
  },
  {
    question: "Can I trade with multiple partners simultaneously?",
    answer:
      "Yes! You can have multiple active deals. Just ensure you can fulfill all your commitments and manage your inventory accordingly.",
  },
  {
    question: "How long does a typical barter deal take to complete?",
    answer:
      "It varies by deal type. Simple trades can be completed in days, while ongoing services (like monthly deliveries) can span months. Most deals are finalized within 1-2 weeks.",
  },
  {
    question: "Is there a limit to the value of deals I can make?",
    answer:
      "No limits! We've facilitated deals from ₹5,000 to ₹5,00,000+. Higher value deals can use our Trust+ Escrow service for added security.",
  },
]

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">How Barter Adverts Works</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Transform your business growth through smart bartering. No cash, just value exchange.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">
              <Link href="/register">Start Trading Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="advertiser">For Advertisers</TabsTrigger>
              <TabsTrigger value="media-owner">For Media Owners</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-16">
              {/* Step by Step Process */}
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    6 Simple Steps to Success
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    From registration to successful barter - here's your complete journey
                  </p>
                </div>

                <div className="grid gap-8">
                  {mainSteps.map((step, index) => (
                    <div key={index} className="relative">
                      <Card
                        className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardContent className="p-8">
                          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`bg-gradient-to-br ${step.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}
                              >
                                <step.icon className="w-8 h-8 text-white" />
                              </div>
                              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className="text-2xl font-bold mb-2 text-gray-900">{step.title}</h3>
                              <p className="text-gray-600 mb-4 text-lg">{step.description}</p>
                              <div className="grid md:grid-cols-2 gap-2">
                                {step.details.map((detail, detailIndex) => (
                                  <div key={detailIndex} className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-gray-600">{detail}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Arrow between steps */}
                      {index < mainSteps.length - 1 && (
                        <div className="flex justify-center my-4">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                            <ArrowRight className="w-4 h-4 text-white rotate-90" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-white rounded-3xl p-12 shadow-xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Barter Adverts?</h2>
                  <p className="text-xl text-gray-600">The smartest way to grow without spending cash</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center group">
                      <div
                        className={`bg-gradient-to-br ${benefit.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Advertiser Journey */}
            <TabsContent value="advertiser" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {userJourneys.advertiser.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{userJourneys.advertiser.subtitle}</p>
              </div>

              <div className="grid gap-8">
                {userJourneys.advertiser.steps.map((step, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className="bg-gradient-to-br from-green-500 to-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                          <p className="text-gray-600 mb-4 text-lg">{step.description}</p>
                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-green-800 font-medium">Example: {step.example}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3"
                >
                  <Link href="/register?type=advertiser">Start as Advertiser</Link>
                </Button>
              </div>
            </TabsContent>

            {/* Media Owner Journey */}
            <TabsContent value="media-owner" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {userJourneys.mediaOwner.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{userJourneys.mediaOwner.subtitle}</p>
              </div>

              <div className="grid gap-8">
                {userJourneys.mediaOwner.steps.map((step, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                          <p className="text-gray-600 mb-4 text-lg">{step.description}</p>
                          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                            <p className="text-purple-800 font-medium">Example: {step.example}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
                >
                  <Link href="/register?type=media-owner">Start as Media Owner</Link>
                </Button>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Everything you need to know about barter advertising
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                          <div
                            className={`transform transition-transform duration-200 ${expandedFAQ === index ? "rotate-180" : ""}`}
                          >
                            <ArrowRight className="w-5 h-5 text-gray-500 rotate-90" />
                          </div>
                        </div>
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Barter Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already growing through smart bartering. No cash required, just value exchange.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
            >
              <Link href="/browse">Browse Opportunities</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
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
              Trusted by 500+ businesses
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
