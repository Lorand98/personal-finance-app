"use client";

import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { cn } from "@/lib/utils";

interface BudgetSpending {
  category: string;
  maximum: number;
  spent: number;
  theme: string;
}

interface BudgetPieChartProps {
  budgetSpendingData: BudgetSpending[];
  className?: string;
}

export default function BudgetPieChart({
  budgetSpendingData,
  className,
}: BudgetPieChartProps) {
  // Build config for the ChartContainer
  const chartConfig = budgetSpendingData.reduce<ChartConfig>(
    (acc, { category, theme }) => {
      acc[category] = { label: category, color: theme };
      return acc;
    },
    {}
  ) satisfies ChartConfig;

  // Prepare data for the Pie component
  const chartData = budgetSpendingData.map(({ category, spent, theme }) => ({
    category,
    spent,
    fill: theme,
  }));

  // Calculate total spent vs. total budget
  const [totalSpent, totalBudget] = budgetSpendingData.reduce(
    ([spentSum, maxSum], { spent, maximum }) => [
      spentSum + spent,
      maxSum + maximum,
    ],
    [0, 0]
  );

  return (
    <ChartContainer config={chartConfig} className={cn("aspect-square h-[16rem] md:h-[20rem]", className)}>
      <PieChart>
        <Pie
          dataKey="spent"
          nameKey="category"
          data={chartData}
          innerRadius="50%"
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                const { cx, cy } = viewBox;
                return (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={cx}
                      y={cy}
                      className="fill-foreground text-2xl md:text-3xl font-bold"
                    >
                      ${totalSpent.toLocaleString()}
                    </tspan>
                    <tspan
                      x={cx}
                      y={(cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      of ${totalBudget.toLocaleString()} limit
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
