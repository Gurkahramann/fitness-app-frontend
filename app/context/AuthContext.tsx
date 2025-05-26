import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getAccessToken, getRefreshToken, saveTokens, removeTokens } from "../utils/tokenStorage";
import { authFetch } from "../utils/authFetch";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const springUrl = process.env.EXPO_PUBLIC_SPRING_API;

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  height: number;
  weight: number;
  gender: "Male" | "Female";
  birthDate: string;
  activityLevel: string;
  fitnessGoal: string;
  age: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  register: (formData: RegisterForm) => Promise<{ success: boolean; message?: string }>;
  login: (formData: LoginForm) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
}

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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = await getAccessToken();
      if (!token) return;

      try {
        const response = await authFetch(`${springUrl}/auth/me`, { method: "GET" });
        const userData = await response.json();
        if (response.ok) {
          setUser(userData);
        }
      } catch (err) {
        console.log("🚫 Kullanıcı bilgisi yüklenemedi:", err);
      }
    };

    loadUser();
  }, []);

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

  const login = async (formData: LoginForm): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        await saveTokens(data.accessToken, data.refreshToken);

        const userInfo = await authFetch(`${springUrl}/auth/me`, {
          method: "GET",
        });

        const userData = await userInfo.json();

        if (userInfo.ok) {
          setUser(userData);
          return { success: true };
        }
      }
      
      // For any kind of authentication failure, return a generic message
      return { 
        success: false, 
        message: "Incorrect email or password" 
      };
      
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: "An error occurred. Please try again." 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const refreshToken = await getRefreshToken();
      await authFetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      setUser(null);
      await removeTokens();
    } catch (error) {
      alert("❌ Çıkış işlemi başarısız!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
