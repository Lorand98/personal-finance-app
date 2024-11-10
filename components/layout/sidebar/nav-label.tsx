"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

const SidebarNavLabel = ({
  isVisible,
  children,
  className,
}: {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
}) => (
  <AnimatePresence initial={false}>
    {isVisible && (
      <motion.span
        initial={{ opacity: 0, maxWidth: 0 }}
        animate={{ opacity: 1, maxWidth: "100%" }}
        exit={{ opacity: 0, maxWidth: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5 }}
        className={cn(
          "hidden sm:block text-nowrap font-bold overflow-hidden",
          className
        )}
      >
        {children}
      </motion.span>
    )}
  </AnimatePresence>
);

export default SidebarNavLabel;
