import { type NextRequest, NextResponse } from "next/server"
import connectDB from '@/app/lib/db'
import { User } from '@/app/models/User'

// Completely self-contained dashboard data
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get real statistics from database
    const totalUsers = await User.countDocuments()
    const pendingUsers = await User.countDocuments({
      $or: [
        { isEmailVerified: false },
        { isPhoneVerified: false }
      ]
    })

    // For now, we'll use placeholder data for listings and deals
    // In a real application, you would have separate models for these
    const totalListings = 0 // TODO: Replace with actual Listing model
    const pendingListings = 0 // TODO: Replace with actual Listing model
    const totalDeals = 0 // TODO: Replace with actual Deal model
    const totalRevenue = 0 // TODO: Replace with actual revenue calculation

    const stats = {
      totalUsers,
      pendingUsers,
      totalListings,
      pendingListings,
      totalDeals,
      totalRevenue,
      recentActivity: [
        {
          id: "activity-1",
          type: "user_registration",
          description: `Total users: ${totalUsers}`,
          timestamp: new Date().toISOString(),
        },
        {
          id: "activity-2",
          type: "pending_verifications",
          description: `Pending verifications: ${pendingUsers}`,
          timestamp: new Date().toISOString(),
        },
        {
          id: "activity-3",
          type: "system_status",
          description: "System running normally",
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
