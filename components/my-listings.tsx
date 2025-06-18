"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2, Plus, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

interface Listing {
  id: string
  title: string
  type: "barter" | "media"
  category: string
  status: "active" | "draft" | "paused"
  views: number
  inquiries: number
  createdAt: string
  featured: boolean
  verified: boolean
  images: string[]
}

export function MyListings() {
  const router = useRouter()
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMyListings()
  }, [])

  const fetchMyListings = async () => {
    try {
      // In a real app, get userId from auth context
      const response = await fetch("/api/listings?userId=current-user-id")
      const result = await response.json()

      if (result.success) {
        setListings(result.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your listings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) {
      return
    }

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        setListings(listings.filter((l) => l.id !== id))
        toast({
          title: "Success",
          description: "Listing deleted successfully",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "draft":
        return "bg-gray-500"
      case "paused":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Listings</CardTitle>
        <Button onClick={() => router.push("/create-listing")}>
          <Plus className="w-4 h-4 mr-2" />
          Create Listing
        </Button>
      </CardHeader>
      <CardContent>
        {listings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't created any listings yet</p>
            <Button onClick={() => router.push("/create-listing")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Listing
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <img
                  src={listing.images[0] || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{listing.title}</h3>
                    <Badge className={getStatusColor(listing.status)}>{listing.status}</Badge>
                    {listing.featured && <Badge variant="outline">Featured</Badge>}
                    {listing.verified && <Badge variant="outline">Verified</Badge>}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {listing.views} views
                    </span>
                    <span>{listing.inquiries} inquiries</span>
                    <span>Created {new Date(listing.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/edit-listing/${listing.id}`)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/listings/${listing.id}`)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(listing.id)} className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
