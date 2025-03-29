import { TImmutableStockCard } from '@/app/home/components/stock-card/types/stockCard';
import styles from './styles.module.scss';

export default function Favourite({favourite, key}: {favourite: TImmutableStockCard, key:string}){
    return(
        <div className={styles.favouriteComponent}>
            <span>{favourite.name}</span>
            <span>{key}</span>
        </div>
    )
}