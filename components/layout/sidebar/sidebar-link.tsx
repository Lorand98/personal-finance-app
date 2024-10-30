import Image from "next/image";
import Link from "next/link";
import SidebarNavLabel from "./SidebarNavLabel";

interface SidebarLinkProps {
  icon: string;
  link: string;
  label: string;
  minimized?: boolean;
}

const SidebarLink = ({
  icon,
  link,
  label,
  minimized = false,
}: SidebarLinkProps) => {
  return (
    <Link
      href={link}
      className="flex flex-col lg:flex-row lg:gap-4 lg:min-h-6 items-center"
    >
      <Image src={icon} alt={label} />
      <SidebarNavLabel isVisible={!minimized}>{label}</SidebarNavLabel>
    </Link>
  );
};

export default SidebarLink;
