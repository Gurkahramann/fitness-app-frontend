// utils/authFetch.ts
import { getAccessToken, getRefreshToken, saveTokens,removeTokens } from "./tokenStorage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };
  
  export const renewTokenIfNeeded = async (onForceLogout?: () => void): Promise<string | null> => {
    let accessToken = await getAccessToken();
    if (!accessToken || isTokenExpired(accessToken)) {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) return null;
  
      const res = await fetch(`${apiUrl}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (res.status === 403) {
        await removeTokens();
        if (onForceLogout) onForceLogout();
        return null;
      }
  
      if (!res.ok) return null;
  
      const data = await res.json();
      accessToken = data.accessToken;
      if (accessToken && refreshToken) {
        await saveTokens(accessToken, refreshToken);
      }
    }
    return accessToken;
  };

export const authFetch = async (url: string, options: any = {}) => {
  const token = await renewTokenIfNeeded()

  if (!token) {
    console.warn("Token mevcut değil, authFetch isteği atlanıyor:", url)
    // Bu hatayı atmadan geri dön, çünkü login yapılmamış olabilir (ilk açılışta normaldir)
    return { ok: false, status: 401, json: async () => ({ message: "Unauthorized" }) }
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  return fetch(url, { ...options, headers })
}
