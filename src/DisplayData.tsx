import React from 'react'
import {UnifiedData} from './Apicall'

type Props = {
    data: UnifiedData[]
}

function DisplayData(props: Props){
    return (
        <>
            <Bearish data={props.data}/>
            <HighestVolume data={props.data}/>
            <MaxProfit data={props.data}/>
        </>
    )
    
}

function Bearish(props: Props){
    
    return <p>hi from bear</p>
}

function HighestVolume(props: Props){
    return <p>hi from vol</p>
}

function MaxProfit(props: Props){
    return <p>hi from profit</p>
}

export default DisplayData