import Image from 'next/image'

import data from '@/public/data.json'

const Transactions = () => {
    return (
        <div><h1>
            Transactions
        </h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Recipient / Sender</th>
                            <th>Category</th>
                            <th>Transaction Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.transactions.map(({ avatar, name, category, date, amount }) => (
                            <tr key={`${name}-${date}-${amount}`}>
                                <td>
                                    <div className='relative h-10 w-10'>
                                        <Image src={`/${avatar}`} alt={name} fill />
                                    </div>

                                    <span>{name}</span>
                                </td>
                                <td>{category}</td>
                                <td>{date}</td>
                                <td>{amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Transactions