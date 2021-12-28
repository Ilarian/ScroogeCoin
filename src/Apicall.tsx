import Axios from 'axios';

export type ResultData = {
    [key: string]: [number, number][]
}

export function apicall(start: number, end: number){
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from="+start+"&to="+end
    Axios.get(url).then( (result) => {
        const data: ResultData = result.data;
        console.log(data)
        console.log(data.prices);
        console.log(data.abba)
        console.log(data.market_caps[0][0])
    })
    
}