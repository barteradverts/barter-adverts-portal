"use client"

import { useState } from "react"
import { UserTypeSelection } from "./user-type-selection"

export function OnboardingController() {
  const [currentStep, setCurrentStep] = useState("user-type-selection")
  const [userData, setUserData] = useState({})

  const handleUserTypeSelect = (userType: string) => {
    setUserData({ ...userData, userType })
    // Navigate to specific onboarding flow based on user type
    console.log("Selected user type:", userType)
  }

  const handleStepComplete = (data: Record<string, any>) => {
    setUserData({ ...userData, ...data })
    // Move to next step
  }

  const handleComplete = (data: Record<string, any>) => {
    const finalData = { ...userData, ...data }
    console.log("Onboarding complete:", finalData)
    // Handle registration completion
  }

  if (currentStep === "user-type-selection") {
    return <UserTypeSelection onSelect={handleUserTypeSelect} />
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h2>
        <p className="text-gray-600">We'll customize your experience based on your needs</p>
      </div>
    </div>
  )
}
