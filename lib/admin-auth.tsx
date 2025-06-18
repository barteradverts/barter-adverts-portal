"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface Admin {
  id: string
  name: string
  email: string
  role: string
}

interface AdminAuthContextType {
  admin: Admin | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing admin session
    const adminData = localStorage.getItem("admin_data")
    if (adminData) {
      try {
        setAdmin(JSON.parse(adminData))
      } catch (error) {
        console.error("Error parsing admin data:", error)
        localStorage.removeItem("admin_data")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setAdmin(data.admin)
        localStorage.setItem("admin_data", JSON.stringify(data.admin))
        return true
      }
      return false
    } catch (error) {
      console.error("Admin login error:", error)
      return false
    }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem("admin_data")
  }

  return <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
