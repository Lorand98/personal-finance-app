import { Transaction } from "@/components/transactions/types";

export const isRecurringBillPaid = (date: string) => {
  const dateDay = new Date(date).getDate();
  const today = new Date().getDate();
  return dateDay < today;
};

export const isRecurringBillDueSoon = (date: string) => {
  const dateDay = new Date(date).getDate();
  const today = new Date().getDate();
  return dateDay < today + 5 && dateDay >= today;
};

function billSum(bills: Transaction[]): string {
  return Math.abs(
    bills.reduce((acc, bill) => acc + bill.amount, 0)
  ).toFixed(2);
}

export function getRecurringBillStats(recurringBills: Transaction[]) {
  // 1) Unique recurring bills
  const uniqueRecurringBills = recurringBills.reduce<Transaction[]>((acc, bill) => {
    const billDate = new Date(bill.date).getDate();
    const billVendor = bill.name;
    const exists = acc.some(
      (item) =>
        new Date(item.date).getDate() === billDate && item.name === billVendor
    );
    if (!exists) {
      acc.push(bill);
    }
    return acc;
  }, []);

  // 2) Paid bills
  const paidBills = uniqueRecurringBills.filter((bill) =>
    isRecurringBillPaid(bill.date)
  );

  // 3) Upcoming bills
  const upcomingBills = uniqueRecurringBills.filter((bill) => {
    const billDateDay = new Date(bill.date).getDate();
    return billDateDay >= new Date().getDate();
  });

  // 4) Due soon
  const dueSoonBills = uniqueRecurringBills.filter((bill) => {
    const billDateDay = new Date(bill.date).getDate();
    const today = new Date().getDate();
    return billDateDay < today + 5 && billDateDay >= today;
  });

  // 5) Sums
  const paidBillsTotal = billSum(paidBills);
  const upcomingBillsTotal = billSum(upcomingBills);
  const dueSoonBillsTotal = billSum(dueSoonBills);

  return {
    uniqueRecurringBills,
    paidBills,
    upcomingBills,
    dueSoonBills,
    paidBillsTotal,
    upcomingBillsTotal,
    dueSoonBillsTotal,
  };
}