import twMerge from "@/tailwind-merge-config";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTransactionDate = (date: string) =>
  moment(date).format("DD MMM YYYY");
