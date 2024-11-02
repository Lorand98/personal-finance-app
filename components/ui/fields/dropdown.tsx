"use client";

import useFallbackId from "@/hooks/use-fallback-id";
import { cn } from "@/lib/utils";
import caretDownIcon from "@/public/icon-caret-down.svg";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import FieldWrapper from "./field-wrapper";
import { FieldProps } from "./types";

export interface DropdownItem {
  id: string;
  label: string;
}

interface DropdownProps<T extends DropdownItem> extends FieldProps {
  items: readonly T[];
  initialSelectedItem: T;
  id?: string;
  className?: string;
  onSelect: (item: T) => void;
  MobileSvgIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const Dropdown = <T extends DropdownItem>({
  items,
  initialSelectedItem,
  id,
  label,
  helperText,
  className,
  onSelect,
  MobileSvgIcon,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const controlId = useId();
  const comboboxId = useFallbackId(id);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const listItem = document.getElementById(
        `dropdown-item-${highlightedIndex}`
      );
      listItem?.focus();
    }
  }, [highlightedIndex, isOpen]);

  const focusComboBox = () => comboboxRef.current?.focus();

  const handleComboBoxKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  const handleDropdownListKeyDown = (event: React.KeyboardEvent) => {
    const preventDefaultKeys = ["ArrowDown", "ArrowUp", "Enter", " "];
    if (preventDefaultKeys.includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((prevIndex) => {
          if (prevIndex === null) return 0;
          return (prevIndex + 1) % items.length;
        });
        break;
      case "ArrowUp":
        setHighlightedIndex((prevIndex) => {
          if (prevIndex === null) return items.length - 1;
          return (prevIndex - 1 + items.length) % items.length;
        });
        break;
      case "Enter":
      case " ":
        if (highlightedIndex !== null) {
          handleSelect(items[highlightedIndex]);
          focusComboBox();
        }
        break;
      case "Escape":
        setIsOpen(false);
        focusComboBox();
        break;
      default:
        break;
    }
  };

  const comboboxProps = {
    id: comboboxId,
    role: "combobox",
    ref: comboboxRef,
    tabIndex: 0,
    "aria-haspopup": "listbox" as const,
    "aria-expanded": isOpen,
    "aria-controls": controlId,
    onClick: () => setIsOpen(!isOpen),
    onKeyDown: handleComboBoxKeyDown,
  };

  const caretDown = <Image src={caretDownIcon} alt="Caret Down Icon" />;

  return (
    <FieldWrapper
      label={label}
      helperText={helperText}
      fieldId={comboboxId}
      labelProps={{ className: "hidden md:block" }}
    >
      <div
        ref={dropdownRef}
        className={cn("relative w-full h-full", className)}
      >
        <div
          {...comboboxProps}
          className="input hidden md:flex h-full justify-between items-center gap-4 cursor-pointer"
        >
          <span>{selectedItem.label}</span>
          {caretDown}
        </div>
        {/* mobile dropdown combobox */}
        <div
          {...comboboxProps}
          aria-label={label}
          className="md:hidden flex items-center h-full"
        >
          {MobileSvgIcon ? <MobileSvgIcon /> : caretDown}
        </div>
        {isOpen && (
          <ul
            id={controlId}
            aria-labelledby={id}
            role="listbox"
            className="absolute right-0 md:left-0 bg-white border border-gray-300 rounded-lg mt-2 w-auto p-1 text-preset-4 z-10"
            onKeyDown={handleDropdownListKeyDown}
          >
            {items.map((item, index) => (
              <li
                key={item.id}
                id={`dropdown-item-${index}`}
                role="option"
                tabIndex={-1}
                aria-selected={selectedItem?.id === item.id}
                onClick={() => handleSelect(item)}
                className={cn(
                  "cursor-pointer px-4 py-2 hover:bg-grey-100 focus:outline-2 border-b border-b-grey-100 last:border-b-0",
                  {
                    "font-bold": selectedItem?.id === item.id,
                  }
                )}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </FieldWrapper>
  );
};

export default Dropdown;
