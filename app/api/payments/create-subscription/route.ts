import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planId, userId, paymentMethod } = body

    if (!planId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Plan configurations
    const plans = {
      // Media Owner Plans
      "media-starter": { name: "Starter", price: 0, interval: "monthly", type: "media" },
      "media-professional": { name: "Professional", price: 2999, interval: "monthly", type: "media" },
      "media-premium": { name: "Premium", price: 4999, interval: "monthly", type: "media" },
      "media-enterprise": { name: "Enterprise", price: 9999, interval: "monthly", type: "media" },

      // Advertiser Plans
      "advertiser-explorer": { name: "Explorer", price: 0, interval: "monthly", type: "advertiser" },
      "advertiser-tradepass": { name: "TradePass", price: 1999, interval: "monthly", type: "advertiser" },
      "advertiser-trust": { name: "Trust+ Escrow", price: 3999, interval: "monthly", type: "advertiser" },
      "advertiser-enterprise": { name: "Enterprise", price: 7999, interval: "monthly", type: "advertiser" },
    }

    const plan = plans[planId as keyof typeof plans]
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // For free plans, create subscription immediately
    if (plan.price === 0) {
      const subscription = {
        id: `sub_${Date.now()}`,
        userId,
        planId,
        planName: plan.name,
        amount: plan.price,
        interval: plan.interval,
        status: "active",
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      }

      return NextResponse.json({
        success: true,
        message: "Free plan activated successfully",
        data: subscription,
      })
    }

    // For paid plans, create payment intent
    // In a real app, you would integrate with Razorpay/Stripe here
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount: plan.price * 100, // Convert to paise for Razorpay
      currency: "INR",
      status: "requires_payment_method",
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
    }

    return NextResponse.json({
      success: true,
      message: "Payment intent created",
      data: {
        paymentIntent,
        plan,
      },
    })
  } catch (error) {
    console.error("Subscription creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
