import { ReactNode } from "react";

export default function Card2({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white w-full p-4 sm:p-6 md:p-8 rounded-xl space-y-4">
      {children}
    </div>
  );
}
