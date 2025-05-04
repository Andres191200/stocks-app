import SearchBar from '@/app/shared/components/search-bar/SearchBar';
import styles from './styles.module.scss';
import { FILTER_TYPES, SORT_TYPES } from '@/app/shared/utils/filter-types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useCallback, useMemo } from 'react';
import Button from '@/app/shared/components/button/Button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { handleChangeOrderFn, handleChangeQueryFn } from './utils/handleChangeFilters';

const checkSelected = (kind:SORT_TYPES, params: URLSearchParams):boolean => {
  if(params.get(FILTER_TYPES.ORDER) === kind){
    return true;
  }
  return false;
}

export default function Filters(){
    const params = useSearchParams();
    const router = useRouter();
    const updatedParams = useMemo(() => new URLSearchParams(params.toString()), [params]);

    const handleChangeQuery = useDebouncedCallback((query:string, type:FILTER_TYPES) => {
      handleChangeQueryFn(query, type, updatedParams, router);
    }, 1000);

    const handleChangeOrder = useCallback((order:SORT_TYPES) => {
      handleChangeOrderFn(order, updatedParams, router);
    }, []);

    //THIS PREVENT TO CREATE AN ARROW FUNCTION INLINE IN THE COMPONENT PROP AND THEREFORE CREATING A NEW REFERENCE IN EVERY RE-RENDER
    const handleSearchBarChange = useCallback((query:string) => {
      handleChangeQuery(query, FILTER_TYPES.SEARCH)
    }, []);

    
    return(
        <div className={styles.filtersComponent}>
            <SearchBar onChange={handleSearchBarChange} key={updatedParams.toString()}/>
            <div className={styles.sortFilters}>
              <Button kind='toggle' active={checkSelected(SORT_TYPES.ASC, params)} text='A - Z' value={SORT_TYPES.ASC} onClick={(event) => handleChangeOrder((event.target as HTMLButtonElement).value as SORT_TYPES)}/> 
              <Button kind='toggle' active={checkSelected(SORT_TYPES.DESC, params)} text='Z - A' value={SORT_TYPES.DESC} onClick={(event) => handleChangeOrder((event.target as HTMLButtonElement).value as SORT_TYPES)}/> 
              <Button kind='toggle' active={checkSelected(SORT_TYPES.HIGHER, params)} text='Higher price' value={SORT_TYPES.HIGHER} onClick={(event) => handleChangeOrder((event.target as HTMLButtonElement).value as SORT_TYPES)} />
              <Button kind='toggle' active={checkSelected(SORT_TYPES.LOWER, params)} text='Lower price' value={SORT_TYPES.LOWER} onClick={(event) => handleChangeOrder((event.target as HTMLButtonElement).value as SORT_TYPES)} />
            </div>
        </div>
    )
}