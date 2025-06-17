import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { authFetch } from "../utils/authFetch"
const springUrl = process.env.EXPO_PUBLIC_SPRING_API;
export interface Exercise {
  id: number
  name: string
  type: string
  muscleGroup: string
  instructions: string[]
  tips: string[]
  duration: string
  calories: string
  imageUrl?: string
  sets?: number
  reps?: number
}

interface ExerciseContextType {
  exercises: Exercise[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined)

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExercises = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await authFetch(`${springUrl}/exercises`)
      if (!res.ok) throw new Error("Egzersizler yüklenemedi")
      const data = await res.json()
      setExercises(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError("Egzersizler yüklenemedi")
      setExercises([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExercises()
  }, [])

  return (
    <ExerciseContext.Provider value={{ exercises, loading, error, refetch: fetchExercises }}>
      {children}
    </ExerciseContext.Provider>
  )
}

export const useExercises = () => {
  const ctx = useContext(ExerciseContext)
  if (!ctx) throw new Error("useExercises must be used within an ExerciseProvider")
  return ctx
}