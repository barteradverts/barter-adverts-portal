import { useEffect, useState } from 'react'

export function useAuth() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        } else {
            setUser(null)
        }
        setLoading(false)
    }, [])

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        window.location.href = '/login'
    }

    return { user, loading, logout }
} 