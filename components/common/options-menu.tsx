"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type EntityProps<T> = {
  entity: T;
  onClose: () => void;
};

type OptionsMenuProps<T> = {
  item: T; // just the actual data
  EditComponent: React.ComponentType<EntityProps<T>>;
  DeleteComponent: React.ComponentType<EntityProps<T>>;
};

export function OptionsMenu<T>({
  item,
  EditComponent,
  DeleteComponent,
}: OptionsMenuProps<T>) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <DotsHorizontalIcon className="w-6 h-6 text-grey-300 font-bold" />
      </PopoverTrigger>
      <PopoverContent className="max-w-32 p-0">
        <EditComponent entity={item} onClose={() => setPopoverOpen(false)} />
        <hr />
        <DeleteComponent entity={item} onClose={() => setPopoverOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
