import { create } from "zustand";
import { TImmutableStockCard } from "../components/stock-card/types/stockCard";

enum ETheme{
    light = 'light',
    dark = 'dark',
}

interface IStocksState{
    favourites: Map<string, TImmutableStockCard>,
    addFavourite: (favourite: TImmutableStockCard) => void,
    deleteFavourite: (favouriteId: string) => void,
    toggleTheme: () => void,
    theme: ETheme,
}

export const useStocksStore = create<IStocksState>((set) => ({
    //EVERY STOCK IN THE FAV. ARRAY HAS IT'S STOCK SYMBOL AS IT'S KEY (UNIQUE IDENTIFIER)
    favourites: new Map<string, TImmutableStockCard>(),
    theme: ETheme.dark,
    //REALLY NEED THE VALUE OF TARGET THEME AS A PARAM?
    toggleTheme: () => set((state: IStocksState) => ({
        theme: state.theme === ETheme.dark ? ETheme.light : ETheme.dark,
    })),
    addFavourite: (favourite:TImmutableStockCard ) => set((state: IStocksState) => ({
        favourites: new Map(state.favourites).set(favourite.symbol, {...favourite}),
    })),
    deleteFavourite: (favouriteId: string) => set((state: IStocksState) => {
        const updatedFavourites:Map<string, TImmutableStockCard> = new Map(state.favourites);
        updatedFavourites.delete(favouriteId)
        return {
            favourites: updatedFavourites
        }
    })
}));
