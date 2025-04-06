import IError from "@/app/shared/types/IError";
import axios from "axios";

export default async function getStocksDataByName(query:string){
    try{
        const response = await fetchData(query);
        return response.data.body;
    } catch(error){
        throw {
            code: 'STOCKS_SEARCH_ERROR',
            message: '',
        } as IError
    }
}

function fetchData(query:string){
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/search?search=${query}`, {headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEY,
    }}
  );
}