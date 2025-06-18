"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PricingTiers() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const mediaOwnerPlans = [
    {
      name: "Free",
      description: "Perfect for individuals just getting started",
      price: billingCycle === "monthly" ? "₹0" : "₹0",
      priceDetail: "/month",
      features: [
        { name: "1 listing", included: true },
        { name: "Basic search visibility", included: true },
        { name: "1 active deal/month", included: true },
        { name: "Basic analytics", included: true },
        { name: "Email support", included: true },
        { name: "Messaging", included: false },
        { name: "Verified badge", included: false },
        { name: "Featured placement", included: false },
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Starter",
      description: "For growing media owners with multiple offerings",
      price: billingCycle === "monthly" ? "₹999" : "₹899",
      priceDetail: "/month",
      features: [
        { name: "Up to 5 listings", included: true },
        { name: "Priority search results", included: true },
        { name: "Up to 5 active deals", included: true },
        { name: "Basic analytics", included: true },
        { name: "Priority email support", included: true },
        { name: "Messaging", included: true },
        { name: "Verified badge", included: false },
        { name: "Featured placement", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      description: "For established media owners with diverse inventory",
      price: billingCycle === "monthly" ? "₹2,499" : "₹2,249",
      priceDetail: "/month",
      features: [
        { name: "Up to 15 listings", included: true },
        { name: "Priority search results", included: true },
        { name: "Up to 15 active deals", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority email & chat support", included: true },
        { name: "Messaging", included: true },
        { name: "Verified badge", included: true },
        { name: "Featured placement", included: true },
      ],
      cta: "Go Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large media networks with extensive inventory",
      price: billingCycle === "monthly" ? "₹4,999" : "₹4,499",
      priceDetail: "/month",
      features: [
        { name: "Unlimited listings", included: true },
        { name: "Top search results", included: true },
        { name: "Unlimited active deals", included: true },
        { name: "Custom analytics dashboard", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Advanced messaging", included: true },
        { name: "Premium verified badge", included: true },
        { name: "Homepage featured placement", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
            <div className="flex items-center space-x-2">
              <Label htmlFor="billing-toggle" className={`text-sm ${billingCycle === "monthly" ? "font-medium" : ""}`}>
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={billingCycle === "annual"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
              />
              <div className="flex items-center">
                <Label htmlFor="billing-toggle" className={`text-sm ${billingCycle === "annual" ? "font-medium" : ""}`}>
                  Annual
                </Label>
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  Save 10%
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaOwnerPlans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col h-full ${
                plan.popular
                  ? "border-blue-500 shadow-lg relative lg:scale-105 lg:-translate-y-2 z-10"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-blue-500 hover:bg-blue-600">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="pb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.priceDetail}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mr-3 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-gray-900" : "text-gray-400"}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">For Advertisers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-bold">TradePass</h3>
                <p className="text-sm text-gray-500 mt-1">For businesses exploring barter advertising</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">Free to start</span>
                  <p className="text-gray-500 text-sm mt-1">₹999/deal or 3-5% commission</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Unlimited barter offers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Basic deal matching</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Standard negotiation tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-start">
                    <X className="w-5 h-5 text-gray-300 mr-3 shrink-0 mt-0.5" />
                    <span className="text-gray-400">Buyer protection</span>
                  </li>
                  <li className="flex items-start">
                    <X className="w-5 h-5 text-gray-300 mr-3 shrink-0 mt-0.5" />
                    <span className="text-gray-400">Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" size="lg">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-blue-500 shadow-lg">
              <CardHeader>
                <h3 className="text-xl font-bold">Trust+ Escrow</h3>
                <p className="text-sm text-gray-500 mt-1">For businesses serious about barter deals</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">8% per deal</span>
                  <p className="text-gray-500 text-sm mt-1">Includes full protection & support</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Unlimited barter offers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Priority + curated matches</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Advanced negotiation tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Chat + Email support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Buyer protection</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span>Dispute handling</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  Upgrade to Trust+
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
