import IError from "@/app/shared/types/IError";
import axios, { AxiosPromise } from "axios";

export interface IStockData {
  symbol: string;
  name: string;
  lastsale: number;
  netchange: string;
}

export default async function getStocksData(page:number): Promise<IStockData[]> {
  try {
    const response = await fetchData(page);
    return response.data.body;
  } catch (error) {
    throw {
      code: "STOCKS_FETCH_ERROR",
      errorMessage: "",
    } as IError;
  }
}

function fetchData(page:number = 1): AxiosPromise<{ body: IStockData[] }> {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v2/markets/tickers?page=${page}&type=STOCKS`,
    {
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
}
