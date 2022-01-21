import React from "react";
import {UnifiedData} from "../Apicall";
import style from "../css/datadisplay.module.css";
interface Props {
    data: UnifiedData[]
}

function BearishData(props: Props){

	const bearishPoints: UnifiedData[] = calculateBearishTrend(props);

	const bearishStart: Date = new Date(bearishPoints[0].timestamp);
	const bearishEnd: Date = new Date(bearishPoints[1].timestamp);
	const longestBearish = (bearishEnd.getTime() - bearishStart.getTime()) / (1000 * 60 * 60 * 24 );

	if(longestBearish > 0){
		return (
			<div className={style.center}>
				<p>📉 Bearish trend: {longestBearish.toFixed(0)} days</p>
				<p>Started {bearishStart.toDateString()}</p>
				<p>Ended {bearishEnd.toDateString()}</p>
			</div>
		);
	}else{
		return (
			<div className={style.center}>
				<p>Bitcoin has only went up! 📈</p>
			</div>
		);
	}
}

function calculateBearishTrend(props: Props): UnifiedData[]{
	const bearishPoints: UnifiedData[] = [props.data[0], props.data[0]];
	let startPoint: UnifiedData = props.data[0];
	let longestBearish = 0;
	let bearish = 0;

	for(let i = 1; i < props.data.length; i++){

		const previousPoint: UnifiedData = props.data[i-1];
		const currentPoint: UnifiedData = props.data[i];
		if(currentPoint.price < previousPoint.price){
			bearish++;
		}else{
			startPoint = currentPoint;
			bearish = 0;
		}

		if (bearish > longestBearish){
			longestBearish = bearish;
			bearishPoints[0] = startPoint;
			bearishPoints[1] = currentPoint;
		}

	}

	return bearishPoints;
}

export default BearishData;
