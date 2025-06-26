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

  useEffect(() => {
    setLoading(true);
    if (user) {
      setUserProfile({
        ...user,
        goal: user.fitnessGoal, // Eşleşme
      });
      setError(null);
    } else {
      setUserProfile(null);
    }
    setLoading(false);
  }, [user]);


  const refetch = () => {
    // AuthContext'teki kullanıcı verisi yenilendiğinde burası tetiklenir.
    // Şimdilik boş bırakılabilir veya AuthContext'e bir refetch fonksiyonu eklenip o çağrılabilir.
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, loading, error, refetch }}>
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