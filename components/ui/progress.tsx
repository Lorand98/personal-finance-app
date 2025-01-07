"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progressBarColor: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, progressBarColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-8 w-full overflow-hidden rounded-md bg-beige-100 p-1",
      className
    )}
    {...props}
  >
    <div className="h-full w-full overflow-hidden rounded-sm">
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 transition-all rounded-sm"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: progressBarColor,
        }}
      />
    </div>
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
