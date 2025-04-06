import Image from 'next/image';
import styles from './styles.module.scss';
import React from 'react';

export default function SearchBar({onChange}: {onChange: (query:string) => void}){
    return(
        <div className={styles.searchBarComponent}>
            <input type="text" placeholder='Search' onChange={(event) => onChange(event.target.value)}/>
            <Image src={'/search.svg'} alt="search icon" height={25} width={25}/>
        </div>
    )
}