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
    console.log('[authFetch] renewTokenIfNeeded - retrieved accessToken:', accessToken ? accessToken.substring(0, 10) + '...' : null);
    if (!accessToken) {
      console.log('[authFetch] renewTokenIfNeeded - no accessToken found in storage');
      
    } else {
      console.log('[authFetch] renewTokenIfNeeded - accessToken found in storage, checking expiration');
      
    }
    if (!accessToken || isTokenExpired(accessToken)) {
      if (accessToken && isTokenExpired(accessToken)) {
        console.log('[authFetch] renewTokenIfNeeded - accessToken expired, attempting to refresh');
      }
      if (isTokenExpired(accessToken || '')) {
      }
      if (isRefreshing && refreshPromise) {
        console.log('[authFetch] renewTokenIfNeeded - refresh already in progress, awaiting existing promise');
        return refreshPromise;
      }
      isRefreshing = true;
      refreshPromise = (async () => {
        const refreshToken = await getRefreshToken();
        console.log('[authFetch] renewTokenIfNeeded - retrieved refreshToken:', refreshToken ? refreshToken.substring(0, 10) + '...' : null);
        if (!refreshToken) {
          console.warn('[authFetch] renewTokenIfNeeded - no refreshToken found, forcing logout');
          isRefreshing = false;
          refreshPromise = null;
          return null;
        }
        const res = await fetch(`${apiUrl}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
        console.log('[authFetch] renewTokenIfNeeded - refresh token response status:', res.status);
        if (res.status === 403) {
          await removeTokens();
          console.warn('[authFetch] renewTokenIfNeeded - refresh token invalid, tokens removed and user must re-login');
          if (onForceLogout) onForceLogout();
          isRefreshing = false;
          refreshPromise = null;
          return null;
        }
        if (!res.ok) {
          console.error('[authFetch] renewTokenIfNeeded - refresh token request failed');
          isRefreshing = false;
          refreshPromise = null;
          return null;
        }
        const data = await res.json();
        accessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        if (accessToken) {
          console.log('[authFetch] renewTokenIfNeeded - new accessToken received, saving to storage');
          
          await saveTokens(accessToken, newRefreshToken || refreshToken);
        } else {
          console.error('[authFetch] renewTokenIfNeeded - accessToken missing in response');
          
        }
        isRefreshing = false;
        refreshPromise = null;
        console.log('[authFetch] renewTokenIfNeeded - refresh flow completed');
        return accessToken;
      })();
      return refreshPromise;
    }
    console.log('[authFetch] renewTokenIfNeeded - existing accessToken is valid');
    return accessToken;
  };

export const authFetch = async (url: string, options: any = {}) => {
  
  const token = await renewTokenIfNeeded();
  console.log('[authFetch] authFetch - token used for request:', token ? token.substring(0, 10) + '...' : null);

  if (!token) {
    console.warn('[authFetch] Token mevcut değil, authFetch isteği atlanıyor:', url);
    // Bu hatayı atmadan geri dön, çünkü login yapılmamış olabilir (ilk açılışta normaldir)
    return { ok: false, status: 401, json: async () => ({ message: "Unauthorized" }) };
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  
  try {
    const response = await fetch(url, { ...options, headers });
    
    return response;
  } catch (err) {
     console.error('[authFetch] fetch sırasında hata oluştu:', err);
    throw err;
  }
}
