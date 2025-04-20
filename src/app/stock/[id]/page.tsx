'use client';
import { IStockData } from "@/app/home/actions/getStocksData";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getStockById from "./actions/getStockById";

export default function StocksDetails(stock: IStockData){
    const params = useParams();
    const id = params.id;

    const {isPending, error: stockError, data: stockData} = useQuery({
        queryKey: ["stockData", id],
        queryFn: () => getStockById(id as string),
    })
    
    return (
        <h1>hola stock numero {params.id}</h1>
    )
}