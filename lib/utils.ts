import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getYoutubeVideoId(url:string) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v");
}

export const storeArray = (key:string, array:Array<any>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(array));
  }
};

export const getArray = (key:string) => {
  if (typeof window !== 'undefined') {
    const storedArray = localStorage.getItem(key);
    return storedArray ? JSON.parse(storedArray) : [];
  }
  return [];
};

export function generateRandomId(prefix = 'task-lofi-id', length = 15) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars[randomIndex];
  }
  return `${prefix}-${randomString}`;
}