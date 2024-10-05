import Image from 'next/image';
import data from '@/public/data.json';
import moment from 'moment';

const Transactions = () => {
    const tableHeadings = ['Recipient / Sender', 'Category', 'Transaction Date', 'Amount'];

    return (
        <div>
            <h1>Transactions</h1>
            <div className="bg-white w-full p-8 rounded-xl">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            {tableHeadings.map((heading, index, headingsArr) => (
                                <th
                                    key={heading}
                                    className={`py-3 ${index === headingsArr.length - 1 ? 'text-right' : 'text-left'}`}
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.transactions.map(({ avatar, name, category, date: dateString, amount }) => {
                            const date = moment(dateString).format('DD MMM YYYY');
                            const isNegative = amount < 0;
                            const currencyAmount = `${isNegative ? '-' : '+'}$${Math.abs(amount)}`;

                            return <tr key={`${name}-${date}-${amount}`}>
                                <td className="flex items-center gap-4">
                                    <div className="relative h-10 w-10">
                                        <Image src={`/${avatar}`} alt={name} fill className="rounded-full" />
                                    </div>
                                    <strong>{name}</strong>
                                </td>
                                <td className="text-preset-5 text-grey-500">{category}</td>
                                <td className="text-preset-5 text-grey-500">{date}</td>
                                <td className={`${!isNegative ? 'text-green' : ''} text-right`}><strong>
                                    {currencyAmount}
                                </strong>
                                </td>
                            </tr>
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Transactions;