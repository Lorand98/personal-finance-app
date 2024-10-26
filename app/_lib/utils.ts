import { clsx, type ClassValue } from "clsx";
import twMerge from "@/tailwind-merge-config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
