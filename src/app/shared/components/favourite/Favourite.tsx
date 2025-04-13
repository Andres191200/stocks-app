import { TImmutableStockCard } from '@/app/home/components/stock-card/types/stockCard';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useStore } from 'zustand';
import { useStocksStore } from '@/app/home/store/store';
import toast, { Toaster } from 'react-hot-toast';
import toastOptions from '../../utils/toastOptons';
import { useEffect, useRef } from 'react';

function notifyFavouriteDeleted(){
    toast("Favourite deleted!", toastOptions["FAVOURITE_DELETED"]);
}

function deleteFav(favKey:string, deleteFavourite:(key:string) => void):void {
    notifyFavouriteDeleted();
    deleteFavourite(favKey);
}

export default function Favourite({favourite, favKey}: {favourite: TImmutableStockCard, favKey:string}){
    const {deleteFavourite} = useStocksStore();
    const favouriteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        var ctx = gsap.context()
    },[])

    return(
        <div className={styles.favouriteComponent} ref={favouriteRef}>
            <div className={styles.favouriteContainer}>
                <span>{favourite.name}</span>
                <span>{favKey}</span>
            </div>
            <div className={styles.deleteFavouriteContainer}>
                <button type="button" onClick={() => deleteFav(favKey, deleteFavourite)}>
                    <Image src={'/trash.svg'} alt='delete fav' height={25} width={25} />
                </button>
            </div>
        </div>
    )
}