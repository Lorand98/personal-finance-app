import twMerge from "@/tailwind-merge-config";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { SORTING_OPTIONS } from "./constants";
import { SortingState } from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTransactionDate = (date: string) =>
  moment(date).format("DD MMM YYYY");

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const isRecurringBillPaid = (date: string) => {
  const dateDay = new Date(date).getDate();
  const today = new Date().getDate();
  return dateDay < today;
};

export const isRecurringBillDueSoon = (date: string) => {
  const dateDay = new Date(date).getDate();
  const today = new Date().getDate();
  return dateDay < today + 5 && dateDay >= today;
};

export const mapSortingOptionsToTanstack = (
  sort: (typeof SORTING_OPTIONS)[number]["id"] | string,
  defaultSort: SortingState
) => {
  switch (sort) {
    case "latest":
      return [{ id: "date", desc: true }];
    case "oldest":
      return [{ id: "date", desc: false }];
    case "a_to_z":
      return [{ id: "name", desc: false }];
    case "z_to_a":
      return [{ id: "name", desc: true }];
    case "highest":
      return [{ id: "amount", desc: true }];
    case "lowest":
      return [{ id: "amount", desc: false }];
    default:
      return defaultSort;
  }
};

export const mobileVisibility = <
  T extends { meta?: { hideOnMobile?: boolean }; accessorKey?: string }
>(
  columns: T[],
  isMobile: boolean
) => {
  const visibility: Record<string, boolean> = {};
  columns.forEach((col) => {
    if (col.meta?.hideOnMobile && col.accessorKey) {
      visibility[col.accessorKey] = !isMobile;
    }
  });
  return visibility;
};
