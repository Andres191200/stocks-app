import { create } from "zustand";
import { TImmutableStockCard } from "../components/stock-card/types/stockCard";

interface IStocksState{
    favourites: Map<string, TImmutableStockCard>;
    addFavourite: (favourite: TImmutableStockCard) => void,
    deleteFavourite: (favouriteId: string) => void
}

export const useStocksStore = create<IStocksState>((set) => ({
    //EL ID DE CADA OBJETO DEL MAP VA A UTILIZAR EL ID DEL OBJETO ALMACENADO
    favourites: new Map<string, TImmutableStockCard>(),
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
