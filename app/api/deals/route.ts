import { type NextRequest, NextResponse } from "next/server"

const mockDeals = [
  {
    id: "1",
    title: "Coffee Subscription for Billboard Space",
    advertiserId: "user_1",
    mediaOwnerId: "user_2",
    status: "in-progress",
    value: 15000,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    advertiserOffer: {
      title: "Premium Coffee Subscription (6 months)",
      description: "Monthly delivery of premium coffee beans",
      value: 15000,
    },
    mediaOwnerOffer: {
      title: "Billboard - Prime Location MG Road",
      description: "2 weeks display time at high-traffic junction",
      value: 15000,
    },
    milestones: [
      { id: 1, title: "Deal Agreement", status: "completed", date: "2024-01-15" },
      { id: 2, title: "Content Approval", status: "completed", date: "2024-01-18" },
      { id: 3, title: "Billboard Installation", status: "in-progress", date: "2024-01-22" },
      { id: 4, title: "First Coffee Delivery", status: "pending", date: "2024-01-25" },
    ],
    createdAt: "2024-01-15T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    let filteredDeals = [...mockDeals]

    if (userId) {
      filteredDeals = filteredDeals.filter((deal) => deal.advertiserId === userId || deal.mediaOwnerId === userId)
    }

    if (status) {
      filteredDeals = filteredDeals.filter((deal) => deal.status === status)
    }

    return NextResponse.json({
      success: true,
      data: filteredDeals,
    })
  } catch (error) {
    console.error("Deals fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, advertiserId, mediaOwnerId, advertiserOffer, mediaOwnerOffer, value, duration } = body

    if (!title || !advertiserId || !mediaOwnerId || !advertiserOffer || !mediaOwnerOffer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newDeal = {
      id: Date.now().toString(),
      title,
      advertiserId,
      mediaOwnerId,
      status: "pending",
      value: value || 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      advertiserOffer,
      mediaOwnerOffer,
      milestones: [{ id: 1, title: "Deal Agreement", status: "pending", date: new Date().toISOString().split("T")[0] }],
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Deal created successfully",
      data: newDeal,
    })
  } catch (error) {
    console.error("Deal creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
