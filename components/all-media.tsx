"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Monitor,
  Radio,
  Newspaper,
  MapPin,
  Instagram,
  Smartphone,
  Mail,
  Megaphone,
  Users,
  ArrowRight,
  Star,
  TrendingUp,
  Eye,
} from "lucide-react"

const mediaTypes = [
  {
    icon: Monitor,
    title: "Digital Advertising",
    description: "Websites, apps, social media ads, and online banners",
    examples: ["Google Ads", "Facebook Ads", "Website Banners", "App Promotions"],
    avgReach: "50K-2M",
    color: "from-blue-500 to-cyan-500",
    popular: true,
  },
  {
    icon: MapPin,
    title: "Outdoor Media",
    description: "Billboards, hoardings, transit ads, and street furniture",
    examples: ["Billboards", "Bus Shelters", "Metro Ads", "Street Banners"],
    avgReach: "100K-5M",
    color: "from-green-500 to-emerald-500",
    popular: true,
  },
  {
    icon: Instagram,
    title: "Influencer Marketing",
    description: "Social media influencers across all platforms and niches",
    examples: ["Instagram Posts", "YouTube Videos", "TikTok Content", "Blog Reviews"],
    avgReach: "10K-1M",
    color: "from-pink-500 to-rose-500",
    popular: true,
  },
  {
    icon: Radio,
    title: "Audio Advertising",
    description: "Radio stations, podcasts, and audio streaming platforms",
    examples: ["FM Radio", "Podcasts", "Spotify Ads", "Audio Streaming"],
    avgReach: "25K-500K",
    color: "from-purple-500 to-indigo-500",
    popular: false,
  },
  {
    icon: Newspaper,
    title: "Print Media",
    description: "Newspapers, magazines, brochures, and print publications",
    examples: ["Newspapers", "Magazines", "Brochures", "Flyers"],
    avgReach: "20K-300K",
    color: "from-orange-500 to-red-500",
    popular: false,
  },
  {
    icon: Mail,
    title: "Direct Marketing",
    description: "Email campaigns, SMS marketing, and direct mail",
    examples: ["Email Newsletters", "SMS Campaigns", "Direct Mail", "WhatsApp Marketing"],
    avgReach: "5K-100K",
    color: "from-teal-500 to-cyan-500",
    popular: false,
  },
  {
    icon: Megaphone,
    title: "Event Marketing",
    description: "Sponsorships, exhibitions, conferences, and live events",
    examples: ["Event Sponsorship", "Exhibition Stalls", "Conference Branding", "Live Events"],
    avgReach: "1K-50K",
    color: "from-yellow-500 to-orange-500",
    popular: false,
  },
  {
    icon: Smartphone,
    title: "Mobile Marketing",
    description: "App ads, mobile banners, and location-based advertising",
    examples: ["In-App Ads", "Mobile Banners", "Location Ads", "Push Notifications"],
    avgReach: "30K-1M",
    color: "from-indigo-500 to-purple-500",
    popular: false,
  },
]

const featuredDeals = [
  {
    title: "Premium Billboard - MG Road",
    type: "Outdoor Media",
    location: "Mumbai",
    reach: "2M+ daily views",
    seeking: "Restaurant vouchers, Tech services",
    value: "₹25,000",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Food Influencer - 85K Followers",
    type: "Influencer Marketing",
    location: "Delhi",
    reach: "85K engaged followers",
    seeking: "Food products, Kitchen appliances",
    value: "₹15,000",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Tech Podcast - 50K Listeners",
    type: "Audio Advertising",
    location: "Bangalore",
    reach: "50K monthly listeners",
    seeking: "Software licenses, Gadgets",
    value: "₹20,000",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function AllMedia() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAll, setShowAll] = useState(false)

  const displayedMedia = showAll ? mediaTypes : mediaTypes.slice(0, 6)
  const filteredMedia = selectedCategory === "all" ? displayedMedia : displayedMedia.filter((media) => media.popular)

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">All Media Types Available</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Every Advertising Format
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Under One Roof
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From traditional billboards to modern influencer marketing - find the perfect advertising medium for your
            brand on our unified platform.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="px-6 py-2"
          >
            All Media Types
          </Button>
          <Button
            variant={selectedCategory === "popular" ? "default" : "outline"}
            onClick={() => setSelectedCategory("popular")}
            className="px-6 py-2"
          >
            Most Popular
          </Button>
        </div>

        {/* Media Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredMedia.map((media, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
            >
              {media.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-yellow-400 text-gray-900 font-bold">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-6">
                <div
                  className={`bg-gradient-to-br ${media.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <media.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {media.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{media.description}</p>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Eye className="w-4 h-4 mr-1" />
                    Avg. Reach: {media.avgReach}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {media.examples.slice(0, 2).map((example, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                    {media.examples.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{media.examples.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-colors"
                >
                  Explore Options
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && mediaTypes.length > 6 && (
          <div className="text-center mb-16">
            <Button variant="outline" size="lg" onClick={() => setShowAll(true)} className="px-8 py-3">
              Show All Media Types
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Featured Deals */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Opportunities</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hot deals available right now - grab them before they're gone!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDeals.map((deal, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-500 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot Deal
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary">{deal.type}</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {deal.title}
                  </h4>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {deal.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {deal.reach}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Seeking:</p>
                    <p className="text-sm font-medium text-gray-700">{deal.seeking}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">{deal.value}</span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Contact Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
              Browse All Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
