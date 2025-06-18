import { type NextRequest, NextResponse } from "next/server"
import { bulkApproveUsers } from "@/lib/database/user-approval-queries"

export async function POST(request: NextRequest) {
  try {
    const { userIds, adminId, batchName } = await request.json()

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: "User IDs array is required" }, { status: 400 })
    }

    if (!adminId) {
      return NextResponse.json({ error: "Admin ID is required" }, { status: 400 })
    }

    const result = await bulkApproveUsers(userIds, adminId, batchName || `Bulk approval ${new Date().toISOString()}`)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Bulk approval completed: ${result.approved} approved, ${result.rejected} failed`,
        data: result,
      })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Bulk approval error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
