import  { useState } from 'react';
import style from './css/app.module.css';
import DateRange from './DateRange'
import DisplayData from './DisplayData'
import {UnifiedData} from './Apicall'




function App() {

  const [midnightDataSet, setData] = useState<UnifiedData[]>([])

  console.log(midnightDataSet);
  
  
  return (
    <>
      <div className={style.header}>
        <h1>Scrooge's Coin App</h1>
      </div>
      <div className={style.date}>
        <DateRange callback={setData}/>
      </div>
      <div className={style.info}>
        <DisplayData data={midnightDataSet}/>
      </div>
    </>
  );
}


export default App;
