import Link from 'next/link'
import React from 'react'

import logoLarge from "@/public/logo-large.svg";
import logoSmall from "@/public/logo-small.svg";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface LogoProps {
    size: 'large' | 'small'
}

const Logo = ({ size }: LogoProps) => {
    const logoSrc = size === 'large' ? logoLarge : logoSmall;

    return (
        <div className='min-h-6'>
            <AnimatePresence initial={false} mode='wait'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5 }}
                    key={size}
                >
                    <Link href='/'>
                        <Image src={logoSrc} alt='Finance App Logo' />
                    </Link>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Logo