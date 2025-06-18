"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Book,
  Video,
  FileText,
  Users,
} from "lucide-react"

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    questions: [
      {
        question: "How do I create my first listing?",
        answer:
          "To create your first listing, go to your dashboard and click 'Create Listing'. Fill in the details about what you're offering or what ad space you have available. Add high-quality images and a detailed description to attract more inquiries.",
      },
      {
        question: "What types of barter deals can I make?",
        answer:
          "You can barter products, services, or advertising space. Popular exchanges include restaurant vouchers for social media posts, tech services for billboard space, or product samples for influencer mentions.",
      },
      {
        question: "How does the verification process work?",
        answer:
          "Verification involves confirming your phone number, email, and optionally your business details. Verified users get a badge and higher trust scores, leading to more successful deals.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Billing",
    icon: FileText,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, UPI, and net banking. Payments are processed securely through Razorpay with industry-standard encryption.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to premium features until the end of your billing period.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
      },
    ],
  },
  {
    id: "deals",
    title: "Managing Deals",
    icon: Users,
    questions: [
      {
        question: "How do I negotiate a fair deal?",
        answer:
          "Start by researching the market value of what you're offering and what you're seeking. Be transparent about your expectations and be open to compromise. Use our messaging system to discuss terms before finalizing.",
      },
      {
        question: "What happens if a deal goes wrong?",
        answer:
          "If you're on a Trust+ plan, you have access to our dispute resolution service. We'll mediate between parties and help find a fair solution. For other plans, we provide guidance and support.",
      },
      {
        question: "How do I track my deal progress?",
        answer:
          "Each deal has a dedicated page where you can track milestones, exchange messages, and update progress. You'll receive notifications for important updates.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Security",
    icon: Video,
    questions: [
      {
        question: "How do you ensure user safety?",
        answer:
          "We verify all users, monitor listings for quality, and provide secure messaging. Our Trust+ service includes escrow and dispute resolution for maximum protection.",
      },
      {
        question: "What should I do if I encounter a suspicious user?",
        answer:
          "Report any suspicious activity immediately using the report button on their profile or listing. Our team reviews all reports within 24 hours.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes, we use bank-level encryption to protect your data. We never share your personal information with third parties without your consent.",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("getting-started")
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-gray-600 mb-6">Find answers to common questions and get support</p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredCategories.map((category) => (
                <Card key={category.id}>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <category.icon className="w-5 h-5 mr-3 text-blue-600" />
                        {category.title}
                        <Badge variant="outline" className="ml-2">
                          {category.questions.length}
                        </Badge>
                      </div>
                      {expandedCategory === category.id ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </CardTitle>
                  </CardHeader>

                  {expandedCategory === category.id && (
                    <CardContent>
                      <div className="space-y-4">
                        {category.questions.map((faq, index) => (
                          <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                            <button
                              onClick={() =>
                                setExpandedQuestion(
                                  expandedQuestion === `${category.id}-${index}` ? null : `${category.id}-${index}`,
                                )
                              }
                              className="w-full text-left flex items-center justify-between py-2 hover:text-blue-600 transition-colors"
                            >
                              <span className="font-medium">{faq.question}</span>
                              {expandedQuestion === `${category.id}-${index}` ? (
                                <ChevronDown className="w-4 h-4 shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 shrink-0" />
                              )}
                            </button>

                            {expandedQuestion === `${category.id}-${index}` && (
                              <div className="mt-2 text-gray-600 text-sm leading-relaxed">{faq.answer}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">support@barteradverts.com</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+91 80 4567 8900</p>
                </div>
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-gray-600">Mon-Fri: 9 AM - 6 PM IST</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                  <Book className="w-4 h-4 mr-2" />
                  User Guide
                </Button>
                <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                  <Video className="w-4 h-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                  <FileText className="w-4 h-4 mr-2" />
                  API Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
