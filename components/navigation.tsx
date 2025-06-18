"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User, ShoppingBag, Info, DollarSign, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/hooks/useAuth"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      className={`bg-white shadow-sm border-b sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : ""
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BA</span>
            </div>
            <span className="text-xl font-bold text-blue-600 hidden sm:block">Barter Adverts</span>
            <span className="text-xl font-bold text-blue-600 sm:hidden">BA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/marketplace"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Marketplace</span>
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <DollarSign className="h-4 w-4" />
              <span>Pricing</span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!loading && user ? (
              <Button size="sm" variant="outline" className="flex items-center space-x-2" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="py-4 space-y-1">
              <Link
                href="/marketplace"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                onClick={closeMenu}
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                Marketplace
              </Link>
              <Link
                href="/how-it-works"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                onClick={closeMenu}
              >
                <Info className="h-5 w-5 mr-3" />
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                onClick={closeMenu}
              >
                <DollarSign className="h-5 w-5 mr-3" />
                Pricing
              </Link>
              <Link
                href="/about"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                onClick={closeMenu}
              >
                <Info className="h-5 w-5 mr-3" />
                About
              </Link>

              <div className="px-2 pt-4 pb-2 space-y-2">
                {!loading && user ? (
                  <Button variant="outline" className="w-full flex items-center justify-center space-x-2" onClick={() => { closeMenu(); logout(); }}>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                ) : (
                  <>
                    <Link href="/login" onClick={closeMenu} className="block">
                      <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Login</span>
                      </Button>
                    </Link>
                    <Link href="/register" onClick={closeMenu} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
