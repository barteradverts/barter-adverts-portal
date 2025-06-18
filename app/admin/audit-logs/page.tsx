"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Search, Filter } from "lucide-react"
import Link from "next/link"

// Demo audit logs data - completely self-contained
const DEMO_AUDIT_LOGS = [
  {
    timestamp: new Date("2024-01-15T10:30:00"),
    adminId: "admin-001",
    adminName: "Admin User",
    action: "login",
    details: { ip: "192.168.1.1", userAgent: "Chrome/120.0.0.0" },
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    timestamp: new Date("2024-01-15T10:35:00"),
    adminId: "admin-001",
    adminName: "Admin User",
    action: "approve_listing",
    details: { listingId: "listing-123", title: "Digital Marketing Services" },
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    timestamp: new Date("2024-01-15T10:40:00"),
    adminId: "admin-001",
    adminName: "Admin User",
    action: "edit_user",
    details: { userId: "user-456", changes: ["status: approved"] },
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    timestamp: new Date("2024-01-15T11:00:00"),
    adminId: "admin-001",
    adminName: "Admin User",
    action: "resolve_dispute",
    details: { disputeId: "dispute-789", resolution: "favor_complainant" },
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
]

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [filteredLogs, setFilteredLogs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  useEffect(() => {
    // Use demo data
    setLogs(DEMO_AUDIT_LOGS)
    setFilteredLogs(DEMO_AUDIT_LOGS)
  }, [])

  useEffect(() => {
    let filtered = logs

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          JSON.stringify(log.details).toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply action filter
    if (actionFilter !== "all") {
      filtered = filtered.filter((log) => log.action === actionFilter)
    }

    setFilteredLogs(filtered)
  }, [searchTerm, actionFilter, logs])

  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `admin-audit-logs-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case "login":
        return "default"
      case "logout":
        return "outline"
      case "view_user":
        return "secondary"
      case "edit_user":
        return "default"
      case "delete_user":
        return "destructive"
      case "approve_listing":
        return "default"
      case "reject_listing":
        return "destructive"
      case "resolve_dispute":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex items-center">
          <Button variant="outline" asChild className="mr-4">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Audit Logs</h1>
            <p className="text-gray-600">Track and monitor all administrative actions</p>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Audit Trail</CardTitle>
            <Button variant="outline" onClick={exportLogs}>
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger>
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="logout">Logout</SelectItem>
                    <SelectItem value="view_user">View User</SelectItem>
                    <SelectItem value="edit_user">Edit User</SelectItem>
                    <SelectItem value="delete_user">Delete User</SelectItem>
                    <SelectItem value="approve_listing">Approve Listing</SelectItem>
                    <SelectItem value="reject_listing">Reject Listing</SelectItem>
                    <SelectItem value="resolve_dispute">Resolve Dispute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No audit logs found matching your criteria</div>
              ) : (
                filteredLogs.map((log, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <div className="flex items-center gap-2 mb-2 md:mb-0">
                        <Badge variant={getActionBadgeVariant(log.action)}>{log.action.replace(/_/g, " ")}</Badge>
                        <span className="text-sm font-medium">{log.adminName}</span>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="mt-2 bg-gray-50 p-2 rounded text-xs font-mono overflow-x-auto">
                      {JSON.stringify(log.details, null, 2)}
                    </div>
                    {log.ipAddress && (
                      <div className="mt-2 text-xs text-gray-500">
                        IP: {log.ipAddress} • User Agent: {log.userAgent?.substring(0, 50)}...
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
