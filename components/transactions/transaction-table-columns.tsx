import useWindowSize from "@/hooks/use-window-size";
import { cn, formatTransactionDate } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import UserAvatar from "../common/user-avatar";
import { Transaction } from "./types";

const columnHelper = createColumnHelper<Transaction>();

const SecondaryCellText = ({
  children,
  hidden,
}: {
  children: React.ReactNode;
  hidden?: boolean;
}) => (
  <span className={cn("text-preset-5 text-grey-500", { hidden })}>
    {children}
  </span>
);

const UserInfoCell = ({
  avatar,
  name,
  category,
}: {
  avatar?: string | null;
  name: string;
  category: string;
}) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "xs";
  return (
    <div className="flex items-center gap-4">
      <UserAvatar avatar={avatar} name={name} className="flex-shrink-0" />
      <div className="flex flex-col">
        <strong>{name}</strong>
        <SecondaryCellText hidden={!isMobile}>{category}</SecondaryCellText>
      </div>
    </div>
  );
};

const AmountCell = ({ amount, date }: { amount: number; date: string }) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "xs";
  const isNegative = amount < 0;
  const currencyAmount = `${isNegative ? "-" : "+"}$${Math.abs(amount)}`;
  const formattedDate = formatTransactionDate(date);

  return (
    <div
      className={cn("text-right flex flex-col", { "text-green": !isNegative })}
    >
      <strong>{currencyAmount}</strong>
      <SecondaryCellText hidden={!isMobile}>{formattedDate}</SecondaryCellText>
    </div>
  );
};

const columns = [
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
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <AmountCell amount={row.original.amount} date={row.original.date} />
    ),
  }),
];

export default columns;
