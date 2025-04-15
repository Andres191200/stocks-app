import SearchBar from '@/app/shared/components/search-bar/SearchBar';
import styles from './styles.module.scss';
import { FILTER_TYPES, ORDER_TYPES } from '@/app/shared/utils/filter-types';
import { useSearchParams } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';


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

    const handleChangeOrder = (order:ORDER_TYPES) => {
        setSearchParams((prevParams:URLSearchParams) => {
            return {...prevParams, [FILTER_TYPES.ORDER]: order}
        })
    }
    
    return(
        <div className={styles.filtersComponent}>
            <SearchBar onChange={(query) => handleChangeQuery(query, FILTER_TYPES.SEARCH)}/>
            <button value={ORDER_TYPES.ASC} onClick={(event) => handleChangeOrder((event.target as HTMLButtonElement).value as ORDER_TYPES)}>A-Z</button>
            <button value={ORDER_TYPES.DESC} onClick={(event) => handleChangeOrder((event.target as HTMLButtonElement).value as ORDER_TYPES)}>Z-A</button>
        </div>
    )
}