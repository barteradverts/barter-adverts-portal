"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare, Plus, BarChart3, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.replace("/login")
    }
  }, [router])

  if (!user) {
    return null // or a loading spinner
  }

  // Static demo data to avoid prerendering issues
  const stats = [
    {
      title: "Active Listings",
      value: "5",
      change: "+2 this week",
      icon: Plus,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Views",
      value: "1,234",
      change: "+12% this month",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Messages",
      value: "23",
      change: "3 unread",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Completed Deals",
      value: "8",
      change: "+2 this month",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentListings = [
    {
      id: 1,
      title: "Premium Billboard Space - MG Road",
      status: "active",
      views: 156,
      inquiries: 8,
      createdAt: "2 days ago",
    },
    {
      id: 2,
      title: "Social Media Marketing Package",
      status: "active",
      views: 89,
      inquiries: 5,
      createdAt: "5 days ago",
    },
    {
      id: 3,
      title: "Coffee Shop Partnership",
      status: "draft",
      views: 0,
      inquiries: 0,
      createdAt: "1 week ago",
    },
  ]

  const quickActions = [
    {
      title: "Create Listing",
      description: "Add a new barter offer or ad space",
      icon: Plus,
      action: () => router.push("/create-listing"),
      color: "bg-blue-500",
    },
    {
      title: "Browse Listings",
      description: "Find advertising opportunities",
      icon: Eye,
      action: () => router.push("/browse"),
      color: "bg-green-500",
    },
    {
      title: "Messages",
      description: "Check your conversations",
      icon: MessageSquare,
      action: () => router.push("/messages"),
      color: "bg-purple-500",
    },
    {
      title: "Analytics",
      description: "View detailed performance",
      icon: BarChart3,
      action: () => router.push("/analytics"),
      color: "bg-orange-500",
    },
  ]

  // Add resend handlers
  const handleResendEmail = async () => {
    if (!user.email) return;
    await fetch("/api/auth/resend-email-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    })
    alert("Verification email sent!")
  }

  const handleResendOTP = async () => {
    if (!user.phoneNumber) return;
    await fetch("/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: user.phoneNumber }),
    })
    alert("OTP sent to your phone!")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.firstName || user.name}! 👋</h1>
              <p className="text-gray-600">Here's what's happening with your listings</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500">{user.isPhoneVerified || user.verified ? "Verified" : "Unverified"}</Badge>
              <Badge variant="outline">{user.userType || user.type}</Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gray-50"
                  onClick={action.action}
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-sm text-gray-600">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Listings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Listings</CardTitle>
                <Button size="sm" onClick={() => router.push("/create-listing")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentListings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{listing.title}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {listing.views} views
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {listing.inquiries} inquiries
                          </span>
                          <span>{listing.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={listing.status === "active" ? "default" : "secondary"}>{listing.status}</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Listings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-semibold flex items-center gap-2">
                    {user.email}
                    {!user.isEmailVerified && (
                      <Button size="sm" variant="outline" onClick={handleResendEmail} className="text-xs px-2 py-0.5 h-6">
                        Verify
                      </Button>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-semibold flex items-center gap-2">
                    {user.phoneNumber}
                    {!user.isPhoneVerified && (
                      <Button size="sm" variant="outline" onClick={handleResendOTP} className="text-xs px-2 py-0.5 h-6">
                        Verify
                      </Button>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">{user.joinDate || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-semibold">{user.userType || user.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New inquiry on "Coffee Subscription"</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Listing viewed 15 times today</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Profile verification completed</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>• Add high-quality images to get 3x more inquiries</p>
                  <p>• Respond to messages within 2 hours for better ratings</p>
                  <p>• Featured listings get 5x more visibility</p>
                  <p>• Complete your profile verification for trust</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
