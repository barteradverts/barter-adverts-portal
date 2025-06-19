import connectDB from '@/app/lib/db'
import { User } from '@/app/models/User'

// Get pending users for approval
export async function getPendingUsersForApproval(limit = 20, offset = 0) {
  try {
    await connectDB()

    const users = await User.find({
      $or: [
        { isEmailVerified: false },
        { isPhoneVerified: false }
      ]
    })
      .select('-password -pin -otp -otpExpiresAt -emailVerificationToken -emailVerificationExpiresAt')
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 })

    const total = await User.countDocuments({
      $or: [
        { isEmailVerified: false },
        { isPhoneVerified: false }
      ]
    })

    return {
      users: users.map(user => ({
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        company: user.company || 'N/A',
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        createdAt: user.createdAt,
        approvalStatus: !user.isEmailVerified && !user.isPhoneVerified ? 'pending' : 'partial',
        verificationScore: ((user.isEmailVerified ? 50 : 0) + (user.isPhoneVerified ? 50 : 0)),
        riskLevel: 'low',
        documents: []
      })),
      total,
      hasMore: total > offset + limit,
    }
  } catch (error) {
    console.error("Get pending users error:", error)
    return {
      users: [],
      total: 0,
      hasMore: false,
    }
  }
}

// Get user details for approval
export async function getUserApprovalDetails(userId: string) {
  try {
    await connectDB()

    const user = await User.findById(userId).select('-password -pin -otp -otpExpiresAt -emailVerificationToken -emailVerificationExpiresAt')

    if (!user) {
      return null
    }

    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber,
      company: user.company || 'N/A',
      userType: user.userType,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      createdAt: user.createdAt,
      approvalStatus: !user.isEmailVerified && !user.isPhoneVerified ? 'pending' : 'partial',
      verificationScore: ((user.isEmailVerified ? 50 : 0) + (user.isPhoneVerified ? 50 : 0)),
      riskLevel: 'low',
      documents: []
    }
  } catch (error) {
    console.error("Get user details error:", error)
    return null
  }
}

// Get user details for approval (alias for compatibility)
export async function getUserDetailsForApproval(userId: string) {
  return getUserApprovalDetails(userId)
}

// Bulk approve users
export async function bulkApproveUsers(userIds: string[], adminId: string, batchName?: string) {
  try {
    await connectDB()

    let approved = 0
    let failed = 0

    for (const userId of userIds) {
      try {
        const user = await User.findById(userId)
        if (user) {
          user.isEmailVerified = true
          user.isPhoneVerified = true
          await user.save()
          approved++
        } else {
          failed++
        }
      } catch (error) {
        console.error(`Error approving user ${userId}:`, error)
        failed++
      }
    }

    return {
      success: true,
      approved,
      failed,
      message: `Successfully approved ${approved} users, ${failed} failed`,
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

// Update document status - placeholder for future document model
export async function updateDocumentStatus(
  documentId: string,
  status: "approved" | "rejected",
  adminId: string,
  rejectionReason?: string,
) {
  try {
    // TODO: Implement when document model is available
    console.log("Document status update", { documentId, status, adminId })
    return {
      success: true,
      message: `Document ${status} successfully`,
    }
  } catch (error) {
    console.error("Update document status error:", error)
    return {
      success: false,
      message: "Internal server error",
    }
  }
}
