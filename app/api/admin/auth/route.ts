import { type NextRequest, NextResponse } from "next/server"

// Completely self-contained admin authentication
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Demo authentication - completely hardcoded
    if (email === "admin@demo.com" && password === "demo123") {
      return NextResponse.json({
        success: true,
        admin: {
          id: "demo-admin-1",
          name: "Demo Admin",
          email: "admin@demo.com",
          role: "super_admin",
        },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Admin authentication error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
