import Link from 'next/link'
import React from 'react'

import logo from "@/public/logo-large.svg";
import Image from 'next/image';

function Logo() {
    return <Link href='/'>
        <Image src={logo} alt='Finance App Logo' />
    </Link>
}

export default Logo