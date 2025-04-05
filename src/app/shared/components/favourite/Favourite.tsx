import { TImmutableStockCard } from '@/app/home/components/stock-card/types/stockCard';
import styles from './styles.module.scss';
import Image from 'next/image';

export default function Favourite({favourite, favKey}: {favourite: TImmutableStockCard, favKey:string}){
    return(
        <div className={styles.favouriteComponent}>
            <div className={styles.favouriteContainer}>
                <span>{favourite.name}</span>
                <span>{favKey}</span>
            </div>
            <div className={styles.deleteFavouriteContainer}>
                <Image src={'/trash.svg'} alt='delete fav' height={25} width={25} />
            </div>
        </div>
    )
}