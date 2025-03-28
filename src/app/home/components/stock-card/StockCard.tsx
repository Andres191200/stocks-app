import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './styles.module.scss';
import { CSSProperties, useRef } from 'react';
import { IStockCard, TImmutableStockCard } from './types/stockCard';
import { TImmutableMockData } from './types/data';
import { CalculateMinValueInArray } from './utils/minValue';
import { CalculateMaxValueInArray } from './utils/maxValue';
import Image from 'next/image';
import { useStocksStore } from '../store/store';
import { IStockData } from '../actions/getStocksData';

function checkLineColor(data: TImmutableMockData[]) : string{
    return data[0].lastsale > data[data.length - 1].lastsale ? '#a00' : '#0a0' 
}

export default function StockCard({stock}: {stock: IStockData}){
    const {addFavourite} = useStocksStore();
    const mockData:TImmutableMockData[] = [
        {name: '06:00', lastsale: 355.3}, 
        {name: '07:00', lastsale: 335.3}, 
        {name: '08:00', lastsale: 359.3}, 
        {name: '09:00', lastsale: 355.3}, 
        {name: '10:00', lastsale: 348.3}, 
        {name: '11:00', lastsale: 355.3}, 
        {name: '12:00', lastsale: 359.3}
    ];
    const tooltipContainerStyles:CSSProperties = {
        backgroundColor: 'var(--dark-tertiary)',
        border: 'none',
        borderRadius: 'var(--border-radius-sm)'
    }

    return(
        <div className={styles.stockCardComponent} style={{ '--tooltip-content': `"${stock.name}"`} as React.CSSProperties}>
            <div className={styles.stockCardHeader}>
                <div className={styles.stockNameContainer}>
                    <span className={styles.stockName}>{stock.name}</span>
                </div>
                <div className={styles.aditionalStockInfoContainer}>
                    <span className={styles.stockSymbol}>{stock.lastsale}</span>
                    <div className={styles.favouriteContainer}>
                        <Image src={'/favourite.svg'} alt='favourite button' height={25} width={25} onClick={() => addFavourite(stock)}/>
                    </div>
                </div>
            </div>
            <h4 className={styles.stockValue}>
                {stock.lastsale.toString()}
            </h4>
            <div className={styles.valueHistoryChart}>
                <LineChart width={450} height={160} data={mockData} margin={{top: 10, bottom: 10}}>
                    <CartesianGrid stroke='null'/>
                    <XAxis dataKey="name" fontSize={12}/>
                    <YAxis 
                        orientation='right'
                        dataKey="value"
                        fontSize={12} 
                        width={50}
                        domain={[CalculateMinValueInArray(mockData), CalculateMaxValueInArray(mockData)]}
                    />
                    <Tooltip contentStyle={tooltipContainerStyles} labelStyle={{fontSize: '14px'}} itemStyle={{fontSize: '14px'}} />
                    <Line type="monotone" dataKey="lastsale" stroke={checkLineColor(mockData)}/>
                </LineChart>
            </div>
        </div>
    )
}