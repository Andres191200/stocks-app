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

function formatPrice(price:String){
  return Number(price.substring(1));
}

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

  function formatStocks(): IStockData[] | undefined {
    const query = params.get(FILTER_TYPES.SEARCH);
    const order = params.get(FILTER_TYPES.ORDER);
    if (query?.trim().length! > 0) {
      return stocks?.filter((stock) =>
        stock.name.toLowerCase().includes(query!.toLowerCase())
      );
    }
    if (order) {
      if (order === SORT_TYPES.ASC) {
        return stocks?.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (order === SORT_TYPES.DESC) {
        return stocks?.sort((a, b) => b.name.localeCompare(a.name));
      }
      if (order === SORT_TYPES.HIGHER) {
        return stocks?.sort((a, b) => formatPrice(a.lastsale.toString()) < formatPrice(b.lastsale.toString()) ? 1 : -1);
      }
      if (order == SORT_TYPES.LOWER) {
        return stocks?.sort((a, b) => formatPrice(a.lastsale.toString()) > formatPrice(b.lastsale.toString()) ? 1 : -1);
      }
    }
    return stocks;
  }

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
          {formatStocks()!.length > 0 ? (
            formatStocks()!.map((stock, idx) => (
              <StockCard stock={stock} key={stock.symbol} idx={idx}/>
            ))
          ) : (
            <p className={styles.noMatchStocks}>No stocks found</p>
          )}
        </StockCardGrid>
      )}
      {/* PAGINATOR NOT WORKING WITH FILTERED ITEMS (THERE IS NO ENDPOINT IN THE API FOR FILTERING) */}
      {/* TODO: SAVE THE FILTERED STOCKS SO THE APP DOESN'T CALL THIS FILTERING CALCULATION FUNCTION MULTIPLE TIMES */}
      {!isPending && formatStocks()!.length >= ITEMS_PER_PAGE ? (
        <Paginator currentPage={currentPage} pagesQuantity={5} />
      ) : null}
    </div>
  );
}
