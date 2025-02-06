import { useQuery } from "@tanstack/react-query";
import StockCardGrid from "../stock-card-grid/StockCardGrid";
import StockCard from "../stock-card/StockCard";
import axios from "axios";
import Skeleton from "../skeleton/Skeleton";
import getStocksData from "../actions/getStocksData";

export default function StockCardSection(){
    const { isPending, error, data: stocks } = useQuery({
        queryKey: ["stocksData"],
        queryFn: async () => {
            const response = await getStocksData();
            return response.data.body;
        },
      });
    
    if(isPending){
        return <Skeleton />
    }
    
    return(
        <div>
        <StockCardGrid>
          {
            stocks?.map((stock) => <StockCard name={stock.name} symbol={stock.symbol} value={stock.lastsale} key={stock.symbol}/>)
          }
        </StockCardGrid>
      </div>
    )
}