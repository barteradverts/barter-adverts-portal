import { type NextRequest, NextResponse } from "next/server"
import connectDB from '@/app/lib/db'
import { User } from '@/app/models/User'

// Completely self-contained admin authentication
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user is a super_admin
    if (user.userType !== 'super_admin') {
      return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 })
    }

    // Check if email and phone are verified
    if (!user.isEmailVerified || !user.isPhoneVerified) {
      return NextResponse.json(
        {
          error: 'Please verify your email and phone number first',
          needsVerification: true,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified
        },
        { status: 403 }
      )
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      admin: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        role: user.userType,
      },
    })

  } catch (error) {
    console.error("Admin authentication error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
