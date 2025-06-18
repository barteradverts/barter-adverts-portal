// This utility helps identify broken links in the application

export interface LinkStatus {
  url: string
  exists: boolean
  internal: boolean
  reachable?: boolean
  statusCode?: number
}

// Function to check if a link is valid
export async function checkLink(url: string): Promise<LinkStatus> {
  // Determine if the link is internal or external
  const isInternal = url.startsWith("/") || url.startsWith("#") || url.includes("barteradverts.com")

  // For internal links, check if the route exists in our app
  if (isInternal) {
    // In a real app, we would check against our router configuration
    // For now, we'll assume all internal links that follow our pattern are valid
    const validInternalPaths = [
      "/",
      "/browse",
      "/register",
      "/login",
      "/dashboard",
      "/messages",
      "/deals",
      "/search",
      "/profile",
      "/create-listing",
      "/how-it-works",
      "/pricing",
      "/about",
      "/contact",
      "/help",
      "/terms",
      "/privacy",
      "/blog",
      "/success-stories",
      "/admin",
      "/admin/login",
      "/admin/audit-logs",
    ]

    // Check if the path exists in our valid paths
    const exists = validInternalPaths.some((path) => {
      if (url === path) return true
      if (url.startsWith(path + "/")) return true
      return false
    })

    return {
      url,
      exists,
      internal: true,
    }
  }

  // For external links, we would check if they're reachable
  // In a real app, we would make a HEAD request to check
  // For now, we'll assume all external links are valid
  return {
    url,
    exists: true,
    internal: false,
    reachable: true,
  }
}

// Function to fix common link issues
export function fixBrokenLink(url: string): string {
  // Fix common issues with links
  if (url === "/list-inventory") return "/create-listing"
  if (url === "/offer-barter") return "/create-listing"
  if (url.includes("forgot-password")) return "/login"

  return url
}
