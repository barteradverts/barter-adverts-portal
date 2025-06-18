export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Barter Adverts, you accept and agree to be bound by the terms and provision of
                this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Platform Description</h2>
              <p>
                Barter Adverts is a marketplace platform that facilitates barter exchanges between advertisers and media
                owners. We act as an aggregator and do not participate directly in transactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and truthful information in your listings</li>
                <li>Honor all barter agreements made through the platform</li>
                <li>Maintain professional communication with other users</li>
                <li>Report any fraudulent or suspicious activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Prohibited Activities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Posting false or misleading information</li>
                <li>Engaging in fraudulent transactions</li>
                <li>Harassment or inappropriate behavior</li>
                <li>Violation of intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Payment and Fees</h2>
              <p>
                Subscription fees are charged monthly/annually as per your chosen plan. Commission fees apply to
                completed barter deals as outlined in our pricing structure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Dispute Resolution</h2>
              <p>
                Any disputes between users should first be resolved through our platform's mediation system. Unresolved
                disputes may be escalated to binding arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
              <p>
                Barter Adverts is not liable for any damages arising from barter transactions between users. We provide
                the platform but do not guarantee the quality or delivery of bartered goods/services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Termination</h2>
              <p>
                We reserve the right to terminate accounts that violate these terms. Users may cancel their accounts at
                any time through their dashboard settings.
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">Last updated: January 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
