"use client"

// Google Analytics integration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom analytics for platform events
export const trackUserAction = (action: string, properties?: Record<string, any>) => {
  // Track user actions like listing creation, deal completion, etc.
  event({
    action,
    category: "User Action",
    label: JSON.stringify(properties),
  })

  // Also send to your own analytics service
  if (typeof window !== "undefined") {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        properties,
        timestamp: new Date().toISOString(),
        userId: localStorage.getItem("user_id"),
      }),
    }).catch(console.error)
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
