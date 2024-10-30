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
        "flex flex-col lg:flex-row lg:gap-4 lg:min-h-14 items-center border-grey-900 border-l-4 transition-colors duration-300",
        {
          "text-grey-900 bg-beige-100 border-green ": isActive,
          "hover:text-white hover:white": !isActive,
        },
        className
      )}
    >
      <Icon
        className={cn({
          "fill-green transition-colors duration-300": isActive,
        })}
      />
      <SidebarNavLabel isVisible={!minimized}>{label}</SidebarNavLabel>
    </Link>
  );
};

export default SidebarLink;
