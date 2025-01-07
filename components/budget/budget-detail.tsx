const BudgetDetail = ({
  color,
  label,
  value,
}: {
  color?: string;
  label: string;
  value: number;
}) => (
  <div className="flex items-start flex-1 gap-4">
    <span
      className="w-1 h-full rounded-full bg-beige-100"
      style={{ backgroundColor: color }}
    />
    <div className="flex flex-col">
      <p className="text-grey-500">{label}</p>
      <span className="text-preset-3 font-bold mr-1">${value.toFixed(2)}</span>
    </div>
  </div>
);

export default BudgetDetail;
