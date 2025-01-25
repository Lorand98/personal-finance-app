import twMerge from "@/tailwind-merge-config";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { SORTING_OPTIONS } from "./constants";

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
) => {
  let sortOption = { id: "date", desc: false };
  switch (sort) {
    case "latest":
      sortOption = { id: "date", desc: true };
      break;
    case "oldest":
      sortOption = { id: "date", desc: false };
      break;
    case "a_to_z":
      sortOption = { id: "name", desc: false };
      break;
    case "z_to_a":
      sortOption = { id: "name", desc: true };
      break;
    case "highest":
      sortOption = { id: "amount", desc: true };
      break;
    case "lowest":
      sortOption = { id: "amount", desc: false };
      break;
    default:
      break;
  }
  return [sortOption];
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
