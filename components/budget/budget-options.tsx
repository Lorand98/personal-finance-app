"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import DeleteBudget from "./delete-budget";
import EditBudget from "./edit-budget";
import { Budget } from "./types";

export default function BudgetOptions(budget: Budget) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <DotsHorizontalIcon className="w-6 h-6 text-grey-300 font-bold" />
      </PopoverTrigger>
      <PopoverContent className="max-w-32 p-0">
        <EditBudget budget={budget} onClose={() => setPopoverOpen(false)} />
        <hr />
        <DeleteBudget budget={budget} onClose={() => setPopoverOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
