import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { authFetch } from "../utils/authFetch"
const springUrl = process.env.EXPO_PUBLIC_SPRING_API;

export interface WorkoutProgram {
  id: number
  title: string
  slug: string
  description: string
  difficulty: string
  durationWeeks: number
  days: any[]
  exercises: number[]
  coverImageUrl?: string
  thumbnailUrl?: string
  // Add other fields as needed
}

export interface UserWorkoutProgram {
  id: string
  userId: string
  workoutProgramId: number
  startDate: string
  savedDays: any[]
}

interface WorkoutProgramContextType {
  workoutPrograms: WorkoutProgram[]
  userWorkoutPrograms: UserWorkoutProgram[]
  loading: boolean
  error: string | null
  refetch: () => void
  fetchUserWorkoutPrograms: (userId: string) => Promise<void>
  saveUserWorkoutProgram: (userId: string, workoutProgramId: number, startDate: string, savedDays: any[]) => Promise<string>
}

const WorkoutProgramContext = createContext<WorkoutProgramContextType | undefined>(undefined)

export const WorkoutProgramProvider = ({ children }: { children: ReactNode }) => {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([])
  const [userWorkoutPrograms, setUserWorkoutPrograms] = useState<UserWorkoutProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkoutPrograms = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await authFetch(`${springUrl}/workout-programs`)
      if (!res.ok) throw new Error("Programlar yüklenemedi")
      const data = await res.json()
      setWorkoutPrograms(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError("Programlar yüklenemedi")
      setWorkoutPrograms([])
    } finally {
      setLoading(false)
    }
  }

  const fetchUserWorkoutPrograms = async (userId: string) => {
    try {
      const res = await authFetch(`${springUrl}/user-workout-programs/user/${userId}`)
      if (!res.ok) throw new Error("Kullanıcı programları yüklenemedi")
      const data = await res.json()
      setUserWorkoutPrograms(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error("Kullanıcı programları yükleme hatası:", err)
      setUserWorkoutPrograms([])
    }
  }

  const saveUserWorkoutProgram = async (userId: string, workoutProgramId: number, startDate: string, savedDays: any[]) => {
    // Çakışma kontrolü
    // 1. Tüm mevcut userWorkoutPrograms içindeki günleri ve tarihleri hesapla
    // 2. Yeni eklenen programın günleriyle karşılaştır
    // 3. Çakışma varsa hata fırlat
    const getAllProgramDates = (program: { startDate: string, savedDays: any[] }) => {
      const start = new Date(program.startDate);
      return program.savedDays.map((day: any, idx: number) => {
        // Kaçıncı tekrar olduğunu bul
        const sameDayIndex = program.savedDays
          .slice(0, idx + 1)
          .filter((d: any) => d.dayNumber === day.dayNumber).length - 1;
        const weekNumber = sameDayIndex;
        const workoutDate = new Date(start);
        workoutDate.setDate(start.getDate() + (day.dayNumber - 1) + (weekNumber * 7));
        return workoutDate.toISOString().split('T')[0];
      });
    };

    // Mevcut programların tüm günleri
    const existingDates = userWorkoutPrograms.flatMap(getAllProgramDates);
    // Yeni eklenen programın günleri
    const newProgram = { startDate, savedDays };
    const newDates = getAllProgramDates(newProgram);
    // Çakışan gün var mı?
    const conflict = newDates.some((date: string) => existingDates.includes(date));
    if (conflict) {
      throw new Error("Seçtiğiniz günlerde başka bir antrenman programı mevcut. Lütfen çakışan günleri değiştirin.");
    }

    try {
      console.log("Sending request to backend with data:", {
        userId,
        workoutProgramId,
        startDate,
        savedDays
      });

      const res = await authFetch(`${springUrl}/user-workout-programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          workoutProgramId,
          startDate,
          savedDays
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend error response:", errorData);
        throw new Error(errorData.message || "Program kaydedilemedi");
      }

      const data = await res.json();
      console.log("Backend success response:", data);
      // Refresh user workout programs after saving
      await fetchUserWorkoutPrograms(userId);
      return data.message;
    } catch (err: any) {
      console.error("Backend error details:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      }
      throw new Error(err.message || "Program kaydedilemedi");
    }
  };

  useEffect(() => {
    fetchWorkoutPrograms()
  }, [])

  return (
    <WorkoutProgramContext.Provider value={{ 
      workoutPrograms, 
      userWorkoutPrograms,
      loading, 
      error, 
      refetch: fetchWorkoutPrograms, 
      fetchUserWorkoutPrograms,
      saveUserWorkoutProgram 
    }}>
      {children}
    </WorkoutProgramContext.Provider>
  )
}

export const useWorkoutPrograms = () => {
  const ctx = useContext(WorkoutProgramContext)
  if (!ctx) throw new Error("useWorkoutPrograms must be used within a WorkoutProgramProvider")
  return ctx
} 