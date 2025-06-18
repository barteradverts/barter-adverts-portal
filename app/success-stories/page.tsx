import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Users, Calendar } from "lucide-react"

const successStories = [
  {
    id: 1,
    title: "Coffee Shop Gets Prime Billboard Space",
    advertiser: "Brew & Beans Cafe",
    mediaOwner: "Metro Advertising",
    deal: "6-month coffee subscription ↔ 2-week billboard display",
    value: "₹15,000",
    result: "40% increase in foot traffic, 25% boost in sales",
    image: "/placeholder.svg?height=300&width=400",
    category: "Food & Beverage",
    duration: "2 weeks",
    rating: 5,
    testimonial:
      "This was exactly what we needed! The billboard brought so many new customers, and the coffee subscription was perfect for our office team.",
  },
  {
    id: 2,
    title: "Tech Startup Trades Software for Influencer Campaign",
    advertiser: "CloudSync Solutions",
    mediaOwner: "TechReviewer (50K followers)",
    deal: "1-year software license ↔ 5 sponsored posts + 1 video review",
    value: "₹50,000",
    result: "500+ new signups, 200% increase in brand awareness",
    image: "/placeholder.svg?height=300&width=400",
    category: "Technology",
    duration: "1 month",
    rating: 5,
    testimonial:
      "The influencer campaign was incredibly effective. We got high-quality leads and the content was authentic and engaging.",
  },
  {
    id: 3,
    title: "Restaurant Chain Expands with Radio Sponsorship",
    advertiser: "Spice Route Restaurants",
    mediaOwner: "City FM 94.3",
    deal: "Catering for radio events ↔ 3-month radio sponsorship",
    value: "₹75,000",
    result: "30% increase in delivery orders, expanded to 2 new locations",
    image: "/placeholder.svg?height=300&width=400",
    category: "Food & Beverage",
    duration: "3 months",
    rating: 4,
    testimonial:
      "Radio advertising helped us reach a completely new audience. The catering events were great for building relationships too.",
  },
  {
    id: 4,
    title: "Fashion Brand Partners with Lifestyle Blogger",
    advertiser: "Urban Threads",
    mediaOwner: "StyleDiva Blog",
    deal: "Designer clothing collection ↔ Fashion week coverage + blog posts",
    value: "₹35,000",
    result: "300% increase in online sales, featured in fashion magazines",
    image: "/placeholder.svg?height=300&width=400",
    category: "Fashion",
    duration: "2 months",
    rating: 5,
    testimonial:
      "The blogger's authentic style perfectly matched our brand. The coverage during fashion week was invaluable.",
  },
  {
    id: 5,
    title: "Fitness Studio Gets Digital Display Network",
    advertiser: "FitLife Gym",
    mediaOwner: "Digital Screens Network",
    deal: "Free gym memberships ↔ Digital display ads across 10 locations",
    value: "₹40,000",
    result: "150 new memberships, 60% increase in trial signups",
    image: "/placeholder.svg?height=300&width=400",
    category: "Health & Fitness",
    duration: "1 month",
    rating: 5,
    testimonial: "The digital displays reached exactly our target audience. We're planning our next campaign already!",
  },
  {
    id: 6,
    title: "Local Newspaper Promotes Educational Institute",
    advertiser: "Bright Minds Academy",
    mediaOwner: "City Chronicle",
    deal: "Free courses for staff ↔ Education supplement feature + ads",
    value: "₹25,000",
    result: "200+ new student enrollments, established as education leader",
    image: "/placeholder.svg?height=300&width=400",
    category: "Education",
    duration: "6 weeks",
    rating: 4,
    testimonial: "The newspaper feature gave us credibility and the ongoing ads brought consistent inquiries.",
  },
]

const stats = [
  { label: "Total Deals Completed", value: "1,200+", icon: TrendingUp },
  { label: "Value Traded", value: "₹10Cr+", icon: Star },
  { label: "Happy Users", value: "500+", icon: Users },
  { label: "Average Deal Time", value: "12 days", icon: Calendar },
]

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Real businesses, real results. See how barter advertising is transforming growth across India.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Success Stories</h2>
            <p className="text-xl text-gray-600">Discover how businesses are growing through smart bartering</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {successStories.map((story) => (
              <Card
                key={story.id}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img src={story.image || "/placeholder.svg"} alt={story.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500">{story.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium ml-1">{story.rating}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Advertiser:</span>
                      <span className="font-medium">{story.advertiser}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Media Owner:</span>
                      <span className="font-medium">{story.mediaOwner}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Deal Value:</span>
                      <span className="font-medium text-green-600">{story.value}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{story.duration}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">The Deal:</h4>
                    <p className="text-sm text-gray-700">{story.deal}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                    <p className="text-sm text-gray-700">{story.result}</p>
                  </div>

                  <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 text-sm">
                    "{story.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of businesses already growing through barter advertising. Your success story could be next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Trading Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Opportunities
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
