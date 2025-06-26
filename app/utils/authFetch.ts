// utils/authFetch.ts
import { getAccessToken, getRefreshToken, saveTokens,removeTokens } from "./tokenStorage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

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
      if (isRefreshing && refreshPromise) {
        return refreshPromise;
      }
      isRefreshing = true;
      refreshPromise = (async () => {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          isRefreshing = false;
          refreshPromise = null;
          return null;
        }
        const res = await fetch(`${apiUrl}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
        if (res.status === 403) {
          await removeTokens();
          if (onForceLogout) onForceLogout();
          isRefreshing = false;
          refreshPromise = null;
          return null;
        }
        if (!res.ok) {
          isRefreshing = false;
          refreshPromise = null;
          return null;
        }
        const data = await res.json();
        accessToken = data.accessToken;
        if (accessToken && refreshToken) {
          await saveTokens(accessToken, refreshToken);
        }
        isRefreshing = false;
        refreshPromise = null;
        return accessToken;
      })();
      return refreshPromise;
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
