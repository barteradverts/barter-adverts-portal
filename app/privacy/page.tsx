export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information (name, email, phone number)</li>
                <li>Business information (company name, GST number)</li>
                <li>Usage data (how you interact with our platform)</li>
                <li>Communication data (messages, support tickets)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our services</li>
                <li>To facilitate barter transactions</li>
                <li>To communicate important updates</li>
                <li>To ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Information Sharing</h2>
              <p>We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Other users (as necessary for barter transactions)</li>
                <li>Service providers (payment processors, hosting services)</li>
                <li>Legal authorities (when required by law)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data, including encryption, secure
                servers, and regular security audits.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies</h2>
              <p>
                We use cookies to improve your experience, analyze usage, and provide personalized content. You can
                control cookie settings in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
              <p>
                For privacy-related questions, contact us at privacy@barteradverts.com or through our support system.
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">Last updated: January 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
