"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, ReactNode } from "react";

interface ActionOptionsProps {
  editComponent: ReactNode;    // <EditBudget /> or <EditPot />
  deleteComponent: ReactNode;  // <DeleteBudget /> or <DeletePot />
}

export default function ActionOptions({ editComponent, deleteComponent }: ActionOptionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <DotsHorizontalIcon className="w-6 h-6 text-grey-300 font-bold" />
      </PopoverTrigger>
      <PopoverContent className="max-w-32 p-0">
        {editComponent}
        <hr />
        {deleteComponent}
      </PopoverContent>
    </Popover>
  );
}