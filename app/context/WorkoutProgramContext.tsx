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
  workoutProgramId: number | null
  customWorkoutProgramId?: number | null
  startDate: string
  savedDays: any[]
}

interface CustomWorkoutProgram {
  id?: string;
  userId: string;
  title: string;
  description: string;
  durationWeeks: number;
  tags?: string[];
  coverImageUrl?: string;
  days: {
    dayOfWeek: number;
    exerciseEntries: {
      orderIndex: number;
      exerciseId: number;
    }[];
  }[];
}

interface SaveProgramPayload {
  userId: string;
  startDate: string;
  savedDays: any[];
  workoutProgramId?: number;
  customWorkoutProgramId?: number;
}

interface WorkoutProgramContextType {
  workoutPrograms: WorkoutProgram[]
  userWorkoutPrograms: UserWorkoutProgram[]
  userCustomWorkoutPrograms: CustomWorkoutProgram[]
  loading: boolean
  error: string | null
  refetch: () => void
  fetchUserWorkoutPrograms: (userId: string) => Promise<void>
  saveUserWorkoutProgram: (payload: SaveProgramPayload) => Promise<string>
  deleteUserWorkoutProgram: (userId: string, programId: string) => Promise<void>
  createCustomWorkoutProgram: (program: CustomWorkoutProgram) => Promise<CustomWorkoutProgram>
  fetchUserCustomWorkoutPrograms: (userId: string) => Promise<CustomWorkoutProgram[]>
  deleteCustomWorkoutProgram: (userId: string, programId: string) => Promise<void>
  addUserWorkoutProgram: (program: any, userId: string, startDate: string) => Promise<void>
}

const WorkoutProgramContext = createContext<WorkoutProgramContextType | undefined>(undefined)

export const WorkoutProgramProvider = ({ children }: { children: ReactNode }) => {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([])
  const [userWorkoutPrograms, setUserWorkoutPrograms] = useState<UserWorkoutProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userCustomWorkoutPrograms, setUserCustomWorkoutPrograms] = useState<CustomWorkoutProgram[]>([])

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

  const saveUserWorkoutProgram = async (payload: SaveProgramPayload) => {
    // Çakışma kontrolü
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
    const newProgram = { startDate: payload.startDate, savedDays: payload.savedDays };
    const newDates = getAllProgramDates(newProgram);
    // Çakışan gün var mı?
    const conflict = newDates.some((date: string) => existingDates.includes(date));
    if (conflict) {
      throw new Error("Seçtiğiniz günlerde başka bir antrenman programı mevcut. Lütfen çakışan günleri değiştirin.");
    }

    try {
      

      const res = await authFetch(`${springUrl}/user-workout-programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend error response:", errorData);
        throw new Error(errorData.message || "Program kaydedilemedi");
      }

      const data = await res.json();
      
      // Refresh user workout programs after saving
      await fetchUserWorkoutPrograms(payload.userId);
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

  const deleteUserWorkoutProgram = async (userId: string, programId: string) => {
    try {
      
      const res = await authFetch(`${springUrl}/user-workout-programs/${userId}/${programId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Delete program error response:", errorData);
        throw new Error(errorData.message || "Program silinemedi");
      }

      
      // Programı başarıyla sildikten sonra listeyi güncelle
      await fetchUserWorkoutPrograms(userId);
    } catch (err: any) {
      console.error("Program silme hatası detayları:", {
        error: err,
        message: err.message,
        stack: err.stack
      });
      throw new Error(err.message || "Program silinemedi");
    }
  };

  const createCustomWorkoutProgram = async (program: CustomWorkoutProgram) => {
    try {
      const res = await authFetch(`${springUrl}/custom-workout-programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(program),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Custom program could not be saved');
      }
      const data = await res.json();
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Custom program could not be saved');
    }
  };

  const fetchUserCustomWorkoutPrograms = async (userId: string) => {
    try {
      const res = await authFetch(`${springUrl}/custom-workout-programs/user/${userId}`);
      if (!res.ok) throw new Error('Custom programs could not be loaded');
      const data = await res.json();
      setUserCustomWorkoutPrograms(Array.isArray(data) ? data : []);
      return data;
    } catch (err: any) {
      setUserCustomWorkoutPrograms([]);
      throw new Error(err.message || 'Custom programs could not be loaded');
    }
  };

  const deleteCustomWorkoutProgram = async (userId: string, programId: string) => {
    try {
      const res = await authFetch(`${springUrl}/custom-workout-programs/${programId}?userId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Custom program silinemedi');
      }
      // Başarıyla silindiyse custom programları tekrar çek
      await fetchUserCustomWorkoutPrograms(userId);
    } catch (err: any) {
      throw new Error(err.message || 'Custom program silinemedi');
    }
  };

  const addUserWorkoutProgram = async (program: any, userId: string, startDate: string) => {
    const isCustom = !program.slug; // Slug sadece hazır programlarda var
    
    const body: any = {
      userId,
      startDate,
      days: program.days.map((d: any) => ({
        dayNumber: d.dayOfWeek,
        exerciseEntries: d.exerciseEntries.map((e: any) => ({
          exerciseId: e.exerciseId,
          orderIndex: e.orderIndex
        }))
      }))
    };

    if (isCustom) {
      body.customWorkoutProgramId = program.id;
    } else {
      body.workoutProgramId = program.id;
    }

    const res = await authFetch(`${springUrl}/user-workout-programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Kullanıcı programı eklenemedi");
    }

    // Listeyi yenile
    await fetchUserWorkoutPrograms(userId);
  };

  useEffect(() => {
    fetchWorkoutPrograms()
  }, [])

  return (
    <WorkoutProgramContext.Provider value={{ 
      workoutPrograms, 
      userWorkoutPrograms,
      userCustomWorkoutPrograms,
      loading, 
      error, 
      refetch: fetchWorkoutPrograms, 
      fetchUserWorkoutPrograms,
      saveUserWorkoutProgram,
      deleteUserWorkoutProgram,
      createCustomWorkoutProgram,
      fetchUserCustomWorkoutPrograms,
      deleteCustomWorkoutProgram,
      addUserWorkoutProgram,
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