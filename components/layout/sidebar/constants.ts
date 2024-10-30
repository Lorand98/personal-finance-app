import budgetsIcon from '@/public/icon-nav-budgets.svg'
import overviewIcon from '@/public/icon-nav-overview.svg'
import potsIcon from '@/public/icon-nav-pots.svg'
import recurringBillsIcon from '@/public/icon-nav-recurring-bills.svg'
import transactionsIcon from '@/public/icon-nav-transactions.svg'


export const menuItems = [
    { icon: overviewIcon, link: '/', label: 'Overview' },
    { icon: transactionsIcon, link: '/transactions', label: 'Transactions' },
    { icon: budgetsIcon, link: '/budgets', label: 'Budgets' },
    { icon: potsIcon, link: '/pots', label: 'Pots' },
    { icon: recurringBillsIcon, link: '/recurring-bills', label: 'Recurring Bills' },
];