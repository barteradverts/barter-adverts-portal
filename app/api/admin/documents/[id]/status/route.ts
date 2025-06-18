import { type NextRequest, NextResponse } from "next/server"
import { updateDocumentStatus } from "@/lib/database/user-approval-queries"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status, adminId, rejectionReason } = await request.json()

    if (!status || !adminId) {
      return NextResponse.json({ error: "Status and admin ID are required" }, { status: 400 })
    }

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    if (status === "rejected" && !rejectionReason) {
      return NextResponse.json({ error: "Rejection reason is required" }, { status: 400 })
    }

    const result = await updateDocumentStatus(params.id, status, adminId, rejectionReason)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Document ${status} successfully`,
      })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Document status update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
