"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Calendar, MessageSquare, Shield, Eye } from "lucide-react"

const userProfile = {
  id: 1,
  name: "Metro Advertising",
  avatar: "/placeholder.svg?height=100&width=100",
  type: "Media Owner",
  location: "Mumbai, Maharashtra",
  joinDate: "January 2024",
  verified: true,
  rating: 4.8,
  totalDeals: 12,
  responseTime: "2 hours",
  bio: "Leading outdoor advertising company in Mumbai with premium billboard locations across the city. We specialize in high-traffic areas and have been helping brands get noticed for over 5 years.",
}

const userListings = [
  {
    id: 1,
    title: "Billboard - Prime Location MG Road",
    type: "media",
    image: "/placeholder.svg?height=200&width=300",
    views: 156,
    seeking: "Office furniture, Tech equipment, Professional services",
  },
  {
    id: 2,
    title: "Digital Display - Bandra Station",
    type: "media",
    image: "/placeholder.svg?height=200&width=300",
    views: 89,
    seeking: "Restaurant vouchers, Event tickets, Software licenses",
  },
]

const reviews = [
  {
    id: 1,
    reviewer: "TechStart Solutions",
    rating: 5,
    comment: "Excellent billboard placement! Great visibility and professional service.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    reviewer: "FoodieExplorer",
    rating: 4,
    comment: "Good location and fair deal. Would work with them again.",
    date: "1 month ago",
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{userProfile.name}</h1>
                  {userProfile.verified && (
                    <Badge className="bg-green-500">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="secondary">{userProfile.type}</Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {userProfile.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {userProfile.joinDate}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {userProfile.rating} ({userProfile.totalDeals} deals)
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{userProfile.bio}</p>

                <div className="flex items-center space-x-4">
                  <Button>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline">View Contact Info</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {userListings.map((listing) => (
                    <div key={listing.id} className="flex space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{listing.title}</h3>
                          <Badge variant="outline">Ad Space</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Seeking: {listing.seeking}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="w-4 h-4 mr-1" />
                          {listing.views} views
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{review.reviewer}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Deals</span>
                  <span className="font-semibold">{userProfile.totalDeals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">{userProfile.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">{userProfile.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardHeader>
                <CardTitle>Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Identity Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Business Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Phone Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Email Verified</span>
                </div>
              </CardContent>
            </Card>

            {/* Report User */}
            <Card>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  Report User
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
