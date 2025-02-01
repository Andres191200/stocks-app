import styles from './styles.module.scss';

export default function StockCardGrid({children}: {children: React.ReactNode}){
    return(
        <div className={styles.stockCardGridComponent}>
            {children}
        </div>
    )
}