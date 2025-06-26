import React, { createContext, useContext, useEffect, useState } from "react";
import { calculateCalorieNeeds } from "../utils/caloritesUtils";
import { useAuth } from "../../hooks/useAuth";
import { authFetch } from "../utils/authFetch";

interface CalorieContextType {
  calorieGoal: number | null;
  loading: boolean;
}

const CalorieContext = createContext<CalorieContextType | undefined>(undefined);

export const CalorieProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [calorieGoal, setCalorieGoal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${process.env.EXPO_PUBLIC_SPRING_API}/auth/me`);
      const data = await res.json();
  
      console.log("Backend'den dönen veri:", data);
  
      if (!res.ok) throw new Error(data.message || "Kullanıcı verisi alınamadı");
  
      const calorie = calculateCalorieNeeds(
        data.gender,
        data.weight,
        data.height,
        data.age,
        data.activityLevel,
        data.goal
      );
  
      setCalorieGoal(calorie);
    } catch (error) {
      console.error("🔥 Kalori verisi alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("✅ Kullanıcı bulundu, fetch başlatılıyor:", user);
      fetchUserInfo();
    } else {
      console.log("⏭️ Kullanıcı yok, fetchUserInfo atlanıyor.");
      setLoading(false);
    }
  }, [user]);

  return (
    <CalorieContext.Provider value={{ calorieGoal, loading }}>
      {children}
    </CalorieContext.Provider>
  );
};

export const useCalorie = () => {
  const context = useContext(CalorieContext);
  if (!context) throw new Error("useCalorie must be used within a CalorieProvider");
  return context;
};
