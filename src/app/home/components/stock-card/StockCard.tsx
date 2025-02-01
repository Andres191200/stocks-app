import styles from './styles.module.scss';

export default function StockCard(){
    return(
        <div className={styles.stockCardComponent}>
            <h2>eth</h2>
            <span>3496,32</span>
        </div>
    )
}