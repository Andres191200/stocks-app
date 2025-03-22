interface IMockData{
    name: string,
    value: number,
}

type TImmutableMockData = Readonly<IMockData>;

export type {IMockData, TImmutableMockData};