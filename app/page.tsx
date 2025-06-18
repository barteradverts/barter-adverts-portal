import { Hero } from "@/components/hero"
import { ValueProps } from "@/components/value-props"
import { AllMedia } from "@/components/all-media"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueProps />
      <AllMedia />
      <HowItWorks />
      <Pricing />
      <CTA />
    </main>
  )
}
