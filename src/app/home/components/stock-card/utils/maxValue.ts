import { IMockData } from "../types/data";

function CalculateMaxValueInArray(data: IMockData[]) : number{
    console.log(data);
    const max:number = Math.max(...data.map((data) => data.lastsale));
    return Number((max + (max*0.01)).toFixed(2));
}

export {CalculateMaxValueInArray};