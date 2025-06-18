import Link from "next/link"

export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Start Trading?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join thousands of businesses already growing through barter advertising. No credit card required to get
          started.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/register">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto">
              Start Trading Now
            </button>
          </Link>
          <Link href="/browse">
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors w-full sm:w-auto">
              Browse Opportunities
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-blue-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-sm">Verified Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">₹50L+</div>
            <div className="text-sm">Value Traded Monthly</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-sm">Successful Matches</div>
          </div>
        </div>
      </div>
    </section>
  )
}
