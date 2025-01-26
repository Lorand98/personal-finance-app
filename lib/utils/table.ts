import { SortingState } from "@tanstack/react-table";
import { SORTING_OPTIONS } from "../constants";

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
