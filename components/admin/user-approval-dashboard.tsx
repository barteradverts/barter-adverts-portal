"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, FileText, CheckCircle, XCircle, Clock, Eye, Download, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { UserApprovalData } from "@/lib/database/user-approval-queries"

export function UserApprovalDashboard() {
  const [users, setUsers] = useState<UserApprovalData[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserApprovalData | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [bulkAction, setBulkAction] = useState("")

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  const fetchPendingUsers = async () => {
    try {
      const response = await fetch("/api/admin/users/pending")
      const result = await response.json()

      if (result.success) {
        setUsers(result.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load pending users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApproveUser = async (userId: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: "current-admin-id", notes }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "User approved successfully",
        })
        fetchPendingUsers()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve user",
        variant: "destructive",
      })
    }
  }

  const handleRejectUser = async (userId: string, reason: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: "current-admin-id", reason }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "User rejected successfully",
        })
        fetchPendingUsers()
        setRejectionReason("")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject user",
        variant: "destructive",
      })
    }
  }

  const handleBulkApproval = async () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select users to approve",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/admin/users/bulk-approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: selectedUsers,
          adminId: "current-admin-id",
          batchName: `Bulk approval ${new Date().toLocaleDateString()}`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        fetchPendingUsers()
        setSelectedUsers([])
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform bulk approval",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "under_review":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filter === "all" || user.approvalStatus === filter

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Approval System</h2>
          <p className="text-gray-600">Review and approve user registrations</p>
        </div>
        <div className="flex gap-2">
          {selectedUsers.length > 0 && (
            <Button onClick={handleBulkApproval} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Bulk Approve ({selectedUsers.length})
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedUsers([...selectedUsers, user.id])
                      } else {
                        setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                      }
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {user.firstName} {user.lastName}
                      </h3>
                      <Badge className={getStatusColor(user.approvalStatus)}>
                        {user.approvalStatus.replace("_", " ")}
                      </Badge>
                      <Badge variant="outline" className={getRiskLevelColor(user.riskLevel)}>
                        {user.riskLevel} risk
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        {user.verificationScore}% verified
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Email:</span> {user.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {user.phone}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {user.userType}
                      </div>
                      <div>
                        <span className="font-medium">Company:</span> {user.company || "N/A"}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1 text-blue-500" />
                        {user.documents.length} documents
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-500" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          User Review: {user.firstName} {user.lastName}
                        </DialogTitle>
                        <DialogDescription>Complete user verification and approval process</DialogDescription>
                      </DialogHeader>
                      {selectedUser && <UserReviewModal user={selectedUser} />}
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    onClick={() => handleApproveUser(user.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject User Application</DialogTitle>
                        <DialogDescription>
                          Please provide a reason for rejecting this user's application.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Enter rejection reason..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => handleRejectUser(user.id, rejectionReason)}
                          disabled={!rejectionReason.trim()}
                        >
                          Reject User
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Found</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== "all"
                ? "No users match your current filters."
                : "All users have been processed."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// User Review Modal Component
function UserReviewModal({ user }: { user: UserApprovalData }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {user.phone}
                </div>
                <div>
                  <span className="font-medium">User Type:</span> {user.userType}
                </div>
                <div>
                  <span className="font-medium">Company:</span> {user.company || "N/A"}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Verification Status</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Score:</span> {user.verificationScore}%
                </div>
                <div>
                  <span className="font-medium">Risk Level:</span>
                  <Badge variant="outline" className={`ml-2 ${getRiskLevelColor(user.riskLevel)}`}>
                    {user.riskLevel}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge className={`ml-2 ${getStatusColor(user.approvalStatus)}`}>{user.approvalStatus}</Badge>
                </div>
                <div>
                  <span className="font-medium">Registered:</span> {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {user.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h5 className="font-medium">{doc.documentType.replace("_", " ").toUpperCase()}</h5>
                  <p className="text-sm text-gray-600">{doc.fileName}</p>
                  <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(user.checklist).map(([key, value]) => {
              if (key === "verificationScore") return null
              return (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox checked={value as boolean} disabled />
                  <label className="text-sm font-medium">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </label>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <div className="space-y-3">
            {user.workflowSteps.map((step) => (
              <div key={step.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {step.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : step.status === "in_progress" ? (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">{step.stepName.replace("_", " ").toUpperCase()}</h5>
                  <p className="text-sm text-gray-600">Step {step.stepOrder}</p>
                  {step.notes && <p className="text-sm text-gray-500 mt-1">{step.notes}</p>}
                </div>
                <Badge variant="outline">{step.status}</Badge>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-500"
    case "rejected":
      return "bg-red-500"
    case "under_review":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

function getRiskLevelColor(level: string) {
  switch (level) {
    case "low":
      return "text-green-600"
    case "medium":
      return "text-yellow-600"
    case "high":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}
