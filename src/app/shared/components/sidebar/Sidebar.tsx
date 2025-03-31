'use client';
import { useStocksStore } from '@/app/home/components/store/store';
import styles from './styles.module.scss';
import { TImmutableStockCard } from '@/app/home/components/stock-card/types/stockCard';
import Favourite from '../favourite/Favourite';

interface stocksState{
    favourites: Map<string, TImmutableStockCard>;
    addFavourite: (favourite: TImmutableStockCard) => void,
    deleteFavourite: (favouriteId: string) => void
}

export default function Sidebar(){
    const {favourites} = useStocksStore();
    return(
        <div className={styles.sidebarComponent}>
            <h4>Favourites</h4>
            <div className={styles.favouritesContainer}>
            {
                favourites.size !== 0
                ? [...favourites].map(([key, favourite]) => <Favourite favourite={favourite} favKey={key} key={key}/>)
                : <p>You didn't add a favourite yet</p>
            }
            </div>
        </div>
    )
}