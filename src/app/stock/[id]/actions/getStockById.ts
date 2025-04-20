import IError from "@/app/shared/types/IError";
import { QueryOptions } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

export interface IStockData {

}

export default async function getStockById(id: string): Promise<any> {
  try {
    const response = await fetchData(id);
    console.log('res: ', response);
  } catch (error) {
    throw {} as IError;
  }
}

async function fetchData(id: string):AxiosPromise<{body: IStockData}> {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/markets/stock/modules?ticker=${id}&module=asset-profile`,
    {
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
}
