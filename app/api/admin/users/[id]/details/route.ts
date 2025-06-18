import { NextResponse } from "next/server"
import { getUserApprovalDetails } from "@/lib/database/user-approval-queries"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userDetails = await getUserApprovalDetails(params.id)

    if (!userDetails) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: userDetails,
    })
  } catch (error) {
    console.error("Error fetching user details:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
