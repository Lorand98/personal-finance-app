import NavBudgetsIcon from "@/components/ui/icons/nav-budgets-icon";
import NavOverviewIcon from "@/components/ui/icons/nav-overview-icon";
import NavPotsIcon from "@/components/ui/icons/nav-pots-icon";
import NavRecurringBillsIcon from "@/components/ui/icons/nav-recurring-bills-icon";
import NavTransactionsIcon from "@/components/ui/icons/nav-transactions-icon";

export const menuItems = [
  { Icon: NavOverviewIcon, link: "/", label: "Overview" },
  { Icon: NavTransactionsIcon, link: "/transactions", label: "Transactions" },
  { Icon: NavBudgetsIcon, link: "/budget", label: "Budget" },
  { Icon: NavPotsIcon, link: "/pots", label: "Pots" },
  {
    Icon: NavRecurringBillsIcon,
    link: "/recurring-bills",
    label: "Recurring Bills",
  },
];
