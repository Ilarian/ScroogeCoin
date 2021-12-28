//Contains functionality to fetch data and format it
import Axios from 'axios';

type rawData = {
    prices: [number, number][]; //number tuples in array
    total_volumes: [number, number][];
    market_caps: [number, number][]
}

export type UnifiedData = {
    timestamp: number; //
    price: number;
    volume: number;
    cap: number;
}

export async function fetchDataArray(start: number, end: number){
   const data: rawData = await apiRequest(start, end)
   const unifiedData: UnifiedData[] = unifyResults(data);
   const midnightDataSet = getMidnightStamps(unifiedData)
   return midnightDataSet; 
}

async function apiRequest(start: number, end: number){
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from="+start+"&to="+end
     return Axios.get(url).then( (result) => {
        return result.data
    })
    
}


//TODO: sort the timestamps ascending incase API starts spewing timestamps in random order, it will break getMidnightStamps function
function unifyResults(data: rawData): UnifiedData[] {
    let unified: UnifiedData[] = [];
    for(let i = 0; i < data.prices.length; i++){
        unified.push({
            timestamp: data.prices[i][0],
            price: data.prices[i][1],
            volume: data.total_volumes[i][1],
            cap: data.market_caps[i][1],
        })
    }
    return unified
}

function getMidnightStamps(data: UnifiedData[]){

    /* Comparing timestamp to previous in array, taking the first stamp of the day
    and filtering out the rest. Should yield closest datapoint to midnight for each day*/
    const midnightData = data.filter((datapoint, index) => {
        const current = new Date(datapoint.timestamp).getUTCDay()
        let old: number = NaN;
        if(index !== 0){
            old = new Date(data[index-1].timestamp).getUTCDay()
        }
        return (old == NaN || current != old)
    })
    return midnightData;
    
}
