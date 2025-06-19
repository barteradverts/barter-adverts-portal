import { type NextRequest, NextResponse } from "next/server"
import connectDB from '@/app/lib/db'
import { User } from '@/app/models/User'

// Completely self-contained user rejection
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { adminId, reason, notes } = await request.json()
    const userId = params.id

    // Find the user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // For now, we'll just log the rejection
    // In a real application, you might want to:
    // - Set a rejection status
    // - Send notification to user
    // - Store rejection reason in a separate collection

    // Log the rejection action
    console.log("User rejected", {
      userId,
      adminId,
      reason,
      notes,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "User rejected successfully",
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      }
    })
  } catch (error) {
    console.error("User rejection error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
