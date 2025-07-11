import React, { createContext, useContext, useState, ReactNode } from "react";
import { detectWithGrams, saveFoodLog } from "../utils/foodLogService";
import { useAuth } from "./AuthContext";

export type FoodLogItem = {
  food_name: string;
  estimated_grams: number;
  total_calories: number;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
};

interface FoodLogContextType {
  addFoodLogWithPhoto: (imageUri: string) => Promise<void>;
  loading: boolean;
  success: boolean;
  error: string | null;
  reset: () => void;
  logs: any[];
  totalCalories: number;
  fetchFoodLogSummary: () => Promise<void>;
}

const FoodLogContext = createContext<FoodLogContextType | undefined>(undefined);

export const FoodLogProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const { user } = useAuth();

  const addFoodLogWithPhoto = async (imageUri: string) => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      const userId = user?.id;
      if (!userId) {
        throw new Error("Kullanıcı ID geçersiz!");
      }
      const detectedFoods = await detectWithGrams(imageUri);
      if (!Array.isArray(detectedFoods) || detectedFoods.length === 0) {
        throw new Error("Yemek tespit edilemedi.");
      }
      for (const food of detectedFoods) {
        const camelFood = {
          foodName: food.food_name,
          estimatedGrams: food.estimated_grams,
          totalCalories: food.total_calories,
          caloriesPer100g: food.calories_per_100g,
          proteinPer100g: food.protein_per_100g,
          carbsPer100g: food.carbs_per_100g,
          fatPer100g: food.fat_per_100g,
          userId: userId,
          createdAt: new Date().toISOString()
        };
        await saveFoodLog(camelFood);
      }
      setSuccess(true);
      await fetchFoodLogSummary();
    } catch (e: any) {
      setError(e?.message || "Bir hata oluştu");
    }
    setLoading(false);
  };

  const fetchFoodLogSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = user?.id;
      if (!userId) throw new Error("Kullanıcı ID geçersiz!");
      const springAPI = process.env.EXPO_PUBLIC_SPRING_API;
      const token = await import("../utils/tokenStorage").then(m => m.getAccessToken());
      const res = await fetch(`${springAPI}/food-logs/user/${userId}/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Yemekler alınamadı');
      const data = await res.json();
      setLogs(data.logs || []);
      setTotalCalories(data.totalCalories || 0);
    } catch (e: any) {
      setError(e?.message || 'Bir hata oluştu');
    }
    setLoading(false);
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <FoodLogContext.Provider value={{ addFoodLogWithPhoto, loading, success, error, reset, logs, totalCalories, fetchFoodLogSummary }}>
      {children}
    </FoodLogContext.Provider>
  );
};

export const useFoodLog = () => {
  const ctx = useContext(FoodLogContext);
  if (!ctx) throw new Error("useFoodLog must be used within a FoodLogProvider");
  return ctx;
}; 