"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Users, Star } from "lucide-react"

const sampleListings = [
  {
    id: 1,
    type: "media",
    title: "Instagram Food Account - 45K Followers",
    location: "Mumbai",
    owner: "FoodieExplorer",
    rating: 4.8,
    description:
      "Authentic food content creator with engaged Mumbai audience. Perfect for restaurants and food brands.",
    seeking: "Restaurant vouchers, Food products, Kitchen equipment",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 2,
    type: "barter",
    title: "Premium Coffee Subscription (6 months)",
    location: "Bangalore",
    owner: "BrewMaster Cafe",
    rating: 4.9,
    description: "Offering 6-month premium coffee subscription (₹15,000 value) for quality advertising exposure.",
    seeking: "Billboard space, Influencer posts, Radio mentions",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 3,
    type: "media",
    title: "Billboard - Prime Location MG Road",
    location: "Delhi",
    owner: "Metro Advertising",
    rating: 4.7,
    description: "High-traffic billboard on MG Road. 2 weeks minimum booking. Perfect visibility for local businesses.",
    seeking: "Office furniture, Tech equipment, Professional services",
    image: "/placeholder.svg?height=200&width=300",
    verified: false,
  },
  {
    id: 4,
    type: "barter",
    title: "Web Development Services",
    location: "Pune",
    owner: "TechCraft Solutions",
    rating: 4.6,
    description: "Complete website development package worth ₹50,000. Modern, responsive design with CMS.",
    seeking: "Digital marketing, Social media promotion, PR coverage",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "media" | "barter">("all")

  const filteredListings = sampleListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || listing.type === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover amazing barter deals and advertising opportunities</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                All
              </Button>
              <Button variant={filter === "media" ? "default" : "outline"} onClick={() => setFilter("media")}>
                Ad Inventory
              </Button>
              <Button variant={filter === "barter" ? "default" : "outline"} onClick={() => setFilter("barter")}>
                Barter Offers
              </Button>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={listing.type === "media" ? "default" : "secondary"}>
                    {listing.type === "media" ? "Ad Space" : "Barter Offer"}
                  </Badge>
                </div>
                {listing.verified && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500">Verified</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{listing.title}</CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {listing.rating}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{listing.description}</p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Seeking:</p>
                  <p className="text-sm text-gray-600">{listing.seeking}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {listing.owner}
                  </div>
                  <Button size="sm">Contact</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No opportunities found matching your criteria.</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
