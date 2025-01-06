"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SVGProps, type JSX } from "react";
import NavLabel from "./nav-label";

interface NavLinkProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  link: string;
  label: string;
  minimized?: boolean;
  className?: string;
}

const NavLink = ({
  Icon,
  link,
  label,
  minimized = false,
  className,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={cn(
        "group flex flex-col rounded-t-xl px-3 py-2 border-b-4 lg:flex-row gap-1 lg:gap-4 lg:min-h-14 items-center border-grey-900 lg:rounded-l-none lg:rounded-r-xl lg:border-l-4 lg:border-b-0 lg:pl-8 transition-colors duration-300",
        {
          "text-grey-900 bg-beige-100 border-green ": isActive,
          "hover:text-white": !isActive,
        },
        className
      )}
    >
      <Icon
        className={cn("transition-colors duration-300", {
          "fill-green": isActive,
          "group-hover:fill-white": !isActive,
        })}
      />
      <NavLabel isVisible={!minimized}>{label}</NavLabel>
    </Link>
  );
};

export default NavLink;
