"use client"

import { useState, useEffect } from "react"
import { abTestManager } from "@/lib/ab-testing"
import { useAnalytics } from "./use-analytics"

export function useABTest(testName: string) {
  const [variant, setVariant] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    const test = abTestManager.getTest(testName)
    if (!test || !test.enabled) {
      setIsLoading(false)
      return
    }

    let userVariant = abTestManager.getUserVariant(testName)

    if (!userVariant) {
      // Assign user to variant based on weights
      const random = Math.random()
      let cumulativeWeight = 0

      for (const variant of test.variants) {
        cumulativeWeight += variant.weight
        if (random <= cumulativeWeight) {
          userVariant = variant.id
          break
        }
      }

      if (userVariant) {
        abTestManager.assignUserToVariant(testName, userVariant)
        trackEvent("ab_test_assigned", {
          test_name: testName,
          variant: userVariant,
        })
      }
    }

    if (userVariant) {
      setVariant(userVariant)
      trackEvent("ab_test_exposed", {
        test_name: testName,
        variant: userVariant,
      })
    }

    setIsLoading(false)
  }, [testName, trackEvent])

  const trackConversion = (conversionType = "default") => {
    abTestManager.trackConversion(testName, conversionType)
  }

  return {
    variant,
    isLoading,
    trackConversion,
  }
}
