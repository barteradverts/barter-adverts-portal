"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Users, Star, SlidersHorizontal } from "lucide-react"

const searchResults = [
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
    category: "Social Media",
    value: "₹25,000",
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
    category: "Food & Beverages",
    value: "₹15,000",
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
    category: "Outdoor Advertising",
    value: "₹30,000",
  },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    location: "",
    category: "",
    minValue: "",
    maxValue: "",
    verified: false,
  })

  const filteredResults = searchResults.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seeking.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filters.type === "all" || item.type === filters.type
    const matchesLocation = !filters.location || item.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesVerified = !filters.verified || item.verified

    return matchesSearch && matchesType && matchesLocation && matchesVerified
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Opportunities</h1>
          <p className="text-gray-600">Find the perfect barter deals and advertising opportunities</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for opportunities, products, services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button>Search</Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="media">Ad Inventory</SelectItem>
                        <SelectItem value="barter">Barter Offers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => setFilters({ ...filters, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="outdoor">Outdoor Advertising</SelectItem>
                        <SelectItem value="food">Food & Beverages</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Value Range</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Min ₹"
                        value={filters.minValue}
                        onChange={(e) => setFilters({ ...filters, minValue: e.target.value })}
                      />
                      <Input
                        placeholder="Max ₹"
                        value={filters.maxValue}
                        onChange={(e) => setFilters({ ...filters, maxValue: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={filters.verified}
                      onCheckedChange={(checked) => setFilters({ ...filters, verified: checked as boolean })}
                    />
                    <Label htmlFor="verified">Verified users only</Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredResults.length} results found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by Relevance</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="value-high">Highest Value</SelectItem>
              <SelectItem value="value-low">Lowest Value</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={item.type === "media" ? "default" : "secondary"}>
                    {item.type === "media" ? "Ad Space" : "Barter Offer"}
                  </Badge>
                </div>
                {item.verified && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500">Verified</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {item.rating}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Seeking:</p>
                  <p className="text-sm text-gray-600">{item.seeking}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {item.owner}
                  </div>
                  <span className="font-semibold text-blue-600">{item.value}</span>
                </div>

                <Button className="w-full">Contact</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No results found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilters({
                  type: "all",
                  location: "",
                  category: "",
                  minValue: "",
                  maxValue: "",
                  verified: false,
                })
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
