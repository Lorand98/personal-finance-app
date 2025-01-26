import twMerge from "@/tailwind-merge-config";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTransactionDate = (date: string) =>
  moment(date).format("DD MMM YYYY");

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export * from "./recurring-bills";
export * from "./budget";
export * from "./table";
