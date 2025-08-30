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
  updateProfile: (data: Partial<UserProfile> & { fitnessGoal?: string }) => Promise<boolean>
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
        goal: user.goal, // Eşleşme
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

  // Profil güncelleme fonksiyonu
  const updateProfile = async (data: Partial<UserProfile> & { fitnessGoal?: string }) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authFetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/update-profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )
      if (response.ok) {
        const updated = await response.json()
        setUserProfile(updated.user)
        setLoading(false)
        return true
      } else {
        setError("Profil güncellenemedi")
        setLoading(false)
        return false
      }
    } catch (err) {
      setError("Profil güncellenirken bir hata oluştu")
      setLoading(false)
      return false
    }
  }

  return (
    <UserProfileContext.Provider value={{ userProfile, loading, error, refetch, updateProfile }}>
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