import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Lightbulb, Award } from "lucide-react"

const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    bio: "Former advertising executive with 15+ years experience in media planning and barter advertising.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    bio: "Expert in marketplace operations and user experience with background in fintech platforms.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Amit Patel",
    role: "Head of Technology",
    bio: "Full-stack developer and system architect with expertise in scalable marketplace platforms.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const values = [
  {
    icon: Target,
    title: "Transparency",
    description: "We believe in open, honest transactions with clear terms and fair pricing.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a trusted network of businesses that support each other's growth.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pioneering new ways to connect advertisers with media owners efficiently.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to providing the best barter advertising experience in India.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">About Barter Adverts</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We're revolutionizing advertising in India by creating the first unified marketplace for barter-based
            advertising across all media formats.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                To democratize advertising by enabling businesses to trade their products and services for valuable
                advertising space, eliminating the need for upfront cash investments.
              </p>
              <p className="text-lg text-gray-700">
                We believe every business deserves access to quality advertising, regardless of their cash flow
                situation. Through smart bartering, we're making this vision a reality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">₹10Cr+</div>
                  <div className="text-sm text-gray-600">Value Traded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind Barter Adverts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-700">
            <p>
              Barter Adverts was born from a simple observation: thousands of businesses in India have valuable products
              and services but struggle to afford traditional advertising, while media owners often have unsold
              inventory that goes to waste.
            </p>
            <p>
              Our founder, Rajesh Kumar, spent over 15 years in the advertising industry and witnessed this inefficiency
              firsthand. He saw small restaurants with amazing food but no budget for billboards, and billboard owners
              with empty spaces during off-peak seasons.
            </p>
            <p>
              The idea was simple but revolutionary: what if we could connect these two groups directly? What if a
              restaurant could trade their catering services for billboard space? What if an influencer could promote a
              software company in exchange for a premium license?
            </p>
            <p>
              Today, Barter Adverts is India's first and largest barter advertising marketplace, facilitating millions
              of rupees worth of value exchange every month. We're not just a platform; we're a movement towards more
              accessible, sustainable, and creative advertising solutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
