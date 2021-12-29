import React from 'react'
import {UnifiedData} from './Apicall'

type Props = {
    data: UnifiedData[]
}

function DisplayData(props: Props){

    if(props.data.length != 0){
        return (
        <>
            <Bearish data={props.data}/>
            <HighestVolume data={props.data}/>
            <MaxProfit data={props.data}/>
        </>
    )}
    else{
        return <p>No data yet</p>
    }
    
}

function Bearish(props: Props){
    
    return <p>hi from bear</p>
}


//TODO: make own functions for min/max values, DRY
function HighestVolume(props: Props){

    const highestVolume: UnifiedData = props.data.reduce((prev, curr) => {
        return prev.volume > curr.volume ? prev : curr
    })

    return <p>highest volume: {highestVolume.volume}</p>
}

function MaxProfit(props: Props){

    const highestPrice:UnifiedData = props.data.reduce((prev, curr) => {
        return prev.price > curr.price ? prev : curr
    })

    const lowestPrice:UnifiedData = props.data.reduce((prev, curr) => {
        return prev.price < curr.price ? prev : curr
    })

    const highDate = new Date(highestPrice.timestamp).toDateString()
    const lowDate = new Date(lowestPrice.timestamp).toDateString()
    return (
        <>
            <p>Highest: {highestPrice.price} date: {highDate}</p>
            <p>Lowest: {lowestPrice.price} date: {lowDate}</p>
        </>
    )
}


export default DisplayData