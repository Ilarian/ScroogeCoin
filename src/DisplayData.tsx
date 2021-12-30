import React from 'react'
import {UnifiedData} from './Apicall'
import style from './css/datadisplay.module.css'

type Props = {
    data: UnifiedData[]
}

function DisplayData(props: Props){

    if(props.data.length !== 0){
        return (
        <>
    
            <div className={style.datacard}><Bearish data={props.data}/></div>
            <div className={style.datacard}><HighestVolume data={props.data}/></div>
            <div className={style.datacard}><MaxProfit data={props.data}/></div>
        </>
    )}
    else{
        return <p>No data yet</p>
    }
    
}

function Bearish(props: Props){
    let bearishPoints: UnifiedData[] = [props.data[0], props.data[0]]
    let startPoint: UnifiedData = props.data[0];
    let longestBearish: number = 0;
    let bearish: number = 0;

    for(let i = 1; i < props.data.length; i++){

        let previousPoint: UnifiedData = props.data[i-1];
        let currentPoint: UnifiedData = props.data[i];
        if(currentPoint.price < previousPoint.price){
            bearish++;
        }else{
            startPoint = currentPoint
            bearish = 0
        }

        if (bearish > longestBearish){
            longestBearish = bearish
            bearishPoints[0] = startPoint
            bearishPoints[1] = previousPoint
        }

    }

   if(longestBearish > 0){
       return (
        <div className={style.center}>
            <p>Bearish trend: {longestBearish} days</p>
        </div>
       )
   }else{
       return <p>No bearish trend detected =)</p>
   }
}


//TODO: make own functions for min/max values, DRY
function HighestVolume(props: Props){

    const highestVolume: UnifiedData = props.data.reduce((prev, curr) => {
        return prev.volume > curr.volume ? prev : curr
    })

    return(
        <div className={style.center}>
        <p>highest volume: {highestVolume.volume}</p>
        </div>
        )
}

function MaxProfit(props: Props){

    //[0] stores the point to buy at and [1] the point to sell at for max profits
    let profitDataPoints: UnifiedData[] = [props.data[0], props.data[0]];
    let minPoint: UnifiedData = props.data[0];
    let maxProfit: number = 0;


    /*Loops over datapoint prices, comparing current datapoint price to lowest price and updating lowest price if necessary.
    Saves the datapoints that produce maximum profit into the profitDataPoints array*/
    for(let i = 1; i < props.data.length; i++){
        const sellPoint: UnifiedData = props.data[i]
        let profit = sellPoint.price - minPoint.price
        if (profit > maxProfit){
            maxProfit = profit;
            profitDataPoints[0] = minPoint
            profitDataPoints[1] = sellPoint
        }else if(profit < 0){
            minPoint = sellPoint
        }
    }

    //Data formatting
    const buyDate: String = new Date(profitDataPoints[0].timestamp).toDateString();
    const sellDate: String = new Date(profitDataPoints[1].timestamp).toDateString();
    const formattedProfit = maxProfit.toFixed(2)

    if(maxProfit > 0){
        return (
            <div className={style.center}>
                <p>📅 buy: {buyDate}</p>
                <p>📅 sell: {sellDate}</p>
                <p>😃 Profit per bitcoin : {formattedProfit}€</p>
            </div>
        )
    }else{
        return <p>No money to be made in the given date range :/</p>
    }

   
}


export default DisplayData