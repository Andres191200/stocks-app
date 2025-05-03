"use client";
import { useQuery } from "@tanstack/react-query";
import StockCardGrid from "../stock-card-grid/StockCardGrid";
import StockCard from "../stock-card/StockCard";
import Skeleton from "../skeleton/Skeleton";
import Error from "@/app/shared/components/error/error";
import IError from "@/app/shared/types/IError";
import getStocksData, { IStockData } from "../../actions/getStocksData";
import styles from "./styles.module.scss";
import { FILTER_TYPES, SORT_TYPES } from "@/app/shared/utils/filter-types";
import Filters from "../filters/Filters";
import { useSearchParams } from "next/navigation";
import Paginator from "../paginator/Paginator";
import { formatStocks } from "./utils/formatStocks";

export default function StockCardSection() {
  const ITEMS_PER_PAGE = 25;
  const params = useSearchParams();
  const currentPage = Number(params.get(FILTER_TYPES.PAGE || 1));
  
  const {
    isPending,
    error: stocksError,
    data: stocks,
  } = useQuery({
    queryKey: ["stocksData", currentPage],
    queryFn: () => getStocksData(currentPage),
  });

 
  if (stocksError) {
    const _error = stocksError as unknown as IError;
    return <Error code={_error.code} errorMessage={_error.errorMessage} />;
  }

  return (
    <div className={styles.stockCardSectionComponent}>
      <Filters />
      {isPending ? (
        <Skeleton />
      ) : (
        <StockCardGrid>
          {formatStocks(stocks)!.length > 0 ? (
            formatStocks(stocks)!.map((stock, idx) => (
              <StockCard stock={stock} key={stock.symbol} idx={idx}/>
            ))
          ) : (
            <p className={styles.noMatchStocks}>No stocks found</p>
          )}
        </StockCardGrid>
      )}
      {/* PAGINATOR NOT WORKING WITH FILTERED ITEMS (THERE IS NO ENDPOINT IN THE API FOR FILTERING) */}
      {/* TODO: SAVE THE FILTERED STOCKS SO THE APP DOESN'T CALL THIS FILTERING CALCULATION FUNCTION MULTIPLE TIMES */}
      {!isPending && formatStocks(stocks)!.length >= ITEMS_PER_PAGE ? (
        <Paginator currentPage={currentPage} pagesQuantity={5} />
      ) : null}
    </div>
  );
}
