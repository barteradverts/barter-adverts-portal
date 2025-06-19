"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestAdminPage() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const userData = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData)
                setUser(parsedUser)
            } catch (error) {
                console.error("Error parsing user data:", error)
            }
        }
        setLoading(false)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        router.replace("/login")
    }

    const goToAdmin = () => {
        router.push("/admin")
    }

    const goToDashboard = () => {
        router.push("/dashboard")
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Test Page</h1>
                    <p className="text-gray-600">Testing admin functionality and user authentication</p>
                </div>

                {user ? (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Current User Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
                                    </div>
                                    <div>
                                        <span className="font-medium">Email:</span> {user.email}
                                    </div>
                                    <div>
                                        <span className="font-medium">Phone:</span> {user.phoneNumber}
                                    </div>
                                    <div>
                                        <span className="font-medium">User Type:</span> {user.userType}
                                    </div>
                                    <div>
                                        <span className="font-medium">Company:</span> {user.company || "N/A"}
                                    </div>
                                    <div>
                                        <span className="font-medium">Email Verified:</span> {user.isEmailVerified ? "Yes" : "No"}
                                    </div>
                                    <div>
                                        <span className="font-medium">Phone Verified:</span> {user.isPhoneVerified ? "Yes" : "No"}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Admin Access Test</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            User Type: <span className="font-medium">{user.userType}</span>
                                        </p>
                                        {user.userType === "super_admin" ? (
                                            <div className="text-green-600 font-medium">
                                                ✓ This user has super admin access
                                            </div>
                                        ) : (
                                            <div className="text-red-600 font-medium">
                                                ✗ This user does not have super admin access
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        {user.userType === "super_admin" && (
                                            <Button onClick={goToAdmin} className="bg-blue-600 hover:bg-blue-700">
                                                Go to Admin Dashboard
                                            </Button>
                                        )}
                                        <Button onClick={goToDashboard} variant="outline">
                                            Go to User Dashboard
                                        </Button>
                                        <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Local Storage Data</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-100 p-4 rounded-md">
                                    <pre className="text-sm overflow-auto">
                                        {JSON.stringify(user, null, 2)}
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-8">
                            <p className="text-gray-600 mb-4">No user logged in</p>
                            <Button onClick={() => router.push("/login")}>
                                Go to Login
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
} 