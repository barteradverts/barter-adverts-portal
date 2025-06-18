import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Advertising: Why Barter is the New Currency",
    excerpt:
      "Discover how barter advertising is revolutionizing the way businesses grow, especially in uncertain economic times.",
    author: "Rajesh Kumar",
    date: "2024-01-20",
    readTime: "8 min read",
    category: "Industry Insights",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
  {
    id: 2,
    title: "5 Success Stories: How Small Businesses Scaled with Zero Ad Spend",
    excerpt:
      "Real case studies of businesses that achieved remarkable growth through strategic barter advertising partnerships.",
    author: "Priya Sharma",
    date: "2024-01-18",
    readTime: "12 min read",
    category: "Case Studies",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 3,
    title: "Maximizing Your Billboard ROI Through Smart Barter Deals",
    excerpt:
      "A comprehensive guide for media owners on how to monetize unsold inventory through strategic partnerships.",
    author: "Amit Patel",
    date: "2024-01-15",
    readTime: "10 min read",
    category: "Tips & Guides",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 4,
    title: "The Psychology of Barter: Why It Works Better Than Cash",
    excerpt:
      "Understanding the psychological factors that make barter advertising more effective than traditional paid advertising.",
    author: "Dr. Sarah Johnson",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Research",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 5,
    title: "Building Trust in Digital Barter Marketplaces",
    excerpt: "How technology and community guidelines create safe, trustworthy environments for business exchanges.",
    author: "Rajesh Kumar",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 6,
    title: "From Startup to Scale: A Barter Advertising Roadmap",
    excerpt:
      "A step-by-step guide for startups to leverage barter advertising for sustainable growth without burning cash.",
    author: "Priya Sharma",
    date: "2024-01-08",
    readTime: "15 min read",
    category: "Startup Guide",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
]

const categories = [
  "All",
  "Industry Insights",
  "Case Studies",
  "Tips & Guides",
  "Research",
  "Technology",
  "Startup Guide",
]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">Barter Adverts Blog</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Insights, strategies, and success stories from the world of barter advertising
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <Card className="border-0 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-500">{featuredPost.category}</Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Get the latest insights on barter advertising, success stories, and platform updates delivered to your
                inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm opacity-80 mt-4">No spam, unsubscribe anytime</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
