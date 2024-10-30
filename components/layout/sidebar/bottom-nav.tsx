"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems } from "./constants";

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-grey-900 text-grey-300 px-4 py-2 rounded-t-2xl flex flex-col items-center">
      <ul className="flex gap-4 justify-around w-full">
        {menuItems.map((item) => (
          <li key={item.label} className="flex flex-col items">
            <Link href={item.link} className="flex flex-col items-center">
              <Image src={item.icon} alt={item.label} />
              <span className="hidden sm:block text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
