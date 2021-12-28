//This file is used to fetch data and format it
import Axios from 'axios';

const millisInDay = 1000*60*60*24

type rawData = {
    prices: [number, number][];
    total_volumes: [number, number][];
    market_caps: [number, number][]
}

type UnifiedData = {
    timestamp: number;
    price: number;
    volume: number;
    cap: number;
}

export async function fetchDataArray(start: number, end: number){
   const data: rawData = await apiRequest(start, end)
   const unifiedData: UnifiedData[] = unifyResults(data);
   const midnightDataSet = getMidnightStamps(unifiedData) 
   //highestVolume(data.total_volumes) //passing an array consisting of [dateAsMillis, 24h volume] arrays
}

async function apiRequest(start: number, end: number){
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from="+start+"&to="+end
     return Axios.get(url).then( (result) => {
        return result.data
    })
    
}

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
    console.log(data.length)
    const midnightData = data.filter((datapoint, index) => {
        const current = new Date(datapoint.timestamp).getUTCDay()
        let old = null;
        if(index !== 0){
            old = new Date(data[index-1].timestamp).getUTCDay()
        }
        return (old == null || current != old)
    })
    console.log(midnightData);
    
}

function highestVolume(data: []) {

}




//data.prices
//data.total_volumes
//data.market_caps
//47 695 238 999.5091