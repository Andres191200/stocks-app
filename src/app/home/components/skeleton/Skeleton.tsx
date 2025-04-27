import { time } from 'console';
import StockCard from '../stock-card/StockCard';
import StockCardSkeleton from '../stock-card/StockCardSkeleton';
import styles from './styles.module.scss';

export default function Skeleton(){
    return(
        <div className={styles.skeletonGridComponent}>
            {
                Array.from({length: 20}, (idx) => <StockCardSkeleton key={Math.random()} />)
            }
        </div>
    )
}