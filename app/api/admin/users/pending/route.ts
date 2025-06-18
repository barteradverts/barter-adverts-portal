import { type NextRequest, NextResponse } from "next/server"

// Completely self-contained pending users data
export async function GET(request: NextRequest) {
  try {
    // Hardcoded demo pending users
    const pendingUsers = [
      {
        id: "demo-user-1",
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        company: "Kumar Enterprises",
        phone: "+91 98765 43210",
        status: "pending",
        created_at: new Date().toISOString(),
        documents: [
          {
            type: "gst_certificate",
            status: "pending",
            filename: "gst_certificate.pdf",
          },
          {
            type: "pan_card",
            status: "approved",
            filename: "pan_card.jpg",
          },
        ],
      },
      {
        id: "demo-user-2",
        name: "Priya Sharma",
        email: "priya@example.com",
        company: "Sharma Digital Solutions",
        phone: "+91 87654 32109",
        status: "pending",
        created_at: new Date().toISOString(),
        documents: [
          {
            type: "business_license",
            status: "pending",
            filename: "business_license.pdf",
          },
          {
            type: "aadhar_card",
            status: "pending",
            filename: "aadhar_card.jpg",
          },
        ],
      },
      {
        id: "demo-user-3",
        name: "Amit Patel",
        email: "amit@example.com",
        company: "Patel Marketing Agency",
        phone: "+91 76543 21098",
        status: "pending",
        created_at: new Date().toISOString(),
        documents: [
          {
            type: "gst_certificate",
            status: "approved",
            filename: "gst_certificate.pdf",
          },
          {
            type: "pan_card",
            status: "pending",
            filename: "pan_card.jpg",
          },
        ],
      },
    ]

    return NextResponse.json(pendingUsers)
  } catch (error) {
    console.error("Pending users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
