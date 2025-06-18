export function PricingHeader() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
          Choose the perfect plan for your business needs. Start free and scale as you grow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-gray-700 font-medium">✨ No setup fees</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-gray-700 font-medium">🔄 Cancel anytime</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-gray-700 font-medium">📞 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  )
}
