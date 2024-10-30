"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import Image from "next/image";

import Logo from "@/components/logo";

import minimizeMenuIcon from "@/public/icon-minimize-menu.svg";
import { menuItems } from "./constants";
import SidebarLink from "./sidebar-link";
import SidebarNavLabel from "./SidebarNavLabel";

const SIDEBAR_OPEN_WIDTH = `18.75rem`;
const SIDEBAR_MINIMIZED_WIDTH = `5.5rem`;

const SidebarNav = () => {
  const [minimized, setMinimized] = useState(false);

  const toggleSidebar = () => {
    setMinimized((prevMinimized) => !prevMinimized);
  };

  const sidebarWidth = minimized ? SIDEBAR_MINIMIZED_WIDTH : SIDEBAR_OPEN_WIDTH;

  return (
    <div>
      <motion.nav
        initial={{ width: sidebarWidth }}
        animate={{ width: sidebarWidth }}
        className="hidden lg:flex min-h-screen flex-col bg-grey-900 text-grey-300 px-8 py-10 rounded-r-2xl"
      >
        <div className="mb-10">
          <Logo size={minimized ? "small" : "large"} />
        </div>
        <ul className="py-6 flex gap-1 flex-col flex-grow">
          {menuItems.map((item) => (
            <li key={item.label} className="py-4 ">
              <SidebarLink {...item} minimized={minimized} />
            </li>
          ))}
        </ul>
        <div>
          <button
            className="flex items-center gap-4 min-h-6"
            onClick={toggleSidebar}
          >
            <motion.div
              animate={{
                rotate: minimized ? 180 : 0,
              }}
              className="flex-shrink-0"
            >
              <Image src={minimizeMenuIcon} alt="Minimize Menu" />
            </motion.div>
            <SidebarNavLabel isVisible={!minimized}>
              Minimize Menu
            </SidebarNavLabel>
          </button>
        </div>
      </motion.nav>
    </div>
  );
};

export default SidebarNav;
