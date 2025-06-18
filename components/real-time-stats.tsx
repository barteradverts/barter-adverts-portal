"use client"

import { useState, useEffect } from "react"

interface StatsProps {
  overview: {
    totalListings: number
    activeListings: number
    totalViews: number
    totalInquiries: number
    completedDeals: number
    totalRevenue: number
    conversionRate: string
    responseRate: string
  }
}

export function RealTimeStats({ overview }: StatsProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      setTimeout(() => setIsUpdating(false), 500)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      label: "Total Views",
      value: overview.totalViews,
      change: "+12%",
      positive: true,
      icon: "👁️",
    },
    {
      label: "Active Listings",
      value: overview.activeListings,
      change: "+2",
      positive: true,
      icon: "📋",
    },
    {
      label: "Inquiries",
      value: overview.totalInquiries,
      change: "+5",
      positive: true,
      icon: "💬",
    },
    {
      label: "Completed Deals",
      value: overview.completedDeals,
      change: "+1",
      positive: true,
      icon: "🤝",
    },
    {
      label: "Total Revenue",
      value: `₹${overview.totalRevenue.toLocaleString()}`,
      change: "+8%",
      positive: true,
      icon: "💰",
    },
    {
      label: "Conversion Rate",
      value: `${overview.conversionRate}%`,
      change: "+0.5%",
      positive: true,
      icon: "📈",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`bg-white p-6 rounded-lg shadow transition-all duration-300 ${
            isUpdating ? "ring-2 ring-blue-200 bg-blue-50" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
          {isUpdating && <div className="mt-3 text-xs text-blue-600 font-medium">⟳ Updating...</div>}
        </div>
      ))}
    </div>
  )
}
