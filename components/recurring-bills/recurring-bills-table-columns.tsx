import { createColumnHelper } from "@tanstack/react-table";
import { Transaction } from "../transactions/types";
import useWindowSize from "@/hooks/use-window-size";
import UserAvatar from "../common/user-avatar";
import moment from "moment";
import Image from "next/image";
import IconBillDue from "@/public/icon-bill-due.svg";
import IconBillPaid from "@/public/icon-bill-paid.svg";
import { cn, isRecurringBillDueSoon, isRecurringBillPaid } from "@/lib/utils";

const columnHelper = createColumnHelper<Transaction>();

const DueDate = ({ date }: { date: string }) => {
  const isAlreadyPaid = isRecurringBillPaid(date);
  const isDueSoon = isRecurringBillDueSoon(date);

  return (
    <div className="flex items-center gap-2">
      <span className="text-green text-preset-5">
        Monthly-{moment(date).format("Do")}
      </span>
      {isAlreadyPaid && <Image src={IconBillPaid} alt="Bill Paid" />}
      {isDueSoon && <Image src={IconBillDue} alt="Bill Due Soon" />}
    </div>
  );
};

const BillInfoCell = ({
  avatar,
  name,
  date,
}: {
  avatar?: string | null;
  name: string;
  date: string;
}) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "xs";

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <UserAvatar avatar={avatar} name={name} className="shrink-0" />
        <strong>{name}</strong>
      </div>
      {isMobile && <DueDate date={date} />}
    </div>
  );
};

const AmountCell = ({ amount, date }: { amount: number; date: string }) => {
  const isDueSoon = isRecurringBillDueSoon(date);

  return (
    <div className="text-right">
      <strong
        className={cn({
          "text-red": isDueSoon,
        })}
      >
        ${Math.abs(amount)}
      </strong>
    </div>
  );
};

const columns = [
  columnHelper.accessor("name", {
    header: "Bill Title",
    cell: ({ row }) => (
      <BillInfoCell
        avatar={row.original.avatar}
        name={row.original.name}
        date={row.original.date}
      />
    ),
  }),
  columnHelper.accessor("date", {
    header: "Due Date",
    cell: ({ getValue }) => <DueDate date={getValue()} />,
    meta: {
      hideOnMobile: true,
    },
    sortingFn: (rowA, rowB) => {
      const dayA = new Date(rowA.original.date).getDate();
      const dayB = new Date(rowB.original.date).getDate();
      return dayA - dayB;
    },
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row, getValue }) => (
      <AmountCell date={row.original.date} amount={getValue()} />
    ),
    sortingFn: (rowA, rowB) => rowB.original.amount - rowA.original.amount,
  }),
];

export default columns;
