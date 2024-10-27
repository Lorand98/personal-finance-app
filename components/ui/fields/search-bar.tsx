import Image from "next/image";
import React from "react";

import searchIcon from "@/public/icon-search.svg";

import BaseInput from "./base-input";

const SearchBar = (props: React.ComponentProps<typeof BaseInput>) => {
  return (
    <div className="relative">
      <BaseInput type="text" placeholder="Search" className="pr-12" {...props} />
      <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
        <div className="">
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
