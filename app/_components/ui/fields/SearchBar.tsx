import React from 'react'
import Image from 'next/image';

import searchIcon from '@/public/icon-search.svg'

import BaseInput from './BaseInput';

const SearchBar = (props:
    React.ComponentProps<typeof BaseInput>
) => {
    return (
        <BaseInput
            endAdornment={<Image src={searchIcon} alt='search' />}
            className='w-80'
            {...props}
        />
    )
}

export default SearchBar;
