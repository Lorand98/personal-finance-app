"use client";

import useFallbackId from "@/hooks/use-fallback-id";
import { cn } from "@/lib/utils";
import caretDownIcon from "@/public/icon-caret-down.svg";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import DropdownList from "./dropdown-list";

export interface DropdownItem {
  id: string;
  label: string;
}

interface DropdownProps<T extends DropdownItem> {
  items: readonly T[];
  initialSelectedItem: T;
  id?: string;
  className?: string;
  onSelect: (item: T) => void;
  MobileSvgIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  dropdownLabelClassName?: string;
}

const TableDropdown = <T extends DropdownItem>({
  items,
  initialSelectedItem,
  id,
  className,
  onSelect,
  MobileSvgIcon,
  label,
  dropdownLabelClassName,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

  const controlId = useId();
  const comboboxId = useFallbackId(id);

  const combobxRefDesktop = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (
    event: React.MouseEvent | React.KeyboardEvent,
    item: T
  ) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);

    if (event.type === "keydown") {
      combobxRefDesktop.current?.focus();
    }
  };

  // Outside click handler
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setSelectedItem(initialSelectedItem);
  }, [initialSelectedItem]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const comboboxProps = {
    id: comboboxId,
    role: "combobox",
    tabIndex: 0,
    "aria-haspopup": "listbox" as const,
    "aria-expanded": isOpen,
    "aria-controls": controlId,
    onClick: () => setIsOpen((prev) => !prev),
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    },
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      combobxRefDesktop.current?.focus();
    }
    if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  const caretDown = <Image src={caretDownIcon} alt="Caret Down Icon" />;

  return (
    <div
      ref={dropdownRef}
      className={cn("relative flex items-center h-full", className)}
    >
      <label
        htmlFor={comboboxId}
        className="hidden md:block mr-2 whitespace-nowrap"
      >
        {label}
      </label>
      <div className="relative flex-shrink-0">
        {/* Desktop dropdown combobox */}
        <div
          {...comboboxProps}
          ref={combobxRefDesktop}
          className="input hidden md:flex items-center gap-2 cursor-pointer"
        >
          <div
            className={cn(
              "flex-shrink-0 overflow-hidden",
              dropdownLabelClassName
            )}
          >
            <span>{selectedItem.label}</span>
          </div>
          {caretDown}
        </div>
        {/* Mobile dropdown combobox */}
        <div {...comboboxProps} className="md:hidden flex items-center h-full">
          {MobileSvgIcon ? <MobileSvgIcon /> : caretDown}
        </div>
        {isOpen && (
          <DropdownList
            items={items}
            selectedItem={selectedItem}
            controlId={controlId}
            onSelect={handleSelect}
            onKeyDown={handleListKeyDown}
          />
        )}
      </div>
    </div>
  );
};

export default TableDropdown;
