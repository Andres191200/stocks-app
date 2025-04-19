import { IStockData } from "../../actions/getStocksData";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function StocksDetails(stock: IStockData){
    const router = useRouter();

    useEffect(() => {
        console.log('id: ', router.query.id);
    })
    
    return (
        <h1>hola stock numero {router.query.id}</h1>
    )
}