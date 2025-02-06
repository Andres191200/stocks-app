import styles from './styles.module.scss';


interface IStockCard{
    name: string,
    symbol: string,
    value: string,
    valueHistory?: number[]
}

type ImmutableStockCardProps = Readonly<IStockCard>;

export default function StockCard({ name, symbol, value, valueHistory = [] }: ImmutableStockCardProps){
    return(
        <div className={styles.stockCardComponent}>
            <div className={styles.stockCardHeader}>
                <span>{name}</span>
                <span className={styles.stockSymbol}>{symbol}</span>
            </div>
            <h4 className={styles.stockValue}>
                {value}
            </h4>
        </div>
    )
}