import React from "react";
import {UnifiedData} from "./Apicall";
import BearishData from "./BearishData";
import style from "./css/datadisplay.module.css";
import VolumeData from "./VolumeData";

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
						<BearishData data={props.data}/>
					</div>
					<div className={style.datacard}>
						<h1>Highest Volume</h1>
						<VolumeData data={props.data}/>
					</div>
					<div className={style.datacard}>
						<h1>Timemachine</h1>
						<MaxProfit data={props.data}/>
					</div>
				</div>
			</>
		);}
	else{
		return <h1 className={style.nodata}>Please enter date range and fetch bitcoin data</h1>;
	}
    
}

function MaxProfit(props: Props){

	//[0] stores the point to buy at and [1] the point to sell at for max profits
	const profitDataPoints: UnifiedData[] = [props.data[0], props.data[0]];
	let minPoint: UnifiedData = props.data[0];
	let maxProfit = 0;
	console.log(props.data);

	/*Loops over datapoint prices, comparing current datapoint price to lowest price
	and updating lowest price if necessary.
    Saves the datapoints that produce maximum profit into the profitDataPoints array*/
	for(let i = 1; i < props.data.length; i++){
		const sellPoint: UnifiedData = props.data[i];
		const profit = sellPoint.price - minPoint.price;
		if (profit > maxProfit){
			maxProfit = profit;
			profitDataPoints[0] = minPoint;
			profitDataPoints[1] = sellPoint;
		}else if(profit < 0){
			minPoint = sellPoint;
		}
	}

	//Data formatting
	const buyDate: string = new Date(profitDataPoints[0].timestamp).toDateString();
	const sellDate: string = new Date(profitDataPoints[1].timestamp).toDateString();
	const formattedProfit = maxProfit.toFixed(2);

	if(maxProfit > 0){
		return (
			<div className={style.center}>
				<p>Buy: {buyDate} 📅</p>
				<p>Sell: {sellDate} 📅</p>
				<p>Profit per bitcoin: {formattedProfit}€</p>
			</div>
		);
	}else{
		return (
			<div className={style.center}>
				<p>No money to be made in given range</p>
				<p>💸💸💸</p>
			</div>
		);
	}
   
}

export default DisplayData;