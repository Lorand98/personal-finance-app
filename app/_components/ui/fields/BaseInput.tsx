import { cn } from "@/app/_lib/utils";
import FieldWrapper from "./FieldWrapper";
import Image from "next/image";

import searchIcon from '@/public/icon-search.svg'

interface BaseInputProps extends React.ComponentPropsWithoutRef<"input"> {}

const BaseInput = ({ className, ...props }: BaseInputProps) => {
  return (
    <div className="relative w-full max-w-xs">
    <input
      type="text"
      id="search-input"
      className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <Image
       src={searchIcon}
       alt="Search Icon"
      />
    </div>
  </div>
  );
};

export default BaseInput;
