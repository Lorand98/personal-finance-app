import { cn } from "@/lib/utils";

interface FinancialProgressItemProps {
  title: string;
  amount: number;
  maximum?: number;
  theme: string;
  className?: string;
  compact?: boolean;
}

export default function FinancialProgressItem({
  title,
  amount,
  maximum,
  theme,
  className,
  compact = false,
}: FinancialProgressItemProps) {
  const amountDisplay = (
    <div>
      <span className="text-preset-3 font-bold mr-1">${amount.toFixed(2)}</span>
      {maximum && (
        <span className="text-preset-4 text-grey-500">
          of ${maximum.toFixed(2)}
        </span>
      )}
    </div>
  );

  return (
    <div className={cn("py-3", className)}>
      <div className={cn("flex gap-2")}>
        <div className="flex gap-2">
          <span
            style={{ backgroundColor: theme }}
            className="w-1 rounded-full"
          />
          <div>
            <span className="text-preset-4 text-grey-500">{title}</span>
            {compact && amountDisplay}
          </div>
        </div>
      </div>
      {!compact && amountDisplay}
    </div>
  );
}
