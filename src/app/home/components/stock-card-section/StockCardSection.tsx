import { useQuery } from "@tanstack/react-query";
import StockCardGrid from "../stock-card-grid/StockCardGrid";
import StockCard from "../stock-card/StockCard";
import Skeleton from "../skeleton/Skeleton";
import getStocksData from "../actions/getStocksData";
import Error from "@/app/shared/components/error/error";
import IError from "@/app/shared/types/IError";

export default function StockCardSection(){
    const { isPending, error, data: stocks } = useQuery({
      queryKey: ["stocksData"],
      queryFn: async () => {
        try{
          const response = await getStocksData();
          return response.data.body;
        }catch(error) {
          throw {
            code: 'STOCKS_FETCH_ERROR',
            errorMessage: ''
          } as IError;
        }
      }
    });
    
    if(isPending){
        return <Skeleton />
    }
    
    if(error){
      const _error = error as unknown as IError;
      return <Error code={_error.code} errorMessage={_error.errorMessage} />
    }

    return(
      <div>
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