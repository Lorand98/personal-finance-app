"use client";

import React from "react";
import { Budget } from "../transactions/types";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Pie, PieChart } from "recharts";

const BudgetPieChart = ({ budgets }: { budgets: Budget[] }) => {
  const chartConfig = budgets.reduce<ChartConfig>((acc, budget) => {
    acc[budget.category] = {
      label: budget.category,
      color: budget.theme,
    };
    return acc;
  }, {}) satisfies ChartConfig;

  console.log(budgets);

  const chartData = budgets.map((budget) => ({
    category: budget.category,
    maximum: budget.maximum,
    fill: budget.theme,
  }));

  return (
    <ChartContainer config={chartConfig} className="max-h-[19rem]">
      <PieChart>
        <Pie
          dataKey="maximum"
          nameKey="category"
          data={chartData}
          innerRadius="50%"
        />
      </PieChart>
    </ChartContainer>
  );
};

export default BudgetPieChart;
