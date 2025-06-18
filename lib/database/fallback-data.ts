// Fallback data for demo mode
export const fallbackAdminUser = {
  id: "demo-admin-1",
  name: "Demo Admin",
  email: "admin@demo.com",
  role: "super_admin",
}

export const fallbackDashboardStats = {
  totalUsers: 1247,
  userGrowth: "+12%",
  pendingUsers: 23,
  totalListings: 892,
  listingGrowth: "+8%",
  pendingListings: 15,
  totalDeals: 456,
  dealGrowth: "+15%",
  totalRevenue: 1240000,
  revenueGrowth: "+22%",
  recentActivity: [
    {
      id: "activity-1",
      type: "user_registration",
      description: "New user registered: Rajesh Kumar",
      timestamp: new Date().toISOString(),
      admin: "System",
    },
    {
      id: "activity-2",
      type: "listing_created",
      description: "New listing: Digital Marketing Services",
      timestamp: new Date().toISOString(),
      admin: "System",
    },
    {
      id: "activity-3",
      type: "user_approved",
      description: "User approved: Priya Sharma",
      timestamp: new Date().toISOString(),
      admin: "Demo Admin",
    },
    {
      id: "activity-4",
      type: "listing_approved",
      description: "Listing approved: Web Development",
      timestamp: new Date().toISOString(),
      admin: "Demo Admin",
    },
    {
      id: "activity-5",
      type: "deal_completed",
      description: "Deal completed: ₹50,000 transaction",
      timestamp: new Date().toISOString(),
      admin: "System",
    },
  ],
}

export const fallbackPendingUsers = [
  {
    id: "demo-user-1",
    first_name: "Rajesh",
    last_name: "Kumar",
    email: "rajesh@example.com",
    company: "Kumar Enterprises",
    phone: "+91-9876543210",
    status: "pending",
    verification_status: "documents_uploaded",
    created_at: new Date().toISOString(),
    user_documents: [
      {
        id: "doc-1",
        document_type: "gst_certificate",
        status: "pending",
        file_name: "gst_certificate.pdf",
        uploaded_at: new Date().toISOString(),
      },
      {
        id: "doc-2",
        document_type: "pan_card",
        status: "approved",
        file_name: "pan_card.jpg",
        uploaded_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "demo-user-2",
    first_name: "Priya",
    last_name: "Sharma",
    email: "priya@example.com",
    company: "Sharma Digital Solutions",
    phone: "+91-9876543211",
    status: "pending",
    verification_status: "under_review",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    user_documents: [
      {
        id: "doc-3",
        document_type: "business_license",
        status: "pending",
        file_name: "business_license.pdf",
        uploaded_at: new Date().toISOString(),
      },
      {
        id: "doc-4",
        document_type: "aadhar_card",
        status: "approved",
        file_name: "aadhar_card.jpg",
        uploaded_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "demo-user-3",
    first_name: "Amit",
    last_name: "Patel",
    email: "amit@example.com",
    company: "Patel Trading Co.",
    phone: "+91-9876543212",
    status: "pending",
    verification_status: "documents_required",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    user_documents: [
      {
        id: "doc-5",
        document_type: "gst_certificate",
        status: "rejected",
        file_name: "gst_cert_old.pdf",
        uploaded_at: new Date().toISOString(),
        rejection_reason: "Document expired, please upload current certificate",
      },
    ],
  },
]

export const fallbackUserDetails = {
  id: "demo-user-1",
  first_name: "Rajesh",
  last_name: "Kumar",
  email: "rajesh@example.com",
  company: "Kumar Enterprises",
  phone: "+91-9876543210",
  status: "pending",
  verification_status: "documents_uploaded",
  created_at: new Date().toISOString(),
  user_documents: [
    {
      id: "doc-1",
      document_type: "gst_certificate",
      status: "pending",
      file_name: "gst_certificate.pdf",
      file_url: "/demo/gst_certificate.pdf",
      uploaded_at: new Date().toISOString(),
    },
    {
      id: "doc-2",
      document_type: "pan_card",
      status: "approved",
      file_name: "pan_card.jpg",
      file_url: "/demo/pan_card.jpg",
      uploaded_at: new Date().toISOString(),
      verified_at: new Date().toISOString(),
    },
  ],
  user_verification_checklist: [
    {
      verification_type: "identity",
      status: "completed",
      completed_at: new Date().toISOString(),
      notes: "PAN card verified successfully",
    },
    {
      verification_type: "business",
      status: "pending",
      notes: "GST certificate under review",
    },
  ],
}

export const fallbackPendingListings = [
  {
    id: "demo-listing-1",
    title: "Complete Digital Marketing Package",
    description:
      "SEO, Social Media Marketing, Content Creation, and PPC Management services for small to medium businesses.",
    category: "Digital Marketing",
    subcategory: "Full Service",
    status: "pending",
    owner_id: "demo-user-1",
    created_at: new Date().toISOString(),
    images: ["marketing_portfolio_1.jpg", "marketing_portfolio_2.jpg"],
    tags: ["SEO", "Social Media", "Content Marketing", "PPC"],
    estimated_value: 50000,
    users: {
      first_name: "Rajesh",
      last_name: "Kumar",
      company: "Kumar Enterprises",
    },
  },
  {
    id: "demo-listing-2",
    title: "Custom Web Development Services",
    description:
      "Full-stack web development using React, Node.js, and modern technologies. Includes responsive design and SEO optimization.",
    category: "Web Development",
    subcategory: "Full Stack",
    status: "pending",
    owner_id: "demo-user-2",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    images: ["web_portfolio_1.jpg", "web_portfolio_2.jpg"],
    tags: ["React", "Node.js", "Full Stack", "Responsive Design"],
    estimated_value: 75000,
    users: {
      first_name: "Priya",
      last_name: "Sharma",
      company: "Sharma Digital Solutions",
    },
  },
]

export const fallbackActiveDisputes = [
  {
    id: "dispute-1",
    title: "Payment not received for completed work",
    description: "Client has not released payment despite work completion and approval.",
    status: "open",
    priority: "high",
    complainant_id: "demo-user-1",
    respondent_id: "demo-user-2",
    deal_id: "deal-123",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    complainant: {
      first_name: "Rajesh",
      last_name: "Kumar",
    },
    respondent: {
      first_name: "Priya",
      last_name: "Sharma",
    },
    deals: {
      title: "Website Development Project",
    },
  },
]

export const fallbackAuditLogs = [
  {
    id: "audit-1",
    admin_id: "demo-admin-1",
    action: "approve_user",
    resource_type: "user",
    resource_id: "demo-user-1",
    details: {
      action: "approved",
      reason: "All documents verified successfully",
    },
    created_at: new Date().toISOString(),
    ip_address: "192.168.1.100",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    admin_users: {
      name: "Demo Admin",
      email: "admin@demo.com",
    },
  },
]

export const fallbackAdminData = {
  stats: {
    totalUsers: 1247,
    pendingUsers: 23,
    totalListings: 892,
    pendingListings: 15,
    totalDeals: 456,
    activeDisputes: 3,
  },
  recentActivities: fallbackDashboardStats.recentActivity,
}
