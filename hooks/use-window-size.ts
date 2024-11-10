"use client";

import { useState, useEffect } from "react";

// Define Tailwind's default breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// A utility function to convert the window width into breakpoints
function getBreakPoint(windowWidth: number) {
  if (windowWidth < breakpoints.sm) {
    return "xs"; // Below 'sm' breakpoint (extra small screens)
  } else if (windowWidth < breakpoints.md) {
    return "sm";
  } else if (windowWidth < breakpoints.lg) {
    return "md";
  } else if (windowWidth < breakpoints.xl) {
    return "lg";
  } else if (windowWidth < breakpoints["2xl"]) {
    return "xl";
  } else {
    return "2xl";
  }
}

function useWindowSize() {
  const isWindowClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? getBreakPoint(window.innerWidth) : undefined
  );

  useEffect(() => {
    function setSize() {
      setWindowSize(getBreakPoint(window.innerWidth));
    }
    if (isWindowClient) {
      window.addEventListener("resize", setSize);
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient]);

  return windowSize;
}

export default useWindowSize;
