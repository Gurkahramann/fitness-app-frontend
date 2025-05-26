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
    if (!user || !user.id) {
      console.error("⛔ Kullanıcı ID'si tanımsız. fetchUserInfo çalıştırılmadı.");
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch(`${process.env.EXPO_PUBLIC_SPRING_API}/auth/userinfo`);
      const data = await res.json();

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
    if (user?.id) {
      console.log("✅ Kullanıcı ID bulundu, fetch başlatılıyor:", user.id);
      fetchUserInfo();
    } else {
      console.log("⏭️ Kullanıcı ID yok, fetchUserInfo atlanıyor.");
      setLoading(false);
    }
  }, [user?.id]);

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
