import Image from 'next/image';
import styles from './styles.module.scss';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router';

export default function SearchBar({onChange}: {onChange: (query:string) => void}){
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<string>('');

    function handleChange(value:string){
        setValue(value);
        onChange(value);
    }

    return(
        <div className={styles.searchBarComponent}>
            <input type="text" placeholder='Search' onChange={(event) => handleChange(event.target.value)} value={value} defaultValue={searchParams.get('search') || ''}/>
            <Image src={'/search.svg'} alt="search icon" height={25} width={25}/>
        </div>
    )
}