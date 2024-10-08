import data from '@/public/data.json';

import { TransactionsTable } from '@/app/_components/transactions/TransactionsTable';
import withPageHeading from '@/app/_components/layout/withPageHeading';

import SearchBar from '@/app/_components/form/SearchBar';

export const metadata = {
    title: 'Transactions',
}

const Transactions = () => {
    const { transactions } = data;

    return (
        <div>
            <div className="bg-white w-full p-8 rounded-xl">
                <div className='flex content-between'>
                    {/* transaction filter */}
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        <select
                            name="sort"
                            id="sort"
                            className="border border-grey-300 rounded-lg p-2"
                        ></select>
                    </div>
                </div>
                <TransactionsTable transactions={transactions} />
            </div>
        </div >
    );
};

export default withPageHeading(Transactions, metadata.title);