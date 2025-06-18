"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateListingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "barter", // barter or ad-space
    location: "",
    value: "",
    duration: "",
    tags: [],
    images: [],
  })
  const [loading, setLoading] = useState(false)

  const categories = [
    "Billboard Advertising",
    "Social Media Marketing",
    "Print Media",
    "Radio Advertising",
    "Digital Marketing",
    "Event Sponsorship",
    "Product Placement",
    "Influencer Marketing",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success and redirect
      alert("Listing created successfully!")
      router.push("/dashboard")
    } catch (error) {
      alert("Error creating listing. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
          <p className="text-gray-600 mt-2">Share your advertising opportunity or barter offer</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Listing Title *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Premium Billboard Space on MG Road"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your offering in detail..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.type}
                        onChange={(e) => handleInputChange("type", e.target.value)}
                      >
                        <option value="barter">Barter Offer</option>
                        <option value="ad-space">Ad Space Available</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Bangalore, Karnataka"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Value</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., ₹50,000"
                        value={formData.value}
                        onChange={(e) => handleInputChange("value", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                    <Button type="button" variant="outline" className="mt-4">
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">{formData.title || "Your listing title will appear here"}</h3>
                    <div className="flex space-x-2">
                      {formData.category && <Badge variant="outline">{formData.category}</Badge>}
                      {formData.type && (
                        <Badge className={formData.type === "barter" ? "bg-blue-500" : "bg-green-500"}>
                          {formData.type === "barter" ? "Barter Offer" : "Ad Space"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {formData.description || "Your description will appear here..."}
                    </p>
                    {formData.location && <p className="text-sm text-gray-500">📍 {formData.location}</p>}
                    {formData.value && <p className="text-sm font-semibold text-green-600">💰 {formData.value}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Publish Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating..." : "Publish Listing"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" disabled={loading}>
                    Save as Draft
                  </Button>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Your listing will be reviewed within 24 hours</p>
                    <p>• You can edit or delete it anytime</p>
                    <p>• Premium features available after verification</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
