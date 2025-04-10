import { TImmutableStockCard } from '@/app/home/components/stock-card/types/stockCard';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useStore } from 'zustand';
import { useStocksStore } from '@/app/home/store/store';

export default function Favourite({favourite, favKey}: {favourite: TImmutableStockCard, favKey:string}){
    
    const {deleteFavourite} = useStocksStore();
    return(
        <div className={styles.favouriteComponent}>
            <div className={styles.favouriteContainer}>
                <span>{favourite.name}</span>
                <span>{favKey}</span>
            </div>
            <div className={styles.deleteFavouriteContainer}>
                <button type="button" onClick={() => deleteFavourite(favKey)}>
                    <Image src={'/trash.svg'} alt='delete fav' height={25} width={25} />
                </button>
            </div>
        </div>
    )
}