import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPositionColor(position: string) {
  switch (position) {
    case "MANAGER":
      return "bg-purple-100 text-purple-700 hover:bg-purple-100/80 border-purple-200";
    case "ADMIN":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100/80 border-gray-200";
  }
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
