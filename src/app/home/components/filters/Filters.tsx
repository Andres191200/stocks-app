import SearchBar from '@/app/shared/components/search-bar/SearchBar';
import styles from './styles.module.scss';
import { FILTER_TYPES, SORT_TYPES } from '@/app/shared/utils/filter-types';
import { useSearchParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import { useCallback } from 'react';
import Button from '@/app/shared/components/button/Button';

const checkSelected = (kind:SORT_TYPES, params: URLSearchParams):boolean => {
  if(params.get('order') === kind){
    return true;
  }
  return false;
}

export default function Filters(){
    const [params, setSearchParams] = useSearchParams();

    const handleChangeQuery = useDebouncedCallback((query:string, type:FILTER_TYPES) => {
        if(query.length > 0){
          setSearchParams((prevParams:URLSearchParams) => {
            return {...prevParams, [type]: query}
          });
        }
        else{
          const formattedSearchParams = new URLSearchParams(params);
          formattedSearchParams.delete(type);
          setSearchParams(formattedSearchParams);
        }
      }, 1000);

    const handleChangeOrder = useCallback((order:SORT_TYPES) => {
        setSearchParams((prevParams:URLSearchParams) => {
            return {...prevParams, [FILTER_TYPES.ORDER]: order}
        })
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