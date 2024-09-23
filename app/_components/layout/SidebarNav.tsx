'use client'

import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Image from 'next/image'
import Link from 'next/link'

import Logo from './Logo'

import minimizeMenuIcon from '@/public/icon-minimize-menu.svg'
import budgetsIcon from '@/public/icon-nav-budgets.svg'
import overviewIcon from '@/public/icon-nav-overview.svg'
import potsIcon from '@/public/icon-nav-pots.svg'
import recurringBillsIcon from '@/public/icon-nav-recurring-bills.svg'
import transactionsIcon from '@/public/icon-nav-transactions.svg'


const SidebarText = ({ isVisible, children }: {
    isVisible: boolean,
    children: ReactNode,
}) => <AnimatePresence>
        {isVisible && <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={'text-nowrap font-bold overflow-hidden'}>
            {children}
        </motion.span>}
    </AnimatePresence>


const SidebarNav = () => {
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
        <motion.nav
            animate={{ width: minimized ? '5.5rem' : '18.75rem' }}
            className='min-h-screen flex flex-col bg-grey-900 text-grey-300 px-8 py-10 rounded-r-2xl'
        >
            <Logo size={minimized ? 'small' : 'large'} />
            <ul className='py-6 flex gap-1 flex-col flex-grow'>
                {menuItems.map((item) => (
                    <li key={item.label} className='py-4 '>
                        <Link href={item.link} className="flex items-center gap-4 min-h-6">
                            <Image src={item.icon} alt={item.label} />
                            <AnimatePresence>
                                {!minimized && <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={'text-nowrap font-bold overflow-hidden'}>
                                    {item.label}
                                </motion.span>}
                            </AnimatePresence>
                        </Link>
                    </li>
                ))}
            </ul>
            <div>
                <button className='flex items-center gap-4 min-h-6' onClick={toggleSidebar}>
                    <motion.div
                        animate={{
                            rotate: minimized ? 180 : 0
                        }}
                        className="flex-shrink-0"
                    >
                        <Image src={minimizeMenuIcon} alt='Minimize Menu' />
                    </motion.div>
                    <SidebarText isVisible={!minimized}>
                        Minimize Menu
                    </SidebarText>
                </button>
            </div >
        </motion.nav >
    )
}

export default SidebarNav