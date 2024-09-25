
'use client';

import { motion } from "framer-motion";

import { useLayout } from "@/app/_context/LayoutContext";


export const MainLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const { sidebarWidth } = useLayout();

    return (
        <motion.main
            initial={{ marginLeft: `${sidebarWidth}rem` }}
            animate={{ marginLeft: `${sidebarWidth}rem` }}
            className={'px-10 py-8'} >
            {children}
        </motion.main >
    )
}
