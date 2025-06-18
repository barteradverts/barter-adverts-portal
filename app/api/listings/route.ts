import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const location = searchParams.get("location")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const userId = searchParams.get("userId") // For user's own listings
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredListings = [...mockListings]

    // Filter by user (for dashboard)
    if (userId) {
      filteredListings = filteredListings.filter((listing) => listing.ownerId === userId)
    }

    // Apply other filters
    if (type && type !== "all") {
      filteredListings = filteredListings.filter((listing) => listing.type === type)
    }

    if (location) {
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.location.toLowerCase().includes(location.toLowerCase()) ||
          listing.state.toLowerCase().includes(location.toLowerCase()),
      )
    }

    if (category) {
      filteredListings = filteredListings.filter((listing) => listing.category === category)
    }

    if (search) {
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(search.toLowerCase()) ||
          listing.description.toLowerCase().includes(search.toLowerCase()) ||
          listing.seeking.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Sort by featured first, then by creation date
    filteredListings.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedListings = filteredListings.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedListings,
      pagination: {
        page,
        limit,
        total: filteredListings.length,
        totalPages: Math.ceil(filteredListings.length / limit),
      },
    })
  } catch (error) {
    console.error("Listings fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      type,
      category,
      description,
      location,
      state,
      value,
      seeking,
      images,
      followers,
      engagement,
      demographics,
      featured,
      verified,
    } = body

    // Validate required fields
    if (!title || !type || !category || !description || !location || !seeking) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would get userId from authentication token
    const userId = "current-user-id"
    const userName = "Current User"

    const newListing = {
      id: Date.now().toString(),
      title,
      type,
      category,
      description,
      location,
      state: state || "",
      value: value || 0,
      seeking,
      images: images || [],
      followers: followers || null,
      engagement: engagement || null,
      demographics: demographics || "",
      owner: userName,
      ownerId: userId,
      rating: 0,
      verified: verified || false,
      featured: featured || false,
      status: "active",
      views: 0,
      inquiries: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to mock database
    mockListings.push(newListing)

    return NextResponse.json({
      success: true,
      message: "Listing created successfully",
      data: newListing,
    })
  } catch (error) {
    console.error("Listing creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
