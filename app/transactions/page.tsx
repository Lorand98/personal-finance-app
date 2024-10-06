import data from '@/public/data.json';

import { TransactionsTable } from '@/app/_components/transactions/TransactionsTable';
import withPageHeading from '@/app/_components/layout/withPageHeading';

export const metadata = {
    title: 'Transactions',
}

const Transactions = () => {
    const { transactions } = data;

    return (
        <div>
            <div className="bg-white w-full p-8 rounded-xl">
                <TransactionsTable transactions={transactions} />
            </div>
        </div >
    );
};

export default withPageHeading(Transactions, metadata.title);