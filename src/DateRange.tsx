import React, { useState} from "react";
import {fetchData} from "./Apicall";
import style from "./css/daterange.module.css";
import {UnifiedData} from "./Apicall";

interface Props {
    callback: (res: UnifiedData[]) => void
}

function DateRange(props: Props) {
	const [start, setStart] = useState(NaN);
	const [end, setEnd] = useState(NaN);

	//On submit calls the coingecko api with given dates
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

		//nextDay is used to check that end date can't be later than today
		const nextDay = (Date.now() / 1000 + 86400);
		if(start > end){
			alert("Start date can't be later than end date");
		}else if (end > nextDay) { 
			alert("End date can't be later than today");
		}else{
			fetchData(start, end).then( (res) => props.callback(res));
		}
		event.preventDefault();
	}

	//Added (day - 1 second) to end date timestamp to include actual end date in query
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.valueAsNumber / 1000;
		(event.target.name === "start") ? setStart(value) : setEnd(value  + 86399);
	}

	return(
		<form className={style.container}onSubmit={handleSubmit}>
			<div className={style.containerdiv}>
				<h2>Start date</h2>
				<input name="start" type="date" onChange={handleChange} />

				<h2>End date</h2>
				<input name="end" type="date" onChange={handleChange} />
                
				<button type="submit">Fetch</button>
			</div>
		</form>
	);
}

export default DateRange;