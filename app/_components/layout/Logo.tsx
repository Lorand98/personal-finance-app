import Link from 'next/link'
import React from 'react'

import logoLarge from "@/public/logo-large.svg";
import logoSmall from "@/public/logo-small.svg";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
    size: 'large' | 'small'
}

const Logo = ({ size }: LogoProps) => <motion.div className='mb-10 min-h-6'
    initial={{ opacity: 0 }
    }
    animate={{ opacity: 1 }}
    key={size === 'small' ? 'small-logo-container' : 'large-logo-container'}
>
    <Link href='/'>
        <Image src={size === 'large' ? logoLarge : logoSmall} alt='Finance App Logo' />
    </Link>
</motion.div>


export default Logo