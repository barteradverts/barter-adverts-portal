"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token')

            if (!token) {
                setStatus('error')
                setMessage('Invalid verification link. Missing token.')
                return
            }

            try {
                const response = await fetch(`/api/auth/verify-email?token=${token}`)

                if (response.ok) {
                    setStatus('success')
                    setMessage('Email verified successfully! You can now log in.')
                } else {
                    const data = await response.json()
                    setStatus('error')
                    setMessage(data.error || 'Email verification failed.')
                }
            } catch (error) {
                setStatus('error')
                setMessage('Email verification failed. Please try again.')
            }
        }

        verifyEmail()
    }, [searchParams])

    const handleLogin = () => {
        router.push('/login?verified=true')
    }

    const handleResend = () => {
        router.push('/login?resend=true')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verification</h1>
                    <p className="text-gray-600">Verifying your email address...</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    {status === 'loading' && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Verifying your email...</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Verified!</h2>
                            <p className="text-gray-600 mb-6">{message}</p>
                            <button
                                onClick={handleLogin}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Continue to Login
                            </button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
                            <p className="text-gray-600 mb-6">{message}</p>
                            <div className="space-y-3">
                                <button
                                    onClick={handleResend}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Resend Verification Email
                                </button>
                                <button
                                    onClick={handleLogin}
                                    className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Go to Login
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 