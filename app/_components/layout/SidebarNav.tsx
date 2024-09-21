'use client'

import Image from 'next/image'
import Link from 'next/link'

import Logo from './Logo'

import overviewIcon from '@/public/icon-nav-overview.svg'
import transactionsIcon from '@/public/icon-nav-transactions.svg'
import budgetsIcon from '@/public/icon-nav-budgets.svg'
import potsIcon from '@/public/icon-nav-pots.svg'
import recurringBillsIcon from '@/public/icon-nav-recurring-bills.svg'
import minimizeMenuIcon from '@/public/icon-minimize-menu.svg'
import { useState } from 'react'

function SidebarNav() {
    const [minimized, setMinimized] = useState(false);

    const toggleSidebar = () => {
        setMinimized((prevMinimized) => !prevMinimized);
    }

    const menuItems = [
        { icon: overviewIcon, link: '/', label: 'Overview' },
        { icon: transactionsIcon, link: '/transactions', label: 'Transactions' },
        { icon: budgetsIcon, link: '/budgets', label: 'Budgets' },
        { icon: potsIcon, link: '/pots', label: 'Pots' },
        { icon: recurringBillsIcon, link: '/recurring-bills', label: 'Recurring Bills' },
    ];

    return (
        <nav className={`${minimized ? 'w-[5.5rem]' : 'w-[18.75rem]'} min-h-screen flex flex-col  bg-grey-900 text-grey-300 px-8 py-10`}>

            <div className='mb-10'>
                <Logo size={minimized ? 'small' : 'large'} />
            </div>


            <ul className='py-6 flex gap-1 flex-col flex-grow'>
                {menuItems.map((item) => (
                    <li key={item.label} className='py-4'>
                        <Link href={item.link} className="flex items-center gap-4 font-bold">
                            <Image src={item.icon} alt={item.label} />
                            {!minimized ? item.label : ''}
                        </Link>
                    </li>
                ))}
            </ul>

            <div>

            </div>

            <div >
                <button className='flex items-center gap-4' onClick={toggleSidebar}>
                    <Image src={minimizeMenuIcon} alt='Minimize Menu' className={`transition-transform duration-300 ${minimized ? 'rotate-180' : 'rotate-0'}`} />
                    {!minimized && <span className='font-bold'>Minimize Menu</span>}
                </button>
            </div>
        </nav>
    )
}

export default SidebarNav