import { cn, formatTransactionDate } from "@/lib/utils";
import { createColumnHelper, Row } from "@tanstack/react-table";
import React from "react";
import UserAvatar from "../common/user-avatar";
import { Transaction } from "./types";

const columnHelper = createColumnHelper<Transaction>();

const SecondaryCellText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={cn("text-preset-5 text-grey-500", className)}>
    {children}
  </span>
);

const UserInfoCell = ({
  avatar,
  name,
  category,
  compact,
}: {
  avatar?: string | null;
  name: string;
  category: string;
  compact?: boolean;
}) => {
  return (
    <div className="flex items-center gap-4">
      <UserAvatar avatar={avatar} name={name} className="shrink-0" />
      <div className="flex flex-col">
        <strong>{name}</strong>
        <SecondaryCellText
          className={cn("sm:hidden", {
            hidden: compact,
          })}
        >
          {category}
        </SecondaryCellText>
      </div>
    </div>
  );
};

const AmountCell = ({
  amount,
  date,
  compact,
}: {
  amount: number;
  date: string;
  compact?: boolean;
}) => {
  const isNegative = amount < 0;
  const currencyAmount = `${isNegative ? "-" : "+"}$${Math.abs(amount)}`;
  const formattedDate = formatTransactionDate(date);

  return (
    <div
      className={cn("text-right flex flex-col", { "text-green": !isNegative })}
    >
      <strong>{currencyAmount}</strong>
      <SecondaryCellText className={cn({ "sm-hidden": !compact })}>
        {formattedDate}
      </SecondaryCellText>
    </div>
  );
};

const amountColConfig = {
  header: () => <div className="text-right">Amount</div>,
  cell: ({ row }: { row: Row<Transaction> }) => (
    <AmountCell amount={row.original.amount} date={row.original.date} compact />
  ),
};

export const columns = [
  columnHelper.accessor("name", {
    header: "Recipient / Sender",
    cell: ({ row }) => (
      <UserInfoCell
        avatar={row.original.avatar}
        name={row.original.name}
        category={row.original.category}
      />
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ getValue }) => <SecondaryCellText>{getValue()}</SecondaryCellText>,
    meta: {
      hideOnMobile: true,
    },
  }),
  columnHelper.accessor("date", {
    header: "Transaction Date",
    cell: ({ getValue }) => (
      <SecondaryCellText>{formatTransactionDate(getValue())}</SecondaryCellText>
    ),
    meta: {
      hideOnMobile: true,
    },
  }),
  columnHelper.accessor("amount", amountColConfig),
];

export const compactColumns = [
  columnHelper.accessor("name", {
    header: "Recipient / Sender",
    cell: ({ row }) => (
      <UserInfoCell
        avatar={row.original.avatar}
        name={row.original.name}
        category={row.original.category}
        compact
      />
    ),
  }),
  columnHelper.accessor("date", {}),
  columnHelper.accessor("amount", amountColConfig),
];
