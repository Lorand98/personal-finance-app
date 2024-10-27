import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import { Transaction } from "./types";

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Recipient / Sender",
    cell: ({ row }) => {
      const { avatar, name } = row.original;
      return (
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10">
            <Image
              src={`/${avatar}`}
              alt={name}
              fill
              className="rounded-full object-cover"
              sizes={"40px"}
            />
          </div>
          <strong>{name}</strong>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const { category } = row.original;
      return <span className="text-preset-5 text-grey-500">{category}</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Transaction Date",
    cell: ({ row }) => {
      const { date: dateString } = row.original;
      const date = moment(dateString).format("DD MMM YYYY");
      return <span className="text-preset-5 text-grey-500">{date}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const { amount } = row.original;
      const isNegative = amount < 0;
      const currencyAmount = `${isNegative ? "-" : "+"}$${Math.abs(amount)}`;
      return (
        <div
          className={cn("text-right", {
            "text-green": !isNegative,
          })}
        >
          <strong>{currencyAmount}</strong>
        </div>
      );
    },
  },
];

export default columns;
