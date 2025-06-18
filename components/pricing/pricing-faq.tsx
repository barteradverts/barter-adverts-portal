"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What's the difference between Media Owner and Advertiser plans?",
    answer:
      "Media Owner plans are for businesses that have advertising inventory to offer (TV stations, radio, websites, etc.). Advertiser plans are for businesses looking to acquire advertising space through barter deals.",
  },
  {
    question: "Can I switch between plans anytime?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our encrypted payment gateway.",
  },
  {
    question: "Is there a contract or commitment required?",
    answer:
      "No long-term contracts required! All paid plans are month-to-month and you can cancel anytime. Enterprise plans may have custom terms based on your needs.",
  },
  {
    question: "What happens to my listings if I downgrade?",
    answer:
      "Your existing listings remain active, but you may be limited in creating new ones based on your new plan's limits. We'll notify you before any changes take effect.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund within 30 days of purchase.",
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
