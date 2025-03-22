import axios, { AxiosPromise } from "axios";

interface IStockData {
    symbol: string,
    name: string,
    lastsale: number,
    netchange: string,
}

export default async function getStocksData(): AxiosPromise<{body: IStockData[]}> {
    return axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v2/markets/tickers?page=1&type=STOCKS`,{headers: {
        'x-rapidapi-key': `${process.env.NEXT_PUBLIC_API_KEY}`
      }}
    );
}