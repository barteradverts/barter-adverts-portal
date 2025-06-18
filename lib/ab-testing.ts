"use client"

import type React from "react"

export interface ABTestConfig {
  testName: string
  variants: Array<{
    id: string
    name: string
    weight: number
    component: React.ComponentType<any>
  }>
  enabled: boolean
}

export class ABTestManager {
  private static instance: ABTestManager
  private tests: Map<string, ABTestConfig> = new Map()

  static getInstance(): ABTestManager {
    if (!ABTestManager.instance) {
      ABTestManager.instance = new ABTestManager()
    }
    return ABTestManager.instance
  }

  registerTest(config: ABTestConfig) {
    this.tests.set(config.testName, config)
  }

  getTest(testName: string): ABTestConfig | undefined {
    return this.tests.get(testName)
  }

  getUserVariant(testName: string): string | null {
    if (typeof window === "undefined") return null

    const storageKey = `ab-test-${testName}`
    return localStorage.getItem(storageKey)
  }

  assignUserToVariant(testName: string, variantId: string) {
    if (typeof window === "undefined") return

    const storageKey = `ab-test-${testName}`
    localStorage.setItem(storageKey, variantId)
  }

  trackConversion(testName: string, conversionType = "default") {
    const variant = this.getUserVariant(testName)
    if (!variant) return

    // Track conversion event
    if (typeof window !== "undefined" && "gtag" in window) {
      ;(window as any).gtag("event", "ab_test_conversion", {
        test_name: testName,
        variant: variant,
        conversion_type: conversionType,
      })
    }

    // Also track in our analytics
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "ab_test_conversion",
        properties: {
          test_name: testName,
          variant: variant,
          conversion_type: conversionType,
          timestamp: new Date().toISOString(),
        },
      }),
    }).catch(console.error)
  }
}

export const abTestManager = ABTestManager.getInstance()
