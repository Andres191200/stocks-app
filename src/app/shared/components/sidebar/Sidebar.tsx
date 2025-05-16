'use client';
import { useStocksStore } from '@/app/home/store/store';
import styles from './styles.module.scss';
import Favourite from '../favourite/Favourite';
import Image from 'next/image';
import ToggleTheme from '../toggle-theme/ToggleTheme';

export default function Sidebar(){
    const {favourites} = useStocksStore();
    return(
        <div className={`${styles.sidebarComponent} sidebar`}>
            <h4>My stocks</h4>
            {/* <ToggleTheme /> */}
            <div className={styles.favouritesContainer}>
            {
                favourites.size !== 0
                ? [...favourites].map(([key, favourite]) => <Favourite favourite={favourite} favKey={key} key={key}/>)
                : (
                    <div className={styles.emptyFavouritesListContainer}>
                      <Image src={'/warning.svg'} alt="warning icon" height={25} width={25} />
                      <p>No favourites added</p>
                    </div>
                )
            }
            </div>
        </div>
    )
}