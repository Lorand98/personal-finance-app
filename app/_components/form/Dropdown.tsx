'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import Image from 'next/image';
import FormComponentWrapper from './FormComponentWrapper';
import caretDownIcon from '@/public/icon-caret-down.svg';

interface DropdownItem {
    id: string;
    name: string;
}

interface DropdownProps extends Omit<React.ComponentProps<typeof FormComponentWrapper>, 'renderFormComponent'> {
    items: DropdownItem[];
    selectedId?: string;
    onSelect?: (id: string) => void;
}

const Dropdown = ({
    items,
    selectedId,
    onSelect,
    ...props
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
        selectedId ? items.find((item) => item.id === selectedId) : undefined
    );
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const controlId = useId();

    const handleSelect = (item: DropdownItem) => {
        setSelectedItem(item);
        onSelect && onSelect(item.id);
        setIsOpen(false);
    };

    const dropdownRef = useRef<HTMLDivElement>(null);
    const comboboxRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (selectedId) {
            const newSelectedItem = items.find((item) => item.id === selectedId);
            newSelectedItem && setSelectedItem(newSelectedItem);
        } else {
            setSelectedItem(undefined);
        }
    }, [selectedId, items]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const listItem = document.getElementById(`dropdown-item-${highlightedIndex}`);
            listItem?.focus();
        }
    }, [highlightedIndex, isOpen]);

    const focusComboBox = () => comboboxRef.current?.focus();

    const handleComboBoxKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen((prevIsOpen) => !prevIsOpen);
        }
    }

    const handleDropdownListKeyDown = (event: React.KeyboardEvent) => {
        const preventDefaultKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
        if (preventDefaultKeys.includes(event.key)) {
            event.preventDefault();
        }
    
        switch (event.key) {
            case 'ArrowDown':
                setHighlightedIndex((prevIndex) => {
                    if (prevIndex === null) return 0;
                    return (prevIndex + 1) % items.length;
                });
                break;
            case 'ArrowUp':
                setHighlightedIndex((prevIndex) => {
                    if (prevIndex === null) return items.length - 1;
                    return (prevIndex - 1 + items.length) % items.length;
                });
                break;
            case 'Enter':
            case ' ':
                if (highlightedIndex !== null) {
                    handleSelect(items[highlightedIndex]);
                    focusComboBox();
                }
                break;
            case 'Escape':
                setIsOpen(false);
                focusComboBox();
                break;
            default:
                break;
        }
    };

    return (
        <FormComponentWrapper
            {...props}
            renderFormComponent={(className, id) => (
                <div ref={dropdownRef} className={`${className} w-full`}>
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
                        className={`flex justify-between items-center gap-4 cursor-pointer h-full`}
                    >
                        <span>{selectedItem ? selectedItem.name : 'Select an option'}</span>
                        <Image src={caretDownIcon} alt="caret down icon" />
                    </div>
                    {isOpen && (
                        <ul
                            id={controlId}
                            aria-labelledby={id}
                            role="listbox"
                            className="absolute left-0 bg-white border border-gray-300 rounded-lg mt-2 w-full p-1"
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
                                    className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${selectedItem?.id === item.id ? 'font-bold' : ''} focus:outline-2 border-b-[1px] border-b-grey-100 last:border-b-0`}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul >
                    )}
                </div >
            )}
        />
    );
};

export default Dropdown;