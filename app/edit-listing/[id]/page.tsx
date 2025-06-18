"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, ArrowLeft, Save, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const categories = {
  barter: [
    "Food & Beverages",
    "Technology Services",
    "Professional Services",
    "Products & Merchandise",
    "Software & Licenses",
    "Health & Wellness",
    "Education & Training",
    "Other",
  ],
  media: [
    "Social Media (Instagram)",
    "Social Media (YouTube)",
    "Social Media (Facebook)",
    "Outdoor Advertising",
    "Print Media",
    "Radio",
    "Digital Display",
    "Other",
  ],
}

export default function EditListingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [listing, setListing] = useState<any>(null)
  const [listingType, setListingType] = useState<"barter" | "media">("barter")
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    city: "",
    state: "",
    value: "",
    seeking: "",
    followers: "",
    engagement: "",
    demographics: "",
    featured: false,
    verified: false,
  })

  useEffect(() => {
    fetchListing()
  }, [params.id])

  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listings/${params.id}`)
      const result = await response.json()

      if (result.success) {
        const data = result.data
        setListing(data)
        setListingType(data.type)
        setImages(data.images || [])
        setFormData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          city: data.location || "",
          state: data.state || "",
          value: data.value?.toString() || "",
          seeking: data.seeking || "",
          followers: data.followers?.toString() || "",
          engagement: data.engagement?.toString() || "",
          demographics: data.demographics || "",
          featured: data.featured || false,
          verified: data.verified || false,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to load listing",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load listing",
        variant: "destructive",
      })
      router.push("/dashboard")
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleUpdate = async () => {
    if (!formData.title || !formData.category || !formData.description || !formData.city || !formData.seeking) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/listings/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          type: listingType,
          category: formData.category,
          description: formData.description,
          location: formData.city,
          state: formData.state,
          value: formData.value ? Number.parseInt(formData.value) : 0,
          seeking: formData.seeking,
          images,
          followers: formData.followers ? Number.parseInt(formData.followers) : null,
          engagement: formData.engagement ? Number.parseFloat(formData.engagement) : null,
          demographics: formData.demographics,
          featured: formData.featured,
          verified: formData.verified,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Listing updated successfully",
        })
        router.push("/dashboard")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/listings/${params.id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Listing deleted successfully",
        })
        router.push("/dashboard")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Listing</h1>
            <p className="text-gray-600">Update your listing details</p>
          </div>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Listing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Listing Type */}
            <div>
              <Label className="text-base font-medium">Listing Type</Label>
              <RadioGroup
                value={listingType}
                onValueChange={(value) => setListingType(value as "barter" | "media")}
                className="mt-2"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="barter" id="barter" />
                  <Label htmlFor="barter" className="cursor-pointer flex-1">
                    <div className="font-medium">Barter Offer</div>
                    <div className="text-sm text-gray-500">I have products/services to trade for advertising</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="media" id="media" />
                  <Label htmlFor="media" className="cursor-pointer flex-1">
                    <div className="font-medium">Ad Inventory</div>
                    <div className="text-sm text-gray-500">I have advertising space/reach to offer</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Basic Information */}
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories[listingType].map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="mt-1 min-h-[120px]"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Value and Seeking */}
            <div>
              <Label htmlFor="value">Estimated Value (₹)</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="seeking">What are you seeking in return? *</Label>
              <Textarea
                id="seeking"
                value={formData.seeking}
                onChange={(e) => handleInputChange("seeking", e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Media-specific fields */}
            {listingType === "media" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="followers">Followers/Reach</Label>
                    <Input
                      id="followers"
                      value={formData.followers}
                      onChange={(e) => handleInputChange("followers", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="engagement">Engagement Rate (%)</Label>
                    <Input
                      id="engagement"
                      value={formData.engagement}
                      onChange={(e) => handleInputChange("engagement", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="demographics">Target Demographics</Label>
                  <Textarea
                    id="demographics"
                    value={formData.demographics}
                    onChange={(e) => handleInputChange("demographics", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {/* Images */}
            <div>
              <Label className="text-base font-medium">Images</Label>
              <div className="mt-2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload images</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB each</p>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange("featured", checked as boolean)}
                />
                <Label htmlFor="featured" className="text-sm">
                  Make this a featured listing (+₹999)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={formData.verified}
                  onCheckedChange={(checked) => handleInputChange("verified", checked as boolean)}
                />
                <Label htmlFor="verified" className="text-sm">
                  Request verification (+₹299)
                </Label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1" onClick={handleUpdate} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Updating..." : "Update Listing"}
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
