interface BudgetListItemProps {
  category: string;
  spent: number;
  maximum: number;
  theme: string;
}

export default function BudgetPieLegendItem({
  category,
  spent,
  maximum,
  theme,
}: BudgetListItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <span
          style={{ backgroundColor: theme }}
          className="w-1 h-5 rounded-full mr-2"
        />
        <span className="text-preset-4 text-grey-500">{category}</span>
      </div>
      <div>
        <span className="text-preset-3 font-bold mr-1">
          ${spent.toFixed(2)}
        </span>
        <span className="text-preset-4 text-grey-500">
          of ${maximum.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
