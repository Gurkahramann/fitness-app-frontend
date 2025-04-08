import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// API URL
// const API_URL = "http://192.168.219.84:5000/api/auth";
// const SPRING_API_URL = "http://192.168.219.84:8080/api/auth";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const springUrl = process.env.EXPO_PUBLIC_SPRING_API;

// Kullanici tipi
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Context tipi
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  register: (formData: RegisterForm) => Promise<{ success: boolean; message?: string }>;
  login: (formData: LoginForm) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

// Kayit ve giris icin form veri tipi
interface RegisterForm {
  email: string;
  password: string;
  name: string;
  gender: "Male" | "Female";
  height: number;
  weight: number;
  age: number;
  activityLevel: string;
  goal?: string;
}

interface LoginForm {
  email: string;
  password: string;
}

// Context olustur
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// **AuthProvider**
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Kullanici bilgisini AsyncStorage'dan yükle
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  // **📌 Kullanici Kayit Olma (Register)**
  const register = async (formData: RegisterForm): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error: any) {
      console.log("🚨 Register error:", error);
      return { success: false, message: "Sunucu hatası" };
    } finally {
      setIsLoading(false);
    }
  };
  

  // **📌 Kullanici Giris Yapma (Login)**
  const login = async (formData: LoginForm): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Login response data:", data);
  
      if (response.ok) {
        await AsyncStorage.setItem("accessToken", data.accessToken);
        await AsyncStorage.setItem("refreshToken", data.refreshToken);
  
        const userInfo = await fetch(`${springUrl}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        });
  
        const userData = await userInfo.json();
  
        if (userInfo.ok) {
          setUser(userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
          return { success: true }; // ✅ başarıyı döndür
        } else {
          return { success: false, message: userData.message || "Kullanıcı bilgisi alınamadı" };
        }
      } else {
        return { success: false, message: data.message || "Giriş başarısız" };
      }
    } catch (error) {
      console.log("🚨 Login error:", error);
      return { success: false, message: "Sunucu hatası" };
    } finally {
      setIsLoading(false);
    }
  };
  

  // **📌 Kullanici cikis Yapma (Logout)**
  const logout = async () => {
    try {
      setIsLoading(true);
      await fetch(`${apiUrl}/logout`, { method: "POST" });
      setUser(null);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
    } catch (error) {
      alert("❌ cikis islemi basarisiz!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
