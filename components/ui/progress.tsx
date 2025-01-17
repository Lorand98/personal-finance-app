"use client";

import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progressBarColor: string;
  variant?: "primary" | "secondary";
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, value, progressBarColor, variant = "primary", ...props },
    ref
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-md bg-beige-100",
        className
      )}
      {...props}
    >
      {variant === "primary" ? (
        <div className="absolute inset-0 p-1">
          <div className="h-full w-full overflow-hidden rounded-sm">
            <ProgressPrimitive.Indicator
              className="h-full w-full flex-1 transition-all rounded-sm"
              style={{
                transform: `translateX(-${100 - (value || 0)}%)`,
                backgroundColor: progressBarColor,
              }}
            />
          </div>
        </div>
      ) : (
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`,
            backgroundColor: progressBarColor,
          }}
        />
      )}
    </ProgressPrimitive.Root>
  )
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

