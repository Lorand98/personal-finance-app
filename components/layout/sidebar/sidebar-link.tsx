"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SVGProps } from "react";
import SidebarNavLabel from "./sidebar-nav-label";

interface SidebarLinkProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  link: string;
  label: string;
  minimized?: boolean;
  className?: string;
}

const SidebarLink = ({
  Icon,
  link,
  label,
  minimized = false,
  className,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={cn(
        "group flex flex-col rounded-t-xl p-3 border-b-4 lg:flex-row lg:gap-4 lg:min-h-14 items-center border-grey-900 lg:rounded-l-none lg:rounded-r-xl lg:border-l-4 lg:border-b-0 lg:pl-8 transition-colors duration-300",
        {
          "text-grey-900 bg-beige-100 border-green ": isActive,
          "hover:text-white": !isActive,
        },
        {
          "mr-8": !minimized,
          "mr-4": minimized,
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
      <SidebarNavLabel isVisible={!minimized}>{label}</SidebarNavLabel>
    </Link>
  );
};

export default SidebarLink;
