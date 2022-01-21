import React from "react";
import {UnifiedData} from "../Apicall";
import style from "../css/datadisplay.module.css";
import VolumeData from "./VolumeData";
import MaxProfit from "./ProfitData";
import BearishData from "./BearishData";

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

export default DisplayData;