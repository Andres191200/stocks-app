import { useQuery } from "@tanstack/react-query";
import StockCardGrid from "../stock-card-grid/StockCardGrid";
import StockCard from "../stock-card/StockCard";
import Skeleton from "../skeleton/Skeleton";
import Error from "@/app/shared/components/error/error";
import IError from "@/app/shared/types/IError";
import SearchBar from "@/app/shared/components/search-bar/SearchBar";
import getStocksData from "../../actions/getStocksData";

function filterStocks(query:string):void{

}

export default function StockCardSection(){
    const { isPending, error: stocksError, data: stocks } = useQuery({
      queryKey: ["stocksData"],
      queryFn: getStocksData,
    });
    const { isFetching, error: searchError, data: filteredStocks, refetch } = useQuery({
      queryKey: ["stocksData", search],
      queryFn: () => getStocksData(search),
      enabled: false,
    });
    
    if(isPending || isFetching){
        return <Skeleton />
    }
    
    if(stocksError || searchError){
      const _error = (stocksError || searchError) as unknown as IError;
      return <Error code={_error.code} errorMessage={_error.errorMessage} />
    }

    return(
      <div>
        <SearchBar onChange={(query) => filterStocks(query)}/>
        <StockCardGrid>
          {
            stocks?.map((stock) => 
              <StockCard 
              stock={stock}
              key={stock.symbol}
            />
            )
          }
        </StockCardGrid>
      </div>
    )
}