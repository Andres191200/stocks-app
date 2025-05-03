import { IStockData } from "@/app/home/actions/getStocksData";
import { FILTER_TYPES, SORT_TYPES } from "@/app/shared/utils/filter-types";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

function formatPrice(price:String){
    return Number(price.substring(1));
  }

export function formatStocks(stocks: IStockData[], params:ReadonlyURLSearchParams
): IStockData[] | undefined {
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
