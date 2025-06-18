"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, Briefcase, Globe } from "lucide-react"

interface UserTypeSelectionProps {
  onSelect: (userType: string) => void
}

export function UserTypeSelection({ onSelect }: UserTypeSelectionProps) {
  const userTypes = [
    {
      id: "traditional-media",
      title: "Traditional Media Owner",
      description: "TV, Radio, Print, Outdoor advertising",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      id: "digital-publisher",
      title: "Digital Publisher",
      description: "Websites, Apps, Social Media, Email",
      icon: Globe,
      color: "text-green-600",
    },
    {
      id: "brand-advertiser",
      title: "Brand/Advertiser",
      description: "Companies looking to advertise",
      icon: Users,
      color: "text-purple-600",
    },
    {
      id: "agency-intermediary",
      title: "Agency/Intermediary",
      description: "Agencies representing clients",
      icon: Briefcase,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Barter Adverts</h1>
        <p className="text-gray-600">Choose your account type to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes.map((type) => {
          const IconComponent = type.icon
          return (
            <Card key={type.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-8 h-8 ${type.color}`} />
                  <div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => onSelect(type.id)} className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
