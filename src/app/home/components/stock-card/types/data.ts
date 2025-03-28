interface IMockData{
    name: string,
    lastsale: number,
}

type TImmutableMockData = Readonly<IMockData>;

export type {IMockData, TImmutableMockData};