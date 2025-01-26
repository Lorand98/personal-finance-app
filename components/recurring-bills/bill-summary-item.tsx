import { cn } from "@/lib/utils";

interface BillSummaryItemProps {
  label: string;
  amount: string;
  className?: string;
}

export default function BillSummaryItem({
  label,
  amount,
  className,
}: BillSummaryItemProps) {
  return (
    <div
      className={cn(
        "bg-beige-100 flex justify-between items-center rounded-lg px-4 py-5 border-l-4",
        className
      )}
    >
      <p className="text-preset-4 text-grey-500">{label}</p>
      <p className="font-bold text-preset-4">${amount}</p>
    </div>
  );
}
