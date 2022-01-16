import React from "react";
import {UnifiedData} from "./Apicall";
import style from "./css/datadisplay.module.css";

interface Props {
    data: UnifiedData[];
}

function VolumeData(props: Props){

	//Using reduce instead of Math.max because we want the element, not just the highest value
	const highestVolume: UnifiedData = props.data.reduce((prev, curr) => {
		return prev.volume > curr.volume ? prev : curr;
	});

	//Data formatting
	const volumeDate = new Date(highestVolume.timestamp).toDateString();
	const formattedVolume: number = +highestVolume.volume.toFixed(0);
	const newFormat = Intl.NumberFormat().format(formattedVolume);

	return(
		<div className={style.center}>
			<p>{newFormat}€</p>
			<p>Traded on {volumeDate}📅</p>
		</div>
	);
}

export default VolumeData;