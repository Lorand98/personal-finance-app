import CaretRightIcon from "../ui/icons/caret-right-icon";
import Link from "next/link";

interface ViewAllLinkProps {
  href: string;
  text?: string;
}

const ViewAllLink = ({ href, text = "See Details" }: ViewAllLinkProps) => (
  <Link
    href={href}
    className="text-grey-500 text-preset-4 flex items-center gap-3"
  >
    <span>{text}</span>
    <CaretRightIcon/>
  </Link>
);

export default ViewAllLink;
