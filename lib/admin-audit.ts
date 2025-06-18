// Simple audit logger with no external dependencies
type AuditAction =
  | "login"
  | "logout"
  | "view_user"
  | "edit_user"
  | "delete_user"
  | "approve_listing"
  | "reject_listing"
  | "resolve_dispute"
  | "system_setting_change"

interface AuditLogEntry {
  timestamp: Date
  adminId: string
  adminName: string
  action: AuditAction
  details: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

// Simple in-memory logger for demo purposes
class AdminAuditLogger {
  private static instance: AdminAuditLogger
  private logs: AuditLogEntry[] = []

  private constructor() {
    // Initialize with some demo logs
    this.logs = [
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
    ]
  }

  public static getInstance(): AdminAuditLogger {
    if (!AdminAuditLogger.instance) {
      AdminAuditLogger.instance = new AdminAuditLogger()
    }
    return AdminAuditLogger.instance
  }

  public log(
    adminId: string,
    adminName: string,
    action: AuditAction,
    details: Record<string, any>,
    ipAddress?: string,
    userAgent?: string,
  ): void {
    const entry: AuditLogEntry = {
      timestamp: new Date(),
      adminId,
      adminName,
      action,
      details,
      ipAddress,
      userAgent,
    }

    this.logs.push(entry)
    console.log(`ADMIN AUDIT: ${adminName} (${adminId}) - ${action}`, details)
  }

  public getLogs(): AuditLogEntry[] {
    return [...this.logs]
  }
}

export const adminAudit = AdminAuditLogger.getInstance()

export function logAdminAction(
  adminId: string,
  adminName: string,
  action: AuditAction,
  details: Record<string, any>,
): void {
  const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : undefined
  adminAudit.log(adminId, adminName, action, details, "client-ip", userAgent)
}
