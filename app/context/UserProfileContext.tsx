import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { authFetch } from "../utils/authFetch"
import { getAccessToken } from "../utils/tokenStorage"
import { useAuth } from "../../hooks/useAuth"; // veya doğru path
// Define the combined user profile type
export type UserProfile = {
  id: string
  email: string
  role: string
  name: string
  gender: string
  height: number
  weight: number
  age: number
  activityLevel: string
  goal: string
  profileImage?: string
  birthDate: string
}

type UserProfileContextType = {
  userProfile: UserProfile | null
  loading: boolean
  error: string | null
  refetch: () => void
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined)

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth(); // AuthContext'ten user'ı al

  const fetchProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getAccessToken()
      console.log("token", token)
      if (!token) {
        // Kullanıcı giriş yapmamış, fetch atlanıyor
        setLoading(false);
        setError(null);
        return;
      }
      const baseUrl = process.env.EXPO_PUBLIC_SPRING_API
      const [meRes, userInfoRes] = await Promise.all([
        authFetch(`${baseUrl}/auth/me`, { method: "GET" }),
        authFetch(`${baseUrl}/auth/userinfo`, { method: "GET" }),
      ])

      if (!meRes.ok || !userInfoRes.ok) {
        throw new Error("Failed to fetch user profile data.")
      }

      const me = await meRes.json()
      const userInfo = await userInfoRes.json()

      console.log("User data fetched:", { me, userInfo })

      setUserProfile({
        ...me,
        ...userInfo,
        profileImage: "https://via.placeholder.com/150", // Default image
      })
    } catch (err: any) {
      console.error("Profile fetch error:", err, "Base URL:", process.env.EXPO_PUBLIC_SPRING_API)
      setError(err.message || "Unknown error")
      setUserProfile(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [user])

  return (
    <UserProfileContext.Provider value={{ userProfile, loading, error, refetch: fetchProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfile = () => {
  const context = useContext(UserProfileContext)
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider")
  }
  return context
} 