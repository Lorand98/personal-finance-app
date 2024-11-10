import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import { Transaction } from "./types";
import useWindowSize from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import React from "react";

const columnHelper = createColumnHelper<Transaction>();

export type ColumnMeta = {
  hideOnMobile?: boolean;
};

const SecondaryCellText: React.FC<{
  children: React.ReactNode;
  hidden?: boolean;
}> = ({ children, hidden }) => (
  <span className={cn("text-preset-5 text-grey-500", { hidden })}>
    {children}
  </span>
);

const formatDate = (date: string) => moment(date).format("DD MMM YYYY");

const UserInfoCell: React.FC<{
  avatar: string;
  name: string;
  category: string;
}> = ({ avatar, name, category }) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "xs";
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-10 w-10">
        <Image
          src={`/${avatar}`}
          alt={name}
          fill
          className="rounded-full object-cover"
          sizes="40px"
        />
      </div>
      <div className="flex flex-col">
        <strong>{name}</strong>
        <SecondaryCellText hidden={!isMobile}>{category}</SecondaryCellText>
      </div>
    </div>
  );
};

const AmountCell: React.FC<{ amount: number; date: string }> = ({
  amount,
  date,
}) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "xs";
  const isNegative = amount < 0;
  const currencyAmount = `${isNegative ? "-" : "+"}$${Math.abs(amount)}`;
  const formattedDate = formatDate(date);

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
    cell: ({ row }) => <UserInfoCell {...row.original} />,
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ row }) => (
      <SecondaryCellText>{row.original.category}</SecondaryCellText>
    ),
    meta: {
      hideOnMobile: true,
    },
  }),
  columnHelper.accessor("date", {
    header: "Transaction Date",
    cell: ({ row }) => (
      <SecondaryCellText>{formatDate(row.original.date)}</SecondaryCellText>
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
