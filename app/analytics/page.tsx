"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Eye, MessageSquare, Users, DollarSign, Calendar, Download } from "lucide-react"

const analyticsData = {
  overview: {
    totalViews: 12450,
    totalInquiries: 234,
    activeListings: 8,
    completedDeals: 12,
    conversionRate: "1.88%",
    avgResponseTime: "2.3 hours",
  },
  chartData: {
    views: [120, 150, 180, 200, 165, 190, 220],
    inquiries: [12, 18, 15, 22, 19, 25, 28],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  topListings: [
    {
      id: 1,
      title: "Premium Billboard Space - MG Road",
      views: 1250,
      inquiries: 45,
      conversionRate: "3.6%",
      status: "active",
    },
    {
      id: 2,
      title: "Instagram Food Account - 45K Followers",
      views: 980,
      inquiries: 32,
      conversionRate: "3.3%",
      status: "active",
    },
    {
      id: 3,
      title: "Coffee Subscription Package",
      views: 750,
      inquiries: 28,
      conversionRate: "3.7%",
      status: "active",
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "inquiry",
      message: "New inquiry on 'Premium Billboard Space'",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "view",
      message: "Your listing was viewed 15 times today",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      type: "deal",
      message: "Deal completed with Metro Advertising",
      timestamp: "1 day ago",
    },
  ],
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your listing performance and engagement</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {["7d", "30d", "90d"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
                </button>
              ))}
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Total Views"
            value={analyticsData.overview.totalViews.toLocaleString()}
            change="+12% vs last week"
            icon={Eye}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Inquiries"
            value={analyticsData.overview.totalInquiries}
            change="+8% vs last week"
            icon={MessageSquare}
            color="bg-green-500"
          />
          <StatCard
            title="Active Listings"
            value={analyticsData.overview.activeListings}
            change="+2 this week"
            icon={BarChart3}
            color="bg-purple-500"
          />
          <StatCard
            title="Completed Deals"
            value={analyticsData.overview.completedDeals}
            change="+3 this month"
            icon={DollarSign}
            color="bg-orange-500"
          />
          <StatCard
            title="Conversion Rate"
            value={analyticsData.overview.conversionRate}
            change="+0.3% vs last week"
            icon={TrendingUp}
            color="bg-red-500"
          />
          <StatCard
            title="Avg Response Time"
            value={analyticsData.overview.avgResponseTime}
            change="-0.5h vs last week"
            icon={Calendar}
            color="bg-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Views Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Views & Inquiries Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {analyticsData.chartData.views.map((views, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: "200px" }}>
                        <div
                          className="bg-blue-500 rounded-t-lg absolute bottom-0 w-full"
                          style={{ height: `${(views / Math.max(...analyticsData.chartData.views)) * 100}%` }}
                        />
                        <div
                          className="bg-green-500 rounded-t-lg absolute bottom-0 w-full opacity-70"
                          style={{
                            height: `${(analyticsData.chartData.inquiries[index] / Math.max(...analyticsData.chartData.inquiries)) * 50}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{analyticsData.chartData.labels[index]}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2" />
                    <span className="text-sm text-gray-600">Views</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2" />
                    <span className="text-sm text-gray-600">Inquiries</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topListings.map((listing, index) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{listing.title}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {listing.views} views
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {listing.inquiries} inquiries
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{listing.conversionRate}</Badge>
                        <p className="text-xs text-gray-500 mt-1">conversion rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "inquiry"
                            ? "bg-green-500"
                            : activity.type === "view"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Performance Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>• Add high-quality images to increase views by 3x</p>
                  <p>• Respond to inquiries within 2 hours for better conversion</p>
                  <p>• Update your listings weekly to maintain visibility</p>
                  <p>• Use relevant keywords in titles and descriptions</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Detailed Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Audience Insights
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
