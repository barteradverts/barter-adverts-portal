"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MessageSquare, CheckCircle, Clock, AlertCircle, FileText, Upload } from "lucide-react"

const dealData = {
  id: 1,
  title: "Coffee Subscription for Billboard Space",
  status: "in-progress",
  progress: 60,
  value: "₹15,000",
  startDate: "2024-01-15",
  endDate: "2024-02-15",
  partner: {
    name: "Metro Advertising",
    avatar: "/placeholder.svg?height=40&width=40",
    type: "Media Owner",
  },
  myOffer: {
    title: "Premium Coffee Subscription (6 months)",
    description: "Monthly delivery of premium coffee beans, includes 2kg per month of specialty roasts",
    value: "₹15,000",
  },
  theirOffer: {
    title: "Billboard - Prime Location MG Road",
    description: "2 weeks display time at high-traffic junction near MG Road metro station",
    value: "₹15,000",
  },
  milestones: [
    { id: 1, title: "Deal Agreement", status: "completed", date: "2024-01-15" },
    { id: 2, title: "Content Approval", status: "completed", date: "2024-01-18" },
    { id: 3, title: "Billboard Installation", status: "in-progress", date: "2024-01-22" },
    { id: 4, title: "First Coffee Delivery", status: "pending", date: "2024-01-25" },
    { id: 5, title: "Campaign Completion", status: "pending", date: "2024-02-15" },
  ],
}

export default function DealDetailsPage() {
  const [newUpdate, setNewUpdate] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-gray-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{dealData.title}</h1>
              <div className="flex items-center space-x-4">
                <Badge variant={dealData.status === "completed" ? "default" : "secondary"}>{dealData.status}</Badge>
                <span className="text-gray-600">Deal Value: {dealData.value}</span>
              </div>
            </div>
            <Button>
              <MessageSquare className="w-4 h-4 mr-2" />
              Message Partner
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{dealData.progress}%</span>
                  </div>
                  <Progress value={dealData.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Started: {dealData.startDate}</span>
                    <span>Due: {dealData.endDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deal Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">{dealData.myOffer.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{dealData.myOffer.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Value</span>
                    <span className="font-semibold">{dealData.myOffer.value}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Their Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">{dealData.theirOffer.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{dealData.theirOffer.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Value</span>
                    <span className="font-semibold">{dealData.theirOffer.value}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dealData.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(milestone.status)}`}
                      >
                        {milestone.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <span className="text-sm text-gray-500">{milestone.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {getStatusIcon(milestone.status)}
                          <span className="text-sm text-gray-600 ml-2 capitalize">{milestone.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Billboard installation in progress</span>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Our team has started installing your advertisement on the MG Road billboard. Expected completion
                      by tomorrow.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Content approved</span>
                      <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your advertisement design has been approved and is ready for installation.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Add Update</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Share an update about this deal..."
                      value={newUpdate}
                      onChange={(e) => setNewUpdate(e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Attach File
                      </Button>
                      <Button size="sm" disabled={!newUpdate.trim()}>
                        Post Update
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Partner Info */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage src={dealData.partner.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{dealData.partner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{dealData.partner.name}</p>
                    <p className="text-sm text-gray-500">{dealData.partner.type}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Deal Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Contract
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" size="sm">
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            {/* Deal Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deal Created</span>
                    <span>{dealData.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Completion</span>
                    <span>{dealData.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days Remaining</span>
                    <span className="font-medium">8 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
