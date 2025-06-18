import Link from "next/link"

export function PricingCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Start Bartering?</h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
          Join thousands of businesses already saving money and growing through strategic barter partnerships.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/register">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg">
              Start Free Today
            </button>
          </Link>
          <Link href="/contact">
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Talk to Sales
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-blue-100">Active Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">₹50L+</div>
            <div className="text-blue-100">Value Exchanged</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-blue-100">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
