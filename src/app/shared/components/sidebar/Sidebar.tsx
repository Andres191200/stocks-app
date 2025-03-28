'use client';
import { useStocksStore } from '@/app/home/components/store/store';
import styles from './styles.module.scss';
import { TImmutableStockCard } from '@/app/home/components/stock-card/types/stockCard';

interface stocksState{
    favourites: Map<string, TImmutableStockCard>;
    addFavourite: (favourite: TImmutableStockCard) => void,
    deleteFavourite: (favouriteId: string) => void
}

export default function Sidebar(){
    const {favourites} = useStocksStore();
    return(
        <div className={styles.sidebarComponent}>
            <h4>Favourites: {favourites.size}</h4>
            {
                [...favourites].map(([key, favourite]) => {
                    return(
                        <div>
                            <p>{key}</p>
                            <p>{favourite.name}</p>
                        </div>
                    );
                })
            }
        </div>
    )
}