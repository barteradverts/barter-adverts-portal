import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ButtonFixer } from "@/components/button-fixer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Barter Adverts - India's First Unified Barter Marketplace",
  description:
    "Trade your way to better marketing. Connect advertisers with media owners for mutually beneficial exchanges.",
  keywords: "barter, advertising, marketing, trade, media, billboard, influencer, radio, digital",
  authors: [{ name: "Barter Adverts Team" }],
  creator: "Barter Adverts",
  publisher: "Barter Adverts",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://barteradverts.com",
    title: "Barter Adverts - India's First Unified Barter Marketplace",
    description:
      "Trade your way to better marketing. Connect advertisers with media owners for mutually beneficial exchanges.",
    siteName: "Barter Adverts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barter Adverts - India's First Unified Barter Marketplace",
    description:
      "Trade your way to better marketing. Connect advertisers with media owners for mutually beneficial exchanges.",
    creator: "@barteradverts",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <ButtonFixer />
        <Toaster />
      </body>
    </html>
  )
}
