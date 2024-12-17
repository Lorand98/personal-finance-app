"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DropdownItem } from "./table-dropdown";

interface DropdownListProps<T extends DropdownItem> {
  items: readonly T[];
  selectedItem: T;
  controlId: string;
  onSelect: (event: React.MouseEvent | React.KeyboardEvent, item: T) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

//TODO make dropdown list solution for mobile (long list of items overflow the screen)

const DropdownList = <T extends DropdownItem>({
  items,
  selectedItem,
  controlId,
  onSelect,
  onKeyDown,
}: DropdownListProps<T>) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (highlightedIndex !== null) {
      const listItem = document.getElementById(
        `dropdown-item-${highlightedIndex}`
      );
      listItem?.focus();
    }
  }, [highlightedIndex]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
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
          onSelect(event, items[highlightedIndex]);
        }
        break;
      default:
        break;
    }

    onKeyDown(event);
  };

  return (
    <ul
      id={controlId}
      role="listbox"
      className="absolute right-0 md:left-0 bg-white shadow-lg border border-gray-300 rounded-lg mt-2 p-1 text-preset-4 z-10"
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          id={`dropdown-item-${index}`}
          role="option"
          tabIndex={-1}
          aria-selected={selectedItem?.id === item.id}
          onClick={(event) => onSelect(event, item)}
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
  );
};

export default DropdownList;
