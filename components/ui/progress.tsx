"use client";

import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progressBarColor?: string;
  changePercent?: number;
  variant?: "primary" | "secondary";
  valuePercent: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      valuePercent = 0,
      changePercent = 0,
      progressBarColor = "#000000",
      variant = "primary",
      ...props
    },
    ref
  ) => {
    const increasePercent = changePercent > 0 ? changePercent : 0;
    const decreasePercent = changePercent < 0 ? Math.abs(changePercent) : 0;
    const remainedPercent = valuePercent - decreasePercent;

    return (
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
                  transform: `translateX(-${100 - valuePercent}%)`,
                  backgroundColor: progressBarColor,
                }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Base Progress Bar */}
            <ProgressPrimitive.Indicator
              className="h-full flex-1 transition-all"
              style={{
                width: `${
                  decreasePercent > 0 ? remainedPercent : valuePercent
                }%`,
                backgroundColor: progressBarColor,
              }}
            />

            {/* Addition Bar (Green) */}
            {increasePercent > 0 && (
              <ProgressPrimitive.Indicator
                className="absolute top-0 h-full bg-green transition-all"
                style={{
                  width: `${increasePercent}%`,
                  left: `${valuePercent}%`,
                }}
              />
            )}

            {/* Withdrawal Bar (Red) */}
            {decreasePercent > 0 && (
              <ProgressPrimitive.Indicator
                className="absolute top-0 h-full bg-red transition-all"
                style={{
                  width: `${decreasePercent}%`,
                  left: `${remainedPercent}%`,
                }}
              />
            )}
          </>
        )}
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
