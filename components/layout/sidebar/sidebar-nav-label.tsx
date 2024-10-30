"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

const SidebarNavLabel = ({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: ReactNode;
}) => (
  <AnimatePresence initial={false}>
    {isVisible && (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5 }}
        className={"hidden sm:block text-nowrap font-bold overflow-hidden "}
      >
        {children}
      </motion.span>
    )}
  </AnimatePresence>
);

export default SidebarNavLabel;
