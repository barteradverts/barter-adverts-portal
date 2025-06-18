import { type NextRequest, NextResponse } from "next/server"

// Mock database - same as in route.ts
const mockListings = [
  {
    id: "1",
    title: "Instagram Food Account - 45K Followers",
    type: "media",
    category: "social-media-instagram",
    location: "Mumbai",
    state: "Maharashtra",
    owner: "FoodieExplorer",
    ownerId: "user1",
    rating: 4.8,
    description:
      "Authentic food content creator with engaged Mumbai audience. Perfect for restaurants and food brands.",
    seeking: "Restaurant vouchers, Food products, Kitchen equipment",
    value: 25000,
    verified: true,
    featured: false,
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    images: ["/placeholder.svg?height=200&width=300"],
    views: 156,
    inquiries: 12,
    followers: 45000,
    engagement: 3.5,
    demographics: "Food lovers, 18-35, Mumbai metro area",
  },
  {
    id: "2",
    title: "Premium Coffee Subscription (6 months)",
    type: "barter",
    category: "food-beverages",
    location: "Bangalore",
    state: "Karnataka",
    owner: "BrewMaster Cafe",
    ownerId: "user2",
    rating: 4.9,
    description: "Offering 6-month premium coffee subscription (₹15,000 value) for quality advertising exposure.",
    seeking: "Billboard space, Influencer posts, Radio mentions",
    value: 15000,
    verified: true,
    featured: true,
    status: "active",
    createdAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-14T15:30:00Z",
    images: ["/placeholder.svg?height=200&width=300"],
    views: 89,
    inquiries: 8,
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const listing = mockListings.find((l) => l.id === params.id)

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Increment view count
    listing.views = (listing.views || 0) + 1

    return NextResponse.json({
      success: true,
      data: listing,
    })
  } catch (error) {
    console.error("Listing fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const listingIndex = mockListings.findIndex((l) => l.id === params.id)

    if (listingIndex === -1) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // In a real app, verify user owns this listing
    const currentListing = mockListings[listingIndex]

    // Update listing
    const updatedListing = {
      ...currentListing,
      ...body,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    mockListings[listingIndex] = updatedListing

    return NextResponse.json({
      success: true,
      message: "Listing updated successfully",
      data: updatedListing,
    })
  } catch (error) {
    console.error("Listing update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const listingIndex = mockListings.findIndex((l) => l.id === params.id)

    if (listingIndex === -1) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // In a real app, verify user owns this listing

    // Remove listing
    const deletedListing = mockListings.splice(listingIndex, 1)[0]

    return NextResponse.json({
      success: true,
      message: "Listing deleted successfully",
      data: deletedListing,
    })
  } catch (error) {
    console.error("Listing deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
