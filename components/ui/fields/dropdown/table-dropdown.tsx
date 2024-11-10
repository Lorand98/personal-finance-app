"use client";

import { measureTextWidth } from "@/lib/utils";
import useFallbackId from "@/hooks/use-fallback-id";
import { cn } from "@/lib/utils";
import caretDownIcon from "@/public/icon-caret-down.svg";
import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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
  MobileSvgIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  label: string;
}

const CARET_DOWN_ICON_SIZE = 16;

const TableDropdown = <T extends DropdownItem>({
  items,
  initialSelectedItem,
  id,
  className,
  onSelect,
  MobileSvgIcon,
  label,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  const controlId = useId();
  const comboboxId = useFallbackId(id);

  const focusComboBox = () => comboboxRef.current?.focus();

  const handleSelect = (
    event: React.MouseEvent | React.KeyboardEvent,
    item: T
  ) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);

    if (event.type === "keydown") {
      focusComboBox();
    }
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

  const handleComboBoxKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prevIsOpen) => !prevIsOpen);
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

  useLayoutEffect(() => {
    if (comboboxRef.current) {
      // Get the computed font style of the combobox
      const computedStyle = window.getComputedStyle(comboboxRef.current);
      const font = computedStyle.font;

      // Find the longest label
      const longestLabel = items.reduce(
        (longest, item) =>
          item.label.length > longest.length ? item.label : longest,
        ""
      );

      // Measure the width of the longest label
      const longestLabelWidth = measureTextWidth(longestLabel, font);

      // Get padding and icon width from styles
      const paddingLeft = parseFloat(computedStyle.paddingLeft || "0");
      const paddingRight = parseFloat(computedStyle.paddingRight || "0");
      const borderLeftWidth = parseFloat(computedStyle.borderLeftWidth || "0");
      const borderRightWidth = parseFloat(
        computedStyle.borderRightWidth || "0"
      );

      const totalHorizontalPadding =
        paddingLeft + paddingRight + borderLeftWidth + borderRightWidth;
      const iconWidth = CARET_DOWN_ICON_SIZE;

      const totalWidth = longestLabelWidth + totalHorizontalPadding + iconWidth;

      setDropdownWidth(totalWidth);
    }
  }, [items]);

  return (
    <div ref={dropdownRef} className={cn("relative h-full", className)}>
      <div className="flex items-center text-nowrap h-full">
        <label htmlFor={comboboxId} className="mr-2">
          {label}
        </label>
        <div
          {...comboboxProps}
          className="input hidden md:flex justify-between items-center gap-2 cursor-pointer"
          style={{ width: dropdownWidth }}
        >
          <span>{selectedItem.label}</span>
          {caretDown}
        </div>
        {/* Mobile dropdown combobox */}
        <div {...comboboxProps} className="md:hidden flex items-center h-full">
          {MobileSvgIcon ? <MobileSvgIcon /> : caretDown}
        </div>
      </div>
      {isOpen && (
        <DropdownList
          items={items}
          selectedItem={selectedItem}
          controlId={controlId}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default TableDropdown;
