'use client';
import { IStockData } from "@/app/home/actions/getStocksData";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function StocksDetails(stock: IStockData){
    const params = useParams();

    useEffect(() => {
        console.log('id: ', params.id);
    })
    
    return (
        <h1>hola stock numero {params.id}</h1>
    )
}