import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './styles.module.scss';
import { CSSProperties, useRef } from 'react';
import { TImmutableStockCard } from './types/stockCard';
import { TImmutableMockData } from './types/data';
import { CalculateMinValueInArray } from './utils/minValue';
import { CalculateMaxValueInArray } from './utils/maxValue';

function checkLineColor(data: TImmutableMockData[]) : string{
    return data[0].value > data[data.length - 1].value ? '#a00' : '#0a0' 
}

export default function StockCard({ name, symbol, value, valueHistory = [] }: TImmutableStockCard){
    const mockData:TImmutableMockData[] = [
        {name: '06:00', value: 355.3}, 
        {name: '07:00', value: 335.3}, 
        {name: '08:00', value: 359.3}, 
        {name: '09:00', value: 355.3}, 
        {name: '10:00', value: 348.3}, 
        {name: '11:00', value: 355.3}, 
        {name: '12:00', value: 359.3}
    ];
    const tooltipContainerStyles:CSSProperties | undefined = {
        backgroundColor: 'var(--dark-tertiary)',
        border: 'none',
        borderRadius: 'var(--border-radius-sm)'
    }

    return(
        <div className={styles.stockCardComponent} style={{ '--tooltip-content': `"${name}"`} as React.CSSProperties}>
            <div className={styles.stockCardHeader}>
                <div className={styles.stockNameContainer}>
                    <span className={styles.stockName}>{name}</span>
                </div>
                <div className={styles.aditionalStockInfoContainer}>
                    <span className={styles.stockSymbol}>{symbol}</span>
                    <div className={styles.favouriteContainer}>
                        <p>fav</p>
                    </div>
                </div>
            </div>
            <h4 className={styles.stockValue}>
                {value.toString()}
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
                    <Line type="monotone" dataKey="value" stroke={checkLineColor(mockData)}/>
                </LineChart>
            </div>
        </div>
    )
}