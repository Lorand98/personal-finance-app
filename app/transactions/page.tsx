import data from '@/public/data.json';

import { TransactionsTable } from '@/app/_components/transactions/TransactionsTable';
import withPageHeading from '@/app/_components/layout/withPageHeading';

import SearchBar from '@/app/_components/form/SearchBar';
import Dropdown from '@/app/_components/form/Dropdown';

export const metadata = {
    title: 'Transactions',
}

const Transactions = () => {
    const { transactions } = data;

    const dropdownItems = [
        { id: 'latest', name: 'Latest' },
        { id: 'oldest', name: 'Oldest' },
        { id: 'a_to_z', name: 'A to Z' },
        { id: 'z_to_a', name: 'Z to A' },
        { id: 'highest', name: 'Highest' },
        { id: 'lowest', name: 'Lowest' },
    ]

    return (
        <div>
            <div className="bg-white w-full p-8 rounded-xl">
                <div className='flex justify-between'>
                    {/* transaction filter */}

                    <SearchBar inputProps={
                        {
                            placeholder: 'Search transactions'
                        }
                    } />

                    <div>
                        <Dropdown
                            items={dropdownItems}
                            selectedId={dropdownItems[0].id}
                            label='Sort by'
                            labelPosition='left'
                            className='w-28'
                        />
                    </div>

                </div>
                <TransactionsTable transactions={transactions} />
            </div>
        </div >
    );
};

export default withPageHeading(Transactions, metadata.title);