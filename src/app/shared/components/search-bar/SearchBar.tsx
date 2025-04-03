import Image from 'next/image';
import styles from './styles.module.scss';

export default function SearchBar(){
    return(
        <div className={styles.searchBarComponent}>
            <input type="text" placeholder='Search'/>
            <Image src={'/search.svg'} alt="search icon" height={28} width={28}/>
        </div>
    )
}