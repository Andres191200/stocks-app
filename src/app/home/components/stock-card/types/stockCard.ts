import { IMockData } from "./data";

interface IStockCard extends IMockData{
    symbol: string,
    valueHistory?: number[]
}

type TImmutableStockCard = Readonly<IStockCard>;

export type {IStockCard, TImmutableStockCard};
