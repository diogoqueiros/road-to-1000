import { browser } from "$app/environment";

export function setCache<T>(key: string, data: T, ttlInSeconds: number): void {
  if (browser) {
    const expires = Date.now() + ttlInSeconds * 1000;
    localStorage.setItem(key, JSON.stringify({ data, expires }));
  }
}

export function getCache<T>(key: string): T | null {
  if (browser) {
    const cached = localStorage.getItem(key);
  
    if (!cached) return null;
  
    const { data, expires } = JSON.parse(cached) as { data: T; expires: number };
  
    if (Date.now() > expires) {
      localStorage.removeItem(key);
      return null;
    }
  
    return data;
  }

  return null;
}