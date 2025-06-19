"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  Handshake,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserApprovalDashboard } from "@/components/admin/user-approval-dashboard"

const stats = [
  { title: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "text-blue-600" },
  { title: "Active Listings", value: "856", change: "+8%", icon: FileText, color: "text-green-600" },
  { title: "Completed Deals", value: "342", change: "+15%", icon: Handshake, color: "text-purple-600" },
  { title: "Revenue (₹)", value: "12.4L", change: "+22%", icon: DollarSign, color: "text-orange-600" },
]

const pendingUsers = [
  {
    id: 1,
    name: "Rajesh Enterprises",
    email: "rajesh@example.com",
    type: "Media Owner",
    submitted: "2024-01-20",
    documents: ["GST Certificate", "Business License"],
  },
  {
    id: 2,
    name: "Digital Marketing Pro",
    email: "contact@dmpro.com",
    type: "Advertiser",
    submitted: "2024-01-19",
    documents: ["Company Registration", "Portfolio"],
  },
]

const pendingListings = [
  {
    id: 1,
    title: "Premium Billboard - Central Mumbai",
    owner: "Metro Advertising",
    type: "Media",
    value: "₹50,000",
    submitted: "2024-01-20",
    status: "pending",
  },
  {
    id: 2,
    title: "Software Development Services",
    owner: "TechCraft Solutions",
    type: "Barter",
    value: "₹75,000",
    submitted: "2024-01-19",
    status: "pending",
  },
]

const disputes = [
  {
    id: 1,
    title: "Coffee delivery not completed",
    parties: ["BrewMaster Cafe", "Metro Advertising"],
    status: "open",
    priority: "high",
    created: "2024-01-18",
  },
  {
    id: 2,
    title: "Billboard content approval delay",
    parties: ["Urban Threads", "City Displays"],
    status: "investigating",
    priority: "medium",
    created: "2024-01-17",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        router.replace("/login")
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.replace("/login")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Welcome, {user?.firstName} {user?.lastName} (Super Admin)
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/audit-logs">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Audit Logs
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} from last month</p>
                      </div>
                      <div className={`${stat.color} bg-gray-100 p-3 rounded-full`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                    Pending Verifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.type}</p>
                        </div>
                        <Button size="sm">Review</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-500" />
                    Pending Listings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingListings.slice(0, 3).map((listing) => (
                      <div key={listing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{listing.title}</p>
                          <p className="text-xs text-gray-500">{listing.value}</p>
                        </div>
                        <Button size="sm">Review</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-red-500" />
                    Active Disputes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {disputes.slice(0, 3).map((dispute) => (
                      <div key={dispute.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{dispute.title}</p>
                          <Badge
                            variant={dispute.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {dispute.priority}
                          </Badge>
                        </div>
                        <Button size="sm">Handle</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserApprovalDashboard />
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingListings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{listing.title}</h3>
                          <Badge variant={listing.type === "Media" ? "default" : "secondary"}>{listing.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Owner: {listing.owner}</p>
                        <p className="text-sm font-medium text-green-600">{listing.value}</p>
                        <p className="text-xs text-gray-500">Submitted: {listing.submitted}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Handshake className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Deal Management</h3>
                  <p className="text-gray-600">Monitor active deals, track completion rates, and handle escalations.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{dispute.title}</h3>
                          <Badge
                            variant={
                              dispute.status === "open"
                                ? "destructive"
                                : dispute.status === "investigating"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {dispute.status}
                          </Badge>
                          <Badge
                            variant={dispute.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {dispute.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Parties: {dispute.parties.join(" vs ")}</p>
                        <p className="text-xs text-gray-500">Created: {dispute.created}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Mediate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
