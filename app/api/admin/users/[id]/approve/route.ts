import { type NextRequest, NextResponse } from "next/server"
import connectDB from '@/app/lib/db'
import { User } from '@/app/models/User'

// Completely self-contained user approval
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { adminId, notes } = await request.json()
    const userId = params.id

    // Find the user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user verification status
    user.isEmailVerified = true
    user.isPhoneVerified = true
    await user.save()

    // Log the approval action
    console.log("User approved", {
      userId,
      adminId,
      notes,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "User approved successfully",
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified
      }
    })
  } catch (error) {
    console.error("User approval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
