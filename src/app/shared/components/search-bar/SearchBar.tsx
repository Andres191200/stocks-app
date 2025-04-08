import Image from 'next/image';
import styles from './styles.module.scss';
import React from 'react';
import { useSearchParams } from 'react-router';

export default function SearchBar({onChange}: {onChange: (query:string) => void}){
    const [searchParams, setSearchParams] = useSearchParams();

    return(
        <div className={styles.searchBarComponent}>
            <input type="text" placeholder='Search' onChange={(event) => onChange(event.target.value)} value={searchParams.get('search') || ''}/>
            <Image src={'/search.svg'} alt="search icon" height={25} width={25}/>
        </div>
    )
}