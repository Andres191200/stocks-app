import IError from "@/app/shared/types/IError";
import axios, { AxiosPromise } from "axios";

export interface IStockData {
  symbol: string;
  name: string;
  lastsale: number;
  netchange: string;
}

export default async function getStocksData(): Promise<IStockData[]> {
  try {
    const response = await fetchData();
    return response.data.body;
  } catch (error) {
    throw {
      code: "STOCKS_FETCH_ERROR",
      errorMessage: "",
    } as IError;
  }
}

function fetchData(): AxiosPromise<{ body: IStockData[] }> {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v2/markets/tickers?page=1&type=STOCKS`,
    {
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
}
