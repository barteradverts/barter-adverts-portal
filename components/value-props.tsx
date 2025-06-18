"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Handshake,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react"

const valueProps = [
  {
    icon: DollarSign,
    title: "Zero Cash Investment",
    description: "Trade products and services directly without spending money on advertising",
    benefit: "Save up to 80% on marketing costs",
    color: "from-green-500 to-emerald-500",
    stats: "₹2.5Cr+ saved by users",
  },
  {
    icon: Clock,
    title: "Quick Deal Closure",
    description: "Find matches and close deals 5x faster than traditional advertising channels",
    benefit: "Average deal closure in 7 days",
    color: "from-blue-500 to-cyan-500",
    stats: "85% deals closed within 2 weeks",
  },
  {
    icon: Shield,
    title: "Trust & Safety First",
    description: "Verified users, secure transactions, and dispute resolution for peace of mind",
    benefit: "99.2% successful completion rate",
    color: "from-purple-500 to-pink-500",
    stats: "2,500+ verified businesses",
  },
  {
    icon: Users,
    title: "Diverse Network",
    description: "Access to all media formats - digital, outdoor, print, radio, and influencers",
    benefit: "One platform for all advertising needs",
    color: "from-orange-500 to-red-500",
    stats: "15+ media categories available",
  },
  {
    icon: TrendingUp,
    title: "Better ROI",
    description: "Get premium advertising exposure while trading excess inventory or services",
    benefit: "Average 300% better ROI vs paid ads",
    color: "from-indigo-500 to-purple-500",
    stats: "4.8/5 average satisfaction rating",
  },
  {
    icon: Handshake,
    title: "Win-Win Partnerships",
    description: "Build long-term business relationships through mutually beneficial exchanges",
    benefit: "70% of users make repeat deals",
    color: "from-pink-500 to-rose-500",
    stats: "850+ successful partnerships",
  },
]

const successStories = [
  {
    company: "TechStart Solutions",
    industry: "Software",
    deal: "Traded ₹25,000 software licenses for prime billboard space",
    result: "40% increase in brand awareness",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    company: "Cafe Mocha",
    industry: "F&B",
    deal: "Exchanged coffee vouchers for influencer marketing",
    result: "200% boost in foot traffic",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    company: "FitLife Gym",
    industry: "Fitness",
    deal: "Bartered gym memberships for radio advertising",
    result: "150 new members in 30 days",
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

export function ValueProps() {
  const [activeStory, setActiveStory] = useState(0)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Why Choose Barter Adverts</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Smart Trading,
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Smarter Growth
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses already growing through strategic bartering. No cash required, just value
            exchange.
          </p>
        </div>

        {/* Value Propositions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {valueProps.map((prop, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
            >
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div
                    className={`bg-gradient-to-br ${prop.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <prop.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                    <Zap className="w-3 h-3" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {prop.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">{prop.description}</p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center text-blue-700 font-semibold text-sm mb-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Key Benefit
                  </div>
                  <p className="text-blue-800 font-medium">{prop.benefit}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{prop.stats}</span>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Real Success Stories</h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              See how businesses like yours are thriving through smart bartering
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className={`bg-white/10 backdrop-blur-sm border-white/20 text-white cursor-pointer transition-all duration-300 ${
                  activeStory === index ? "ring-2 ring-white scale-105" : "hover:bg-white/20"
                }`}
                onClick={() => setActiveStory(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={story.avatar || "/placeholder.svg"}
                      alt={story.company}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{story.company}</h4>
                      <p className="text-white/70 text-sm">{story.industry}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm opacity-90 mb-2">The Deal:</p>
                    <p className="font-medium">{story.deal}</p>
                  </div>

                  <div className="bg-green-400/20 p-3 rounded-lg">
                    <p className="text-sm opacity-90 mb-1">Result:</p>
                    <p className="font-bold text-green-300">{story.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
            >
              Read More Success Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
