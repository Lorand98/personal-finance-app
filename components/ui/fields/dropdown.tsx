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
  name: string;
}

interface DropdownProps extends FieldProps {
  items: DropdownItem[];
  initialSelectedItem: DropdownItem;
  id?: string;
  className?: string;
  onSelect: (item: DropdownItem) => void;
}

const Dropdown = ({
  items,
  initialSelectedItem,
  id,
  label,
  helperText,
  className,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const controlId = useId();
  const comboboxId = useFallbackId(id);

  const handleSelect = (item: DropdownItem) => {
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

  return (
    <FieldWrapper label={label} helperText={helperText} fieldId={comboboxId}>
      <div ref={dropdownRef} className={cn("relative w-full", className)}>
        <div
          id={id}
          role="combobox"
          ref={comboboxRef}
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={controlId}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleComboBoxKeyDown}
          className="input flex justify-between items-center gap-4 cursor-pointer"
        >
          <span>{selectedItem.name}</span>
          <Image src={caretDownIcon} alt="Caret Down Icon" />
        </div>
        {isOpen && (
          <ul
            id={controlId}
            aria-labelledby={id}
            role="listbox"
            className="absolute left-0 bg-white border border-gray-300 rounded-lg mt-2 w-full p-1 text-preset-4 z-10"
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
                  "cursor-pointer px-4 py-2 hover:bg-gray-200 focus:outline-2 border-b border-b-grey-100 last:border-b-0",
                  {
                    "font-bold": selectedItem?.id === item.id,
                  }
                )}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </FieldWrapper>
  );
};

export default Dropdown;
