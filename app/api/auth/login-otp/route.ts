import { type NextRequest, NextResponse } from "next/server"

const users = [
  {
    id: "demo-1",
    firstName: "Demo",
    lastName: "Advertiser",
    phoneNumber: "+919876543210",
    userType: "advertiser",
    verified: true,
  },
  {
    id: "demo-2",
    firstName: "Demo",
    lastName: "Media Owner",
    phoneNumber: "+919876543211",
    userType: "media-owner",
    verified: true,
  },
]

const otpStore: any = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, otp } = body

    const storedOTP = otpStore[phoneNumber]
    if (!storedOTP || storedOTP.expiresAt < Date.now()) {
      return NextResponse.json({ error: "OTP expired or not found" }, { status: 400 })
    }

    if (storedOTP.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    const user = users.find((u) => u.phoneNumber === phoneNumber)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    delete otpStore[phoneNumber]

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
      },
    })
  } catch (error) {
    console.error("OTP login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
