import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { authFetch } from "../utils/authFetch"
import { getAccessToken } from "../utils/tokenStorage"
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
  }) => Promise<void>
  getWeeklySummary: (userId: string, weekStart: string) => Promise<WeeklySummaryData>
  getWeeklyHistory: (userId: string, weekStart: string) => Promise<WeeklyWorkoutHistoryItem[]>
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
      console.log("Exercises response:", res)
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
  }: {
    userId: string
    exerciseId: number
    date: string
    durationMs: number
  }) => {
    const durationSeconds = Math.floor(durationMs / 1000); // Saniyeye çevir
    const payload = {
      userId,
      exerciseId,
      date,
      durationSeconds,
    };
    console.log("Exercise log payload to backend:", payload);
    await authFetch(`${springUrl}/exercise-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };

  const getWeeklySummary = async (userId: string, weekStart: string): Promise<WeeklySummaryData> => {
    const res = await authFetch(`${springUrl}/exercise-log/weekly-summary?userId=${userId}&weekStart=${weekStart}`);
    console.log("Weekly summary response:", res);
    if (!res.ok) throw new Error("Veri alınamadı");
    return await res.json();
  };

  const getWeeklyHistory = async (userId: string, weekStart: string): Promise<WeeklyWorkoutHistoryItem[]> => {
    const res = await authFetch(`${springUrl}/exercise-log/weekly-history?userId=${userId}&weekStart=${weekStart}`);
    if (!res.ok) throw new Error("Veri alınamadı");
    return await res.json();
  };

  useEffect(() => {
    fetchExercises()
  }, [])

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