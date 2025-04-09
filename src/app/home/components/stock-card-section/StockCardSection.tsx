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

export default function StockCardSection(){
  const [params, setSearchParams] = useSearchParams();

  const { isPending, error: stocksError, data: stocks } = useQuery({
    queryKey: ["stocksData"],
    queryFn: getStocksData,
  });

  const handleChange = useDebouncedCallback((query:string) => {
    console.log('query: ', query);
    setSearchParams((prevParams) => {
      return {...prevParams, search: query}
    })
  }, 1000);

  function formatStocks():IStockData[] | undefined{
    const query = params.get('search');
    if((query?.trim().length)! > 0){
      return stocks?.filter((stock) => stock.name.toLowerCase().includes(query!.toLowerCase()));
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
      <SearchBar onChange={(query) => handleChange(query)}/>
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