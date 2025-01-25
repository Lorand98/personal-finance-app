import Image from "next/image";
import React from "react";

import searchIcon from "@/public/icon-search.svg";

import BaseInput from "./base-input";
import { cn } from "@/lib/utils";

const SearchBar = ({
  className,
  ...rest
}: React.ComponentProps<typeof BaseInput>) => {
  return (
    <div className={cn("relative", className)}>
      <BaseInput type="text" placeholder="Search" className="pr-12" {...rest} />
      <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
        <div className="">
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
