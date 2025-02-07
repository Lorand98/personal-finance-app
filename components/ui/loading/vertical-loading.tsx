"use client";

import { motion } from "framer-motion";

const LOADING_BARS = Array.from({ length: 3 }, (_, i) => ({
  delay: i * 0.2,
}));

const ANIMATION_CONFIG = {
  animate: {
    height: ["2rem", "4rem", "2rem"],
  },
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const BAR_STYLES = "w-2 h-8 bg-grey-900 rounded";

export default function VerticalLoading() {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className="flex items-center justify-center h-screen gap-2"
    >
      {LOADING_BARS.map(({ delay }, index) => (
        <motion.div
          key={index}
          className={BAR_STYLES}
          {...ANIMATION_CONFIG}
          transition={{
            ...ANIMATION_CONFIG.transition,
            delay,
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
