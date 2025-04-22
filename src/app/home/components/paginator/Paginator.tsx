import { useRouter, useSearchParams } from 'next/navigation';
import PaginatorButton from './paginator-button/PaginatorButton';
import styles from './styles.module.scss';
import { useMemo } from 'react';
import { FILTER_TYPES } from '@/app/shared/utils/filter-types';

interface IPaginator {
    currentPage: number;
    pagesQuantity: number;
}

export default function Paginator({ currentPage, pagesQuantity }: IPaginator){
    const searchParams = useSearchParams();
    const router = useRouter();
    const updatedParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

    function onClick(page:number){
        updatedParams.set(FILTER_TYPES.PAGE, page.toString());
        router.push(`?${updatedParams.toString()}`);
    }
    
    
    return(
        <div className={styles.paginatorComponent}>
            {
                Array.from([1,2,3,4,5], (idx) => <PaginatorButton number={idx} onClick={onClick}/>)
            }
        </div>
    )
}