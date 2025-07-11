import { getAccessToken } from "../utils/tokenStorage";

const AI_API = process.env.EXPO_PUBLIC_AI_REQUEST_API 
const springAPI = process.env.EXPO_PUBLIC_SPRING_API

// Fotoğrafı FastAPI'ye gönderip analiz sonucu döndürür
export async function detectWithGrams(imageUri: string) {
  const formData = new FormData();
  // Expo'da imageUri genellikle file:// ile başlar, filename ve type eklenmeli
  const filename = imageUri.split('/').pop() || 'photo.jpg';
  const match = /\.([a-zA-Z0-9]+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;
  // @ts-ignore
  formData.append('file', { uri: imageUri, name: filename, type });



  try {
    const response = await fetch(`${AI_API}detect_with_grams/`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        // 'Content-Type' otomatik ayarlanmalı, elle vermeyin!
      },
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error?.detail?.[0]?.msg || 'Sunucu hatası');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

// Analiz edilen yemeği backend'e kaydeder
export async function saveFoodLog(foodLog: any) {
  const userId = foodLog.userId;
  if (!userId) {
    throw new Error('Kullanıcı ID geçersiz!');
  }
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Giriş yapmanız gerekiyor!');
  }
  try {
    // Log the exact payload being sent
    const response = await fetch(`${springAPI}/food-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(foodLog),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error?.message || 'Kayıt hatası');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('[foodLogService] saveFoodLog: Network error:', err);
    throw err;
  }
} 