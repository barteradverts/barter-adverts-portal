import { PricingHeader } from "@/components/pricing/pricing-header"
import { PricingFAQ } from "@/components/pricing/pricing-faq"
import { PricingCTA } from "@/components/pricing/pricing-cta"
import { Pricing } from "@/components/pricing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing - Barter Adverts",
  description:
    "Choose the perfect plan for your advertising needs. Fixed monthly charges plus commission on successful deals.",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <PricingHeader />
      <Pricing />
      <PricingFAQ />
      <PricingCTA />
    </div>
  )
}
