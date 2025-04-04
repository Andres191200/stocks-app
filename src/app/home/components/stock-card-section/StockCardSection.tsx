import { useQuery } from "@tanstack/react-query";
import StockCardGrid from "../stock-card-grid/StockCardGrid";
import StockCard from "../stock-card/StockCard";
import Skeleton from "../skeleton/Skeleton";
import Error from "@/app/shared/components/error/error";
import IError from "@/app/shared/types/IError";
import SearchBar from "@/app/shared/components/search-bar/SearchBar";
import getStocksData from "../../actions/getStocksData";
import { useCallback, useEffect, useState } from "react";
import getStocksDataByName from "../../actions/getStocksDataByName";

export default function StockCardSection(){
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    //TO DO: HERE THE STATE IS UPDATING CORRECTLY BUT INCORRECTLY WHEN CALLS FETCHSTOCKSBYNAME.
    console.log('search updated: ', search);
    if(search.trim().length > 0){
      fetchStocksByName();
    }
  },[search]);
  
  const { isPending, error: stocksError, data: stocks } = useQuery({
    queryKey: ["stocksData"],
    queryFn: getStocksData,
  });

  const { isFetching, error: searchError, data: filteredStocks, refetch: fetchStocksByName } = useQuery({
    queryKey: ["stocksData", search],
    queryFn: () => getStocksDataByName(search),
    enabled: false,
  });

  const filterStocks = useCallback((query: string) => {
    setSearch(query);
  },[fetchStocksByName]);
  
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