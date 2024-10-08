'use client'

import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Image from 'next/image'
import Link from 'next/link'

import Logo from '../Logo'

import minimizeMenuIcon from '@/public/icon-minimize-menu.svg'
import budgetsIcon from '@/public/icon-nav-budgets.svg'
import overviewIcon from '@/public/icon-nav-overview.svg'
import potsIcon from '@/public/icon-nav-pots.svg'
import recurringBillsIcon from '@/public/icon-nav-recurring-bills.svg'
import transactionsIcon from '@/public/icon-nav-transactions.svg'

import { useLayout } from '@/app/_context/LayoutContext'


const SidebarNavLabel = ({ isVisible, children }: {
    isVisible: boolean,
    children: ReactNode,
}) => <AnimatePresence initial={false}>
        {isVisible && <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5 }}
            className={'text-nowrap font-bold overflow-hidden'}>
            {children}
        </motion.span>}
    </AnimatePresence>


const SidebarNav = () => {
    const { sidebarWidth, sidebarMinimized: minimized, toggleSidebar } = useLayout();

    const menuItems = [
        { icon: overviewIcon, link: '/', label: 'Overview' },
        { icon: transactionsIcon, link: '/transactions', label: 'Transactions' },
        { icon: budgetsIcon, link: '/budgets', label: 'Budgets' },
        { icon: potsIcon, link: '/pots', label: 'Pots' },
        { icon: recurringBillsIcon, link: '/recurring-bills', label: 'Recurring Bills' },
    ];

    return (
        <motion.nav
            initial={{ width: `${sidebarWidth}rem` }}
            animate={{ width: `${sidebarWidth}rem` }}
            className='min-h-full fixed flex flex-col bg-grey-900 text-grey-300 px-8 py-10 rounded-r-2xl'
        >
            <div className='mb-10'>
                <Logo size={minimized ? 'small' : 'large'} />
            </div>
            <ul className='py-6 flex gap-1 flex-col flex-grow'>
                {menuItems.map((item) => (
                    <li key={item.label} className='py-4 '>
                        <Link href={item.link} className="flex items-center gap-4 min-h-6">
                            <Image src={item.icon} alt={item.label} />
                            <AnimatePresence>
                                <SidebarNavLabel isVisible={!minimized}>
                                    {item.label}</SidebarNavLabel>
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
                    <SidebarNavLabel isVisible={!minimized}>
                        Minimize Menu
                    </SidebarNavLabel>
                </button>
            </div >
        </motion.nav >
    )
}

export default SidebarNav