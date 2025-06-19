import { type NextRequest, NextResponse } from "next/server"
import connectDB from '@/app/lib/db'
import { User } from '@/app/models/User'

// Completely self-contained pending users data
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get users that need verification (email or phone not verified)
    const pendingUsers = await User.find({
      $or: [
        { isEmailVerified: false },
        { isPhoneVerified: false }
      ]
    }).select('-password -pin -otp -otpExpiresAt -emailVerificationToken -emailVerificationExpiresAt')

    // Transform the data to match the expected format
    const formattedUsers = pendingUsers.map(user => ({
      id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      company: user.company || 'N/A',
      phone: user.phoneNumber,
      status: !user.isEmailVerified && !user.isPhoneVerified ? 'pending' : 'partial',
      created_at: user.createdAt.toISOString(),
      documents: [], // TODO: Add document model when available
      verification_status: !user.isEmailVerified && !user.isPhoneVerified ? 'documents_required' : 'under_review',
      userType: user.userType,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified
    }))

    return NextResponse.json({
      success: true,
      data: formattedUsers
    })
  } catch (error) {
    console.error("Pending users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
