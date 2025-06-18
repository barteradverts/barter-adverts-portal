"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, X, Star, Crown, Shield, ArrowRight, Users, TrendingUp, Rocket } from "lucide-react"
import Link from "next/link"

const pricingPlans = {
  advertiser: [
    {
      name: "Starter",
      price: { monthly: 999, yearly: 9990 },
      commission: 3,
      description: "Perfect for small businesses getting started",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      popular: false,
      dealLimit: "Up to 5 deals/month",
      features: [
        { name: "Up to 5 active listings", included: true },
        { name: "Basic search & filters", included: true },
        { name: "Direct messaging", included: true },
        { name: "Email support", included: true },
        { name: "Basic analytics", included: true },
        { name: "Deal tracking", included: true },
        { name: "Priority support", included: false },
        { name: "Verified badge", included: false },
      ],
    },
    {
      name: "Growth",
      price: { monthly: 2499, yearly: 24990 },
      commission: 3,
      description: "For growing businesses ready to scale",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      popular: true,
      dealLimit: "Up to 15 deals/month",
      features: [
        { name: "Up to 15 active listings", included: true },
        { name: "Advanced search & filters", included: true },
        { name: "Priority messaging", included: true },
        { name: "Priority email support", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Deal tracking & reporting", included: true },
        { name: "Verified business badge", included: true },
        { name: "Featured listings (3/month)", included: true },
      ],
    },
    {
      name: "Professional",
      price: { monthly: 4999, yearly: 49990 },
      commission: 3,
      description: "For established businesses with high volume",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      popular: false,
      dealLimit: "Up to 50 deals/month",
      features: [
        { name: "Up to 50 active listings", included: true },
        { name: "AI-powered matching", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Custom analytics dashboard", included: true },
        { name: "Premium verified badge", included: true },
        { name: "Featured listings (10/month)", included: true },
        { name: "API access", included: true },
      ],
    },
    {
      name: "Enterprise",
      price: { monthly: 9999, yearly: 99990 },
      commission: 3,
      description: "Custom solutions for large organizations",
      icon: Rocket,
      color: "from-gray-700 to-gray-900",
      popular: false,
      dealLimit: "Unlimited deals",
      features: [
        { name: "Unlimited active listings", included: true },
        { name: "Custom integrations", included: true },
        { name: "White-label solutions", included: true },
        { name: "Dedicated infrastructure", included: true },
        { name: "Custom reporting suite", included: true },
        { name: "Enterprise SLA", included: true },
        { name: "Training & onboarding", included: true },
        { name: "Custom contract terms", included: true },
      ],
    },
  ],
  mediaOwner: [
    {
      name: "Basic",
      price: { monthly: 0, yearly: 0 },
      commission: 5,
      description: "For individual media owners starting out",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      popular: false,
      dealLimit: "Up to 3 deals/month",
      features: [
        { name: "Up to 5 media listings", included: true },
        { name: "Basic portfolio", included: true },
        { name: "Direct messaging", included: true },
        { name: "Community support", included: true },
        { name: "Basic analytics", included: true },
        { name: "Revenue tracking", included: false },
        { name: "Priority placement", included: false },
        { name: "Verified media badge", included: false },
      ],
    },
    {
      name: "Professional",
      price: { monthly: 1499, yearly: 14990 },
      commission: 4,
      description: "For professional media owners and agencies",
      icon: Star,
      color: "from-blue-500 to-cyan-500",
      popular: true,
      dealLimit: "Up to 20 deals/month",
      features: [
        { name: "Up to 25 media listings", included: true },
        { name: "Enhanced portfolio", included: true },
        { name: "Priority messaging", included: true },
        { name: "Email support", included: true },
        { name: "Revenue tracking & analytics", included: true },
        { name: "Verified media badge", included: true },
        { name: "Featured placement (5/month)", included: true },
        { name: "Bulk operations", included: false },
      ],
    },
    {
      name: "Agency",
      price: { monthly: 3999, yearly: 39990 },
      commission: 3,
      description: "For media agencies managing multiple properties",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      popular: false,
      dealLimit: "Up to 100 deals/month",
      features: [
        { name: "Unlimited media listings", included: true },
        { name: "Multi-property management", included: true },
        { name: "Team collaboration tools", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Advanced revenue analytics", included: true },
        { name: "Premium verified badge", included: true },
        { name: "Featured placement (20/month)", included: true },
        { name: "Bulk operations & API", included: true },
      ],
    },
    {
      name: "Network",
      price: { monthly: 7999, yearly: 79990 },
      commission: 2,
      description: "For large media networks and corporations",
      icon: Shield,
      color: "from-gray-700 to-gray-900",
      popular: false,
      dealLimit: "Unlimited deals",
      features: [
        { name: "Everything in Agency", included: true },
        { name: "Custom integrations", included: true },
        { name: "White-label solutions", included: true },
        { name: "Dedicated infrastructure", included: true },
        { name: "Custom reporting suite", included: true },
        { name: "Enterprise SLA", included: true },
        { name: "Training & onboarding", included: true },
        { name: "Lowest commission rates", included: true },
      ],
    },
  ],
}

export function ABTestPricing() {
  const [userType, setUserType] = useState<"advertiser" | "mediaOwner">("advertiser")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const currentPlans = pricingPlans[userType]

  const formatPrice = (price: number | string) => {
    if (typeof price === "string") return price
    if (price === 0) return "Free"
    return `₹${price.toLocaleString()}`
  }

  const getSavings = (monthly: number, yearly: number) => {
    if (typeof monthly !== "number" || typeof yearly !== "number") return 0
    const monthlyCost = monthly * 12
    const savings = ((monthlyCost - yearly) / monthlyCost) * 100
    return Math.round(savings)
  }

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">New Pricing Model</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Fixed Monthly + Commission
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pay a fixed monthly fee plus commission only on successful deals. No hidden costs.
          </p>
        </div>

        {/* User Type Toggle */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="bg-gray-100 p-1 rounded-xl">
            <button
              className={`px-4 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
                userType === "advertiser" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setUserType("advertiser")}
            >
              For Advertisers
            </button>
            <button
              className={`px-4 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
                userType === "mediaOwner" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setUserType("mediaOwner")}
            >
              For Media Owners
            </button>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8 md:mb-12">
          <span
            className={`font-medium text-sm md:text-base ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}
          >
            Monthly
          </span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
          />
          <span
            className={`font-medium text-sm md:text-base ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"}`}
          >
            Yearly
          </span>
          {billingCycle === "yearly" && (
            <Badge className="bg-green-100 text-green-800 ml-2 text-xs">Save up to 17%</Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {currentPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 transition-all duration-300 hover:shadow-2xl ${
                plan.popular ? "border-blue-500 shadow-xl md:scale-105" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-3 md:px-4 py-1 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`bg-gradient-to-br ${plan.color} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <plan.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>

                <CardTitle className="text-lg md:text-xl font-bold">{plan.name}</CardTitle>
                <p className="text-gray-600 text-xs md:text-sm">{plan.description}</p>

                <div className="mt-4">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formatPrice(plan.price[billingCycle])}
                  </div>
                  {typeof plan.price[billingCycle] === "number" && plan.price[billingCycle] > 0 && (
                    <div className="text-xs md:text-sm text-gray-500">
                      per {billingCycle === "monthly" ? "month" : "year"}
                    </div>
                  )}

                  {/* Commission Badge */}
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      + {plan.commission}% commission per deal
                    </Badge>
                  </div>

                  {/* Deal Limit */}
                  <div className="mt-2 text-xs text-gray-600">{plan.dealLimit}</div>
                </div>
              </CardHeader>

              <CardContent>
                <Link href="/register">
                  <Button
                    className={`w-full mb-6 text-sm md:text-base ${
                      plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {plan.price[billingCycle] === 0 ? "Get Started Free" : "Start Free Trial"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 md:w-5 md:h-5 text-gray-300 mr-3 flex-shrink-0" />
                      )}
                      <span className={`text-xs md:text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Model Explanation */}
        <div className="bg-blue-50 rounded-2xl md:rounded-3xl p-6 md:p-12 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How Our Pricing Works</h3>
            <p className="text-lg md:text-xl text-gray-600">Simple, transparent pricing with no surprises</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fixed Monthly Fee</h4>
              <p className="text-gray-600 text-sm">Pay a predictable monthly subscription based on your plan</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Commission on Success</h4>
              <p className="text-gray-600 text-sm">Pay commission only when deals are successfully completed</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">No Hidden Costs</h4>
              <p className="text-gray-600 text-sm">What you see is what you pay. No setup fees or hidden charges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
