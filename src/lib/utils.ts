import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeWords(str) {
  return str.replace(/\b([a-z])/g, (match, p1) => p1.toUpperCase());
}