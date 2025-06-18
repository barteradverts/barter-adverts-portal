import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const period = searchParams.get("period") || "30d"

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Simulate real-time data with some randomization
    const baseDate = new Date()
    const analytics = {
      overview: {
        totalListings: Math.floor(Math.random() * 10) + 5,
        activeListings: Math.floor(Math.random() * 5) + 3,
        totalViews: Math.floor(Math.random() * 200) + 150,
        totalInquiries: Math.floor(Math.random() * 30) + 15,
        completedDeals: Math.floor(Math.random() * 8) + 3,
        totalRevenue: Math.floor(Math.random() * 50000) + 25000,
        conversionRate: (Math.random() * 10 + 5).toFixed(1),
        responseRate: (Math.random() * 20 + 80).toFixed(1),
      },
      chartData: {
        views: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 10),
        inquiries: Array.from({ length: 7 }, () => Math.floor(Math.random() * 8) + 2),
        deals: Array.from({ length: 7 }, () => Math.floor(Math.random() * 3)),
        revenue: Array.from({ length: 7 }, () => Math.floor(Math.random() * 5000) + 1000),
        labels: Array.from({ length: 7 }, (_, i) => {
          const date = new Date(baseDate)
          date.setDate(date.getDate() - (6 - i))
          return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        }),
      },
      topListings: [
        {
          id: 1,
          title: "Premium Billboard Space - MG Road",
          views: Math.floor(Math.random() * 100) + 50,
          inquiries: Math.floor(Math.random() * 15) + 5,
          status: "active",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          title: "Social Media Marketing Package",
          views: Math.floor(Math.random() * 80) + 30,
          inquiries: Math.floor(Math.random() * 12) + 3,
          status: "active",
          createdAt: "2024-01-10",
        },
        {
          id: 3,
          title: "Coffee Shop Partnership",
          views: Math.floor(Math.random() * 60) + 20,
          inquiries: Math.floor(Math.random() * 8) + 2,
          status: "paused",
          createdAt: "2024-01-08",
        },
      ],
      recentActivity: [
        {
          id: 1,
          type: "inquiry",
          message: "New inquiry on Billboard Space listing",
          timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        },
        {
          id: 2,
          type: "deal",
          message: "Deal completed with Metro Advertising",
          timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        },
        {
          id: 3,
          type: "message",
          message: "New message from TechStart Solutions",
          timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(),
        },
        {
          id: 4,
          type: "view",
          message: "Your listing got 15 new views today",
          timestamp: new Date(Date.now() - Math.random() * 1800000).toISOString(),
        },
      ],
    }

    return NextResponse.json({
      success: true,
      data: analytics,
      period,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
