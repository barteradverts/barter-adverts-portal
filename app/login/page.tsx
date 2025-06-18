"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/useAuth"

const countries = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
]

function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pin, setPin] = useState("")
  const [loginMethod, setLoginMethod] = useState<"email" | "pin" | "otp">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [step, setStep] = useState(1) // 1: Login Form, 2: OTP

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard")
    }
  }, [user, loading, router])

  useEffect(() => {
    // Check for success messages from URL params
    const verified = searchParams.get('verified')
    const resend = searchParams.get('resend')

    if (verified === 'true') {
      setSuccess('Email verified successfully! You can now log in.')
    }

    if (resend === 'true') {
      setSuccess('Please check your email for a new verification link.')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      if (loginMethod === "email") {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (data.success) {
          // Store user data and redirect
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem("token", data.token)
          window.location.href = "/dashboard"
        } else {
          setError(data.error || "Invalid email or password")
        }
      } else if (loginMethod === "pin") {
        const fullPhoneNumber = countryCode + phoneNumber
        const response = await fetch("/api/auth/login-pin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: fullPhoneNumber, pin }),
        })

        const data = await response.json()

        if (data.success) {
          // Store user data and redirect
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem("token", data.token)
          window.location.href = "/dashboard"
        } else {
          setError(data.error || "Invalid phone number or PIN")
        }
      } else {
        const fullPhoneNumber = countryCode + phoneNumber
        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
        })

        const data = await response.json()

        if (data.success) {
          setStep(2)
        } else {
          setError(data.error || "Failed to send OTP")
        }
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 2) {
    return <OTPLogin phoneNumber={countryCode + phoneNumber} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Barter Adverts account</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="flex space-x-4 mb-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="loginMethod"
                    value="email"
                    checked={loginMethod === "email"}
                    onChange={(e) => setLoginMethod(e.target.value as "email" | "pin" | "otp")}
                    className="mr-2"
                  />
                  <span className="text-sm">Email & Password</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="loginMethod"
                    value="pin"
                    checked={loginMethod === "pin"}
                    onChange={(e) => setLoginMethod(e.target.value as "email" | "pin" | "otp")}
                    className="mr-2"
                  />
                  <span className="text-sm">Phone & PIN</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="loginMethod"
                    value="otp"
                    checked={loginMethod === "otp"}
                    onChange={(e) => setLoginMethod(e.target.value as "email" | "pin" | "otp")}
                    className="mr-2"
                  />
                  <span className="text-sm">Phone & OTP</span>
                </label>
              </div>
            </div>

            {loginMethod === "email" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </>
            )}

            {(loginMethod === "pin" || loginMethod === "otp") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210"
                    className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {loginMethod === "pin" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">4-digit PIN</label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                  maxLength={4}
                  required
                />
              </div>
            )}

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">{success}</div>}

            <button
              type="submit"
              disabled={isLoading ||
                (loginMethod === "email" && (!email || !password)) ||
                (loginMethod === "pin" && (!phoneNumber || pin.length !== 4)) ||
                (loginMethod === "otp" && !phoneNumber)
              }
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Please wait..." :
                loginMethod === "email" ? "Sign In with Email" :
                  loginMethod === "pin" ? "Sign In with PIN" :
                    "Send OTP & Sign In"
              }
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Accounts (For Testing)</h3>
            <div className="space-y-2 text-xs">
              <div className="bg-white p-2 rounded border">
                <p className="font-medium text-gray-700">Email Account:</p>
                <p className="text-gray-600">Email: demo@barteradverts.com</p>
                <p className="text-gray-600">Password: demo123</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="font-medium text-gray-700">Advertiser Account:</p>
                <p className="text-gray-600">Phone: +91 9876543210</p>
                <p className="text-gray-600">PIN: 1234</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="font-medium text-gray-700">Media Owner Account:</p>
                <p className="text-gray-600">Phone: +91 9876543211</p>
                <p className="text-gray-600">PIN: 5678</p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function OTPLogin({ phoneNumber }: { phoneNumber: string }) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      })

      const data = await response.json()

      if (data.success) {
        // Store user data and token if present
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem("token", data.token)
        }
        window.location.href = "/dashboard"
      } else {
        setError(data.error || "Invalid OTP")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter OTP</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to <br />
            <span className="font-medium">{phoneNumber}</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
            </div>

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify & Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={() => window.location.reload()} className="text-sm text-blue-600 hover:underline">
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PageWrapper() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  )
}
