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
  goal: string;
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
      setIsLoading(true);
      const token = await getAccessToken();
      console.log('[AuthContext] loadUser - retrieved accessToken:', token ? token.substring(0, 10) + '...' : null);
      if (!token) {
        console.log('[AuthContext] loadUser - no accessToken found, skipping user fetch');
        setIsLoading(false);
        return;
      }
      try {
        console.log('[AuthContext] loadUser - fetching user info with existing token');
        const response = await authFetch(`${springUrl}/auth/me`, { method: "GET" });
        const userData = await response.json();
        if (response.ok) {
          console.log('[AuthContext] loadUser - user info fetched successfully', userData);
          setUser(userData);
        }
      } catch (err) {
        console.error('[AuthContext] loadUser - error while fetching user info', err);
      } finally {
        setIsLoading(false);
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
      return { success: false, message: "Sunucu hatası" };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (formData: LoginForm): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      console.log('[AuthContext] login - attempt with email:', formData.email);
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('[AuthContext] login - response status:', response.status, 'data:', data);
      
      if (response.ok) {
        console.log('[AuthContext] login - login successful, saving tokens');
        await saveTokens(data.accessToken, data.refreshToken);

        console.log('[AuthContext] login - fetching user info after login');
        const userInfo = await authFetch(`${springUrl}/auth/me`, {
          method: "GET",
        });

        const userData = await userInfo.json();

        if (userInfo.ok) {
          console.log('[AuthContext] login - user info fetched successfully', userData);
          setUser(userData);
          return { success: true };
        }
      }
      
      // For any kind of authentication failure, return a generic message
      console.warn('[AuthContext] login - authentication failed');
      return { 
        success: false, 
        message: "Incorrect email or password" 
      };
      
    } catch (error) {
      console.error('[AuthContext] login - error:', error);
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
      console.log('[AuthContext] logout - logging out user');
      const refreshToken = await getRefreshToken();
      console.log('[AuthContext] logout - refreshToken:', refreshToken ? refreshToken.substring(0, 10) + '...' : null);
      await authFetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      setUser(null);
      await removeTokens();
      console.log('[AuthContext] logout - tokens removed, user set to null');
    } catch (error) {
      console.error('[AuthContext] logout - error during logout', error);
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

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
