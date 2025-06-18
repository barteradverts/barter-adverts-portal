import { type NextRequest, NextResponse } from "next/server"

const mockMessages = [
  {
    id: "1",
    conversationId: "conv_1",
    senderId: "user_1",
    receiverId: "user_2",
    message: "Hi! I'm interested in your billboard space on MG Road.",
    timestamp: "2024-01-20T10:00:00Z",
    read: false,
  },
  {
    id: "2",
    conversationId: "conv_1",
    senderId: "user_2",
    receiverId: "user_1",
    message: "Great! I'd love to discuss this further. What are you offering in exchange?",
    timestamp: "2024-01-20T10:05:00Z",
    read: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")
    const userId = searchParams.get("userId")

    if (conversationId) {
      // Get messages for specific conversation
      const messages = mockMessages.filter((msg) => msg.conversationId === conversationId)
      return NextResponse.json({ success: true, data: messages })
    }

    if (userId) {
      // Get all conversations for user
      const userMessages = mockMessages.filter((msg) => msg.senderId === userId || msg.receiverId === userId)
      return NextResponse.json({ success: true, data: userMessages })
    }

    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  } catch (error) {
    console.error("Messages fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversationId, receiverId, message } = body

    if (!conversationId || !receiverId || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newMessage = {
      id: Date.now().toString(),
      conversationId,
      senderId: "current_user", // Would get from auth token
      receiverId,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send real-time notification via WebSocket
    // 3. Send email notification if user is offline

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    })
  } catch (error) {
    console.error("Message send error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
