import { fallbackPendingUsers, fallbackUserDetails } from "./fallback-data"

// Get pending users for approval - demo mode only
export async function getPendingUsersForApproval(limit = 20, offset = 0) {
  try {
    // Always return demo data
    return {
      users: fallbackPendingUsers,
      total: fallbackPendingUsers.length,
      hasMore: false,
    }
  } catch (error) {
    console.error("Get pending users error:", error)
    return {
      users: fallbackPendingUsers,
      total: fallbackPendingUsers.length,
      hasMore: false,
    }
  }
}

// Get user details for approval - demo mode only
export async function getUserApprovalDetails(userId: string) {
  try {
    // Return demo user details
    return fallbackUserDetails
  } catch (error) {
    console.error("Get user details error:", error)
    return fallbackUserDetails
  }
}

// Get user details for approval (alias for compatibility)
export async function getUserDetailsForApproval(userId: string) {
  return getUserApprovalDetails(userId)
}

// Bulk approve users - demo mode only
export async function bulkApproveUsers(userIds: string[], adminId: string) {
  try {
    console.log("Demo mode: Bulk approved users", { userIds, adminId })
    return {
      success: true,
      approved: userIds.length,
      failed: 0,
      message: `Successfully approved ${userIds.length} users (demo mode)`,
    }
  } catch (error) {
    console.error("Bulk approve users error:", error)
    return {
      success: false,
      approved: 0,
      failed: userIds.length,
      message: "Internal server error",
    }
  }
}

// Update document status - demo mode only
export async function updateDocumentStatus(
  documentId: string,
  status: "approved" | "rejected",
  adminId: string,
  rejectionReason?: string,
) {
  try {
    console.log("Demo mode: Document status updated", { documentId, status, adminId })
    return {
      success: true,
      message: `Document ${status} successfully (demo mode)`,
    }
  } catch (error) {
    console.error("Update document status error:", error)
    return {
      success: false,
      message: "Internal server error",
    }
  }
}
