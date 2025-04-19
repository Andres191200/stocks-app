import SearchBar from '@/app/shared/components/search-bar/SearchBar';
import styles from './styles.module.scss';
import { FILTER_TYPES, SORT_TYPES } from '@/app/shared/utils/filter-types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useCallback, useMemo } from 'react';
import Button from '@/app/shared/components/button/Button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const checkSelected = (kind:SORT_TYPES, params: URLSearchParams):boolean => {
  if(params.get('order') === kind){
    return true;
  }
  return false;
}

const updateParams = (key: string, value: string, params: URLSearchParams, router: AppRouterInstance) => {
  if(value){
    params.set(key, value);
  }
  else{
    params.delete(key);
  }

  router.push(`?${params.toString()}`);
}

export default function Filters(){
    const params = useSearchParams();
    const router = useRouter();
    const updatedParams = useMemo(() => new URLSearchParams(params.toString()), [params]);

    const handleChangeQuery = useDebouncedCallback((query:string, type:FILTER_TYPES) => {
      updateParams(FILTER_TYPES.SEARCH, query, updatedParams, router);
    }, 1000);

    const handleChangeOrder = useCallback((order:SORT_TYPES) => {
        updateParams(FILTER_TYPES.ORDER, order, updatedParams, router);
    }, []);

    //THIS PREVENT TO CREATE AN ARROW FUNCTION INLINE IN THE COMPONENT PROP AND THEREFORE CREATING A NEW REFERENCE IN EVERY RE-RENDER
    const handleSearchBarChange = useCallback((query:string) => {
      handleChangeQuery(query, FILTER_TYPES.SEARCH)
    }, []);
    
    return(
        <div className={styles.filtersComponent}>
            <SearchBar onChange={handleSearchBarChange}/>
            <div className={styles.sortFilters}>
              <Button kind='toggle' active={checkSelected(SORT_TYPES.ASC, params)} text='A - Z' value={SORT_TYPES.ASC} onClick={(event) => handleChangeOrder((event.target as HTMLButtonElement).value as SORT_TYPES)}/> 
              <Button kind='toggle' active={checkSelected(SORT_TYPES.DESC, params)} text='Z - A' value={SORT_TYPES.DESC} onClick={(event) => handleChangeOrder((event.target as HTMLButtonElement).value as SORT_TYPES)}/> 
            </div>
        </div>
    )
}