import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './styles.module.scss';
import { CSSProperties, useEffect, useRef } from 'react';
import { IStockCard, TImmutableStockCard } from './types/stockCard';
import { TImmutableMockData } from './types/data';
import { CalculateMinValueInArray } from './utils/minValue';
import { CalculateMaxValueInArray } from './utils/maxValue';
import Image from 'next/image';
import { useStocksStore } from '../store/store';
import { IStockData } from '../actions/getStocksData';
import { mockData, mockData2 } from './utils/mockData';

function checkLineColor(data: TImmutableMockData[]) : string{
    return data[0].lastsale > data[data.length - 1].lastsale ? '#a00' : '#0a0' 
}

// CHECKS INITIAL CHARACTER OF AN STOCK NAME JUST TO GET A DIFFERENT CHART DATA
function checkData(stockName:string):TImmutableMockData[]{
    if(stockName.at(0)?.toLowerCase() === 'a'){
        return mockData;
    }
  return mockData2;
}

export default function StockCard({stock}: {stock: IStockData}){
    const {addFavourite, deleteFavourite, favourites} = useStocksStore();

    const tooltipContainerStyles:CSSProperties = {
        backgroundColor: 'var(--dark-tertiary)',
        border: 'none',
        borderRadius: 'var(--border-radius-sm)'
    }

    useEffect(() => {

    },[])

    return(
        <div className={styles.stockCardComponent} style={{ '--tooltip-content': `"${stock.name}"`} as React.CSSProperties}>
            <div className={styles.stockCardHeader}>
                <div className={styles.stockNameContainer}>
                    <span className={styles.stockName}>{stock.name}</span>
                </div>
                <div className={styles.aditionalStockInfoContainer}>
                    <span className={styles.stockSymbol}>{stock.lastsale}</span>
                    <div className={styles.favouriteContainer}>
                        {
                            favourites.has(stock.symbol) 
                            ? <Image src={'/favourite-filled.svg'} alt='favourite button' height={25} width={25} onClick={() => deleteFavourite(stock.symbol)}/>
                            : <Image src={'/favourite.svg'} alt='favourite button' height={25} width={25} onClick={() => addFavourite(stock)}/>
                        }
                    </div>
                </div>
            </div>
            <h4 className={styles.stockValue}>
                {stock.lastsale.toString()}
            </h4>
            <div className={styles.valueHistoryChart}>
                <LineChart width={450} height={160} data={checkData(stock.name)} margin={{top: 10, bottom: 10}}>
                    <CartesianGrid stroke='null'/>
                    <XAxis dataKey="name" fontSize={12}/>
                    <YAxis 
                        orientation='right'
                        dataKey="value"
                        fontSize={12} 
                        width={50}
                        domain={[CalculateMinValueInArray(checkData(stock.name)), CalculateMaxValueInArray(checkData(stock.name))]}
                    />
                    <Tooltip contentStyle={tooltipContainerStyles} labelStyle={{fontSize: '14px'}} itemStyle={{fontSize: '14px'}} />
                    <Line type="monotone" dataKey="lastsale" stroke={checkLineColor(checkData(stock.name))}/>
                </LineChart>
            </div>
        </div>
    )
}