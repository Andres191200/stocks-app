import Image from 'next/image';
import styles from './styles.module.scss';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar({onChange}: {onChange: (query:string) => void}){
    const params = useSearchParams();
    const router = useRouter();

    return(
        <div className={styles.searchBarComponent}>
            <input type="text" placeholder='Search' onChange={(event) => onChange(event.target.value)} defaultValue={params.get('search') || ''}/>
            <Image src={'/search.svg'} alt="search icon" height={25} width={25}/>
        </div>
    )
}