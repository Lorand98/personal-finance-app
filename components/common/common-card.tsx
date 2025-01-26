import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function CommonCard({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("bg-white w-full p-4 sm:p-6 md:p-8 rounded-xl space-y-4", className)}>
      {children}
    </div>
  );
}
