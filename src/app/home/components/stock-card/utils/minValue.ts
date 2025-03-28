import { IMockData } from "../types/data";

function CalculateMinValueInArray(data: IMockData[]) : number{
    const min:number = Math.min(...data.map((data) => data.lastsale));
    return Number((min - (min*0.01)).toFixed(2));
}

export {CalculateMinValueInArray};