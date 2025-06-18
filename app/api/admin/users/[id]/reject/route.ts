import { type NextRequest, NextResponse } from "next/server"

// Completely self-contained user rejection
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { adminId, reason, notes } = await request.json()
    const userId = params.id

    // Demo rejection - just log the action
    console.log("Demo mode: User rejected", {
      userId,
      adminId,
      reason,
      notes,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "User rejected successfully (demo mode)",
    })
  } catch (error) {
    console.error("User rejection error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
