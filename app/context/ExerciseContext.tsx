import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { authFetch } from "../utils/authFetch"
import { getAccessToken } from "../utils/tokenStorage"
import { useAuth } from "./AuthContext"
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

export interface WeeklySummaryData {
  userId: string;
  weekStartDate: string;
  totalWorkouts: number;
  totalCalories: number;
  totalDuration: number; // seconds
}

export interface WeeklyWorkoutHistoryItem {
  exerciseName: string;
  exerciseType: string;
  durationMinutes: number;
  calories: number;
  date: string;
  completed: boolean;
}

interface ExerciseContextType {
  exercises: Exercise[]
  loading: boolean
  error: string | null
  refetch: () => void
  logExercise: (params: {
    userId: string
    exerciseId: number
    date: string
    durationMs: number
    completed?: boolean
  }) => Promise<void>
  getWeeklySummary: (userId: string, weekStart: string) => Promise<WeeklySummaryData>
  getWeeklyHistory: (userId: string, weekStart: string) => Promise<WeeklyWorkoutHistoryItem[]>
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined)

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth();

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

  const logExercise = async ({
    userId,
    exerciseId,
    date,
    durationMs,
    completed = true,
  }: {
    userId: string
    exerciseId: number
    date: string
    durationMs: number
    completed?: boolean
  }) => {
    const durationSeconds = Math.floor(durationMs / 1000); // Saniyeye çevir
    const payload = {
      userId,
      exerciseId,
      date,
      durationSeconds,
      completed,
    };
    await authFetch(`${springUrl}/exercise-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };

  const getWeeklySummary = async (userId: string, weekStart: string): Promise<WeeklySummaryData> => {
    const res = await authFetch(`${springUrl}/exercise-log/weekly-summary?userId=${userId}&weekStart=${weekStart}`);    
    if (!res.ok) throw new Error("Veri alınamadı");
    return await res.json();
  };

  const getWeeklyHistory = async (userId: string, weekStart: string): Promise<WeeklyWorkoutHistoryItem[]> => {
    const res = await authFetch(`${springUrl}/exercise-log/weekly-history?userId=${userId}&weekStart=${weekStart}`);
    if (!res.ok) throw new Error("Veri alınamadı");
    return await res.json();
  };

  /**
   * Fetch exercises whenever a logged-in user becomes available.
   * This prevents unauthorized (401) responses that happen when the token
   * has not yet been loaded while the provider mounts.
   */
  useEffect(() => {
    if (user) {
      fetchExercises();
    }
  }, [user])

  return (
    <ExerciseContext.Provider value={{ exercises, loading, error, refetch: fetchExercises, logExercise, getWeeklySummary, getWeeklyHistory }}>
      {children}
    </ExerciseContext.Provider>
  )
}

export const useExercises = () => {
  const ctx = useContext(ExerciseContext)
  if (!ctx) throw new Error("useExercises must be used within an ExerciseProvider")
  return ctx
}