import  React, { useState } from "react";
import style from "./css/app.module.css";
import DateRange from "./DateRange";
import DisplayData from "./DisplayData";
import {UnifiedData} from "./Apicall";




function App() {

	const [midnightDataSet, setData] = useState<UnifiedData[]>([]);

	return (
		<div>
			<div className={style.header}>
				<h1>Scrooge&#39;s Coin App</h1>
			</div>
			<div className={style.date}>
				<DateRange callback={setData}/>
			</div>
			<div>
				<DisplayData data={midnightDataSet}/>
			</div>
		</div>
	);
}


export default App;
