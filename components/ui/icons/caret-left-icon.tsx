import * as React from "react";
import { SVGProps } from "react";
const CaretLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={11}
    fill="none"
    {...props}
  >
    <path
      fill="#696868"
      d="m5.147 10.854-5-5a.5.5 0 0 1 0-.708l5-5A.5.5 0 0 1 6 .5v10a.5.5 0 0 1-.853.354z"
    />
  </svg>
);
export default CaretLeftIcon;
