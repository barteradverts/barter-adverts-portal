import { type NextRequest, NextResponse } from "next/server"

// Completely self-contained dashboard data
export async function GET(request: NextRequest) {
  try {
    // Hardcoded demo statistics
    const stats = {
      totalUsers: 1247,
      pendingUsers: 23,
      totalListings: 892,
      pendingListings: 15,
      totalDeals: 456,
      totalRevenue: 1240000,
      recentActivity: [
        {
          id: "activity-1",
          type: "user_registration",
          description: "New user registered: Rajesh Kumar",
          timestamp: new Date().toISOString(),
        },
        {
          id: "activity-2",
          type: "listing_created",
          description: "New listing: Digital Marketing Services",
          timestamp: new Date().toISOString(),
        },
        {
          id: "activity-3",
          type: "user_approved",
          description: "User approved: Priya Sharma",
          timestamp: new Date().toISOString(),
        },
      ],
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
