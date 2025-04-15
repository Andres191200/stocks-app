import { RefetchOptions, useQuery } from "@tanstack/react-query";
import StockCardGrid from "../stock-card-grid/StockCardGrid";
import StockCard from "../stock-card/StockCard";
import Skeleton from "../skeleton/Skeleton";
import Error from "@/app/shared/components/error/error";
import IError from "@/app/shared/types/IError";
import SearchBar from "@/app/shared/components/search-bar/SearchBar";
import getStocksData, { IStockData } from "../../actions/getStocksData";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router";
import styles from './styles.module.scss';
import {FILTER_TYPES, ORDER_TYPES} from "@/app/shared/utils/filter-types";
import Filters from "../filters/Filters";

export default function StockCardSection(){
  const [params, setSearchParams] = useSearchParams();

  const { isPending, error: stocksError, data: stocks } = useQuery({
    queryKey: ["stocksData"],
    queryFn: getStocksData,
  });

  function formatStocks():IStockData[] | undefined{
    const query = params.get(FILTER_TYPES.SEARCH);
    const order = params.get(FILTER_TYPES.ORDER);
    if((query?.trim().length)! > 0){
      return stocks?.filter((stock) => stock.name.toLowerCase().includes(query!.toLowerCase()));
    }
    if(order){
      if(order === ORDER_TYPES.ASC){
        return stocks?.sort((a,b) => a.name.localeCompare(b.name));
      }
      else{
        return stocks?.sort((a,b) => b.name.localeCompare(a.name));
      }
    }
    return stocks;
  }

  if(isPending){
      return <Skeleton />
  }
  
  if(stocksError){
    const _error = stocksError  as unknown as IError;
    return <Error code={_error.code} errorMessage={_error.errorMessage} />
  }
  return(
    <div className={styles.stockCardSectionComponent}>
      <Filters />
      <StockCardGrid>
        {
          formatStocks()!.length > 0 ? formatStocks()!.map((stock) => 
            <StockCard 
            stock={stock}
            key={stock.symbol}
          />
          ) : <p className={styles.noMatchStocks}>No stocks found</p>
        }
      </StockCardGrid>
    </div>
  )
}