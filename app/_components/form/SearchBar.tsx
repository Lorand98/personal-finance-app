import React from 'react'
import Image from 'next/image';

import searchIcon from '@/public/icon-search.svg'

import BaseInput from './BaseInput';

const SearchBar = () => {
    return (
        <BaseInput
            endAdornment={<Image src={searchIcon} alt='search' />}
            placeholder='Search transactions'
            className='w-80'
        />
    )
}

export default SearchBar;
