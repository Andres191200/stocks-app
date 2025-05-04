import { FILTER_TYPES, SORT_TYPES } from "@/app/shared/utils/filter-types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useDebouncedCallback } from "use-debounce";

const updateParams = (key: string, value: string, params: URLSearchParams, router: AppRouterInstance) => {
  if(value){
    params.set(key, value);
  }
  else{
    params.delete(key);
  }

  router.push(`?${params.toString()}`);
}

const handleChangeQueryFn = (query:string, type:FILTER_TYPES, updatedParams: URLSearchParams, router: AppRouterInstance ) => {
    updateParams(FILTER_TYPES.ORDER, '', updatedParams, router);
    updateParams(FILTER_TYPES.SEARCH, query, updatedParams, router);
  };

  const handleChangeOrderFn = (order:SORT_TYPES, updatedParams: URLSearchParams, router: AppRouterInstance) => {
      updateParams(FILTER_TYPES.SEARCH, '', updatedParams, router);
      updateParams(FILTER_TYPES.ORDER, order, updatedParams, router);
  };



  export {handleChangeQueryFn, handleChangeOrderFn};