"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Search, Paperclip, Phone, Video, MoreVertical } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Metro Advertising",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "That sounds perfect! When can we finalize the deal?",
    time: "2 min ago",
    unread: 2,
    online: true,
    type: "business",
  },
  {
    id: 2,
    name: "FoodieExplorer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'd love to feature your restaurant in my next post",
    time: "1 hour ago",
    unread: 0,
    online: false,
    type: "influencer",
  },
  {
    id: 3,
    name: "TechStart Solutions",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the website! It looks amazing.",
    time: "2 days ago",
    unread: 0,
    online: true,
    type: "business",
  },
]

const currentMessages = [
  {
    id: 1,
    sender: "Metro Advertising",
    message:
      "Hi! I saw your coffee subscription offer. We have a premium billboard on MG Road that gets great visibility.",
    time: "10:30 AM",
    isMe: false,
    type: "text",
  },
  {
    id: 2,
    sender: "You",
    message: "That sounds interesting! Can you share more details about the location and duration?",
    time: "10:35 AM",
    isMe: true,
    type: "text",
  },
  {
    id: 3,
    sender: "Metro Advertising",
    message:
      "It's right at the MG Road metro station junction. We can offer 2 weeks of display time. The usual rate is ₹15,000 which matches your coffee subscription value perfectly.",
    time: "10:40 AM",
    isMe: false,
    type: "text",
  },
  {
    id: 4,
    sender: "You",
    message:
      "Perfect! That's exactly what I was looking for. The coffee subscription includes premium beans delivered monthly for 6 months.",
    time: "10:45 AM",
    isMe: true,
    type: "text",
  },
  {
    id: 5,
    sender: "Metro Advertising",
    message: "That sounds perfect! When can we finalize the deal?",
    time: "10:50 AM",
    isMe: false,
    type: "text",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(currentMessages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with potential barter partners</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Conversations</span>
                <Badge variant="secondary">{conversations.filter((c) => c.unread > 0).length}</Badge>
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                      selectedConversation === conversation.id ? "bg-blue-50 border-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{conversation.name}</p>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">
                            {conversation.type}
                          </Badge>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Metro Advertising</p>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                      {!message.isMe && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">MA</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.isMe
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-900 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.isMe ? "text-blue-100" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
