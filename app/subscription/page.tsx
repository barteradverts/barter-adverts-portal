"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Shield, Building } from "lucide-react"

const mediaPlans = [
  {
    id: "media-starter",
    name: "Starter",
    price: 0,
    description: "Perfect for individuals getting started",
    icon: Zap,
    features: [
      "3 active listings",
      "Basic search visibility",
      "Email support",
      "Basic analytics",
      "Standard messaging",
    ],
    popular: false,
  },
  {
    id: "media-professional",
    name: "Professional",
    price: 2999,
    description: "For growing media owners",
    icon: Crown,
    features: [
      "Unlimited listings",
      "Priority search results",
      "AI-powered matching",
      "Advanced analytics",
      "Priority support",
      "Verified badge",
    ],
    popular: true,
  },
  {
    id: "media-premium",
    name: "Premium",
    price: 4999,
    description: "For established media businesses",
    icon: Shield,
    features: [
      "Everything in Professional",
      "Featured placement",
      "Dedicated account manager",
      "Custom branding",
      "API access",
      "White-label options",
    ],
    popular: false,
  },
  {
    id: "media-enterprise",
    name: "Enterprise",
    price: 9999,
    description: "For large media networks",
    icon: Building,
    features: [
      "Everything in Premium",
      "Custom integrations",
      "Bulk operations",
      "Advanced reporting",
      "SLA guarantee",
      "Custom contracts",
    ],
    popular: false,
  },
]

const advertiserPlans = [
  {
    id: "advertiser-explorer",
    name: "Explorer",
    price: 0,
    description: "Explore barter opportunities",
    icon: Zap,
    features: ["Browse all listings", "Basic messaging", "5 inquiries/month", "Email support", "Basic deal tracking"],
    popular: false,
  },
  {
    id: "advertiser-tradepass",
    name: "TradePass",
    price: 1999,
    description: "For active advertisers",
    icon: Crown,
    features: [
      "Unlimited inquiries",
      "Priority matching",
      "Deal protection",
      "Advanced messaging",
      "Priority support",
      "Success manager",
    ],
    popular: true,
  },
  {
    id: "advertiser-trust",
    name: "Trust+ Escrow",
    price: 3999,
    description: "Maximum security & support",
    icon: Shield,
    features: [
      "Everything in TradePass",
      "Escrow services",
      "Dispute resolution",
      "Legal support",
      "Insurance coverage",
      "Dedicated manager",
    ],
    popular: false,
  },
  {
    id: "advertiser-enterprise",
    name: "Enterprise",
    price: 7999,
    description: "For large advertising agencies",
    icon: Building,
    features: [
      "Everything in Trust+",
      "Team management",
      "Bulk operations",
      "Custom workflows",
      "API access",
      "White-label platform",
    ],
    popular: false,
  },
]

export default function SubscriptionPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"media" | "advertiser">("media")
  const [loading, setLoading] = useState<string | null>(null)

  const plans = userType === "media" ? mediaPlans : advertiserPlans

  const handleSubscribe = async (planId: string) => {
    setLoading(planId)

    try {
      const response = await fetch("/api/payments/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          userId: "current-user-id", // Get from auth context
          paymentMethod: "card",
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (result.data.paymentIntent) {
          // Redirect to payment page for paid plans
          router.push(`/payment?intent=${result.data.paymentIntent.id}`)
        } else {
          // Free plan activated immediately
          alert("Plan activated successfully!")
          router.push("/dashboard")
        }
      } else {
        alert(result.error || "Subscription failed")
      }
    } catch (error) {
      alert("Network error. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 mb-6">Select the perfect plan for your advertising needs</p>

          {/* User Type Toggle */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setUserType("media")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                userType === "media" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Media Owner
            </button>
            <button
              onClick={() => setUserType("advertiser")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                userType === "advertiser" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Advertiser
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-blue-500 hover:bg-blue-600">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${plan.popular ? "bg-blue-100" : "bg-gray-100"}`}>
                    <plan.icon className={`w-6 h-6 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">₹{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? "Processing..." : plan.price === 0 ? "Get Started Free" : "Subscribe Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom solution?</p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </div>
  )
}
