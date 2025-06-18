import { type NextRequest, NextResponse } from "next/server"

// Completely self-contained user approval
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { adminId, notes } = await request.json()
    const userId = params.id

    // Demo approval - just log the action
    console.log("Demo mode: User approved", {
      userId,
      adminId,
      notes,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "User approved successfully (demo mode)",
    })
  } catch (error) {
    console.error("User approval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
