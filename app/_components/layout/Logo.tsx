import Link from 'next/link'
import React from 'react'

import logoLarge from "@/public/logo-large.svg";
import logoSmall from "@/public/logo-small.svg";

import Image from 'next/image';

interface LogoProps {
    size: 'large' | 'small'
}

function Logo({ size }: LogoProps) {
    return <Link href='/'>
        <Image src={size === 'large' ? logoLarge : logoSmall} alt='Finance App Logo' />
    </Link>
}

export default Logo