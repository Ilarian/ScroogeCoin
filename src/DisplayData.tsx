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
        <div className={style.info}>
            <div className={style.datacard}>
                <h1>Bearish</h1>
                <Bearish data={props.data}/>
            </div>
            <div className={style.datacard}>
                <h1>24h Volume</h1>
                <HighestVolume data={props.data}/>
            </div>
            <div className={style.datacard}>
                <h1>Timemachine</h1>
                <MaxProfit data={props.data}/>
            </div>
        </div>
        </>
    )}
    else{
        return <h1 className={style.nodata}>Please enter date range and fetch bitcoin data</h1>
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
            bearishPoints[1] = currentPoint
        }

    }

    const bearishStart: String = new Date(bearishPoints[0].timestamp).toDateString()
    const bearishEnd: String = new Date(bearishPoints[1].timestamp).toDateString()

   if(longestBearish > 0){
       return (
        <div className={style.center}>
            <p>📉 Bearish trend: {longestBearish} days</p>
            <p>Started {bearishStart}</p>
            <p>Ended {bearishEnd}</p>
        </div>
       )
   }else{
       return <p>Bitcoin has only went up! 📈</p>
   }
}


//TODO: make own functions for min/max values, DRY
function HighestVolume(props: Props){

    const highestVolume: UnifiedData = props.data.reduce((prev, curr) => {
        return prev.volume > curr.volume ? prev : curr
    })


    const volumeDate = new Date(highestVolume.timestamp).toDateString()

    const formattedVolume: number = +highestVolume.volume.toFixed(0)
    const newFormat = Intl.NumberFormat().format(formattedVolume);


    return(
        <div className={style.center}>
            <p>{newFormat}€</p>
            <p>Traded on {volumeDate}📅</p>
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
                <p>Buy: {buyDate} 📅</p>
                <p>Sell: {sellDate} 📅</p>
                <p>Profit per bitcoin: {formattedProfit}€</p>
            </div>
        )
    }else{
        return (
            <div className={style.center}>
                <p>No money to be made in give range</p>
                <p>💸💸💸</p>
            </div>
            )
    }

   
}


export default DisplayData