"use client"

import { useState, useEffect } from "react"

interface AnalyticsData {
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
  chartData: {
    views: number[]
    inquiries: number[]
    deals: number[]
    revenue: number[]
    labels: string[]
  }
  topListings: Array<{
    id: number
    title: string
    views: number
    inquiries: number
    status: string
    createdAt: string
  }>
  recentActivity: Array<{
    id: number
    type: string
    message: string
    timestamp: string
  }>
}

export function useAnalytics(userId: string, period = "30d") {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/analytics?userId=${userId}&period=${period}`)
        const result = await response.json()

        if (result.success) {
          setData(result.data)
          setError(null)
        } else {
          setError(result.error || "Failed to fetch analytics")
        }
      } catch (err) {
        setError("Network error")
        console.error("Analytics fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchAnalytics()

      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchAnalytics, 30000)
      return () => clearInterval(interval)
    }
  }, [userId, period])

  const trackEvent = async (action: string, properties?: Record<string, any>) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          properties,
          userId,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Event tracking error:", error)
    }
  }

  return { data, loading, error, trackEvent }
}
