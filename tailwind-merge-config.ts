import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge<"text-preset">({
  extend: {
    classGroups: {
      "text-preset": [
        "text-preset-1",
        "text-preset-2",
        "text-preset-3",
        "text-preset-4",
        "text-preset-5",
      ],
    },
  },
});

export default customTwMerge;
