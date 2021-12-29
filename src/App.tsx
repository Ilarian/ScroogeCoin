import  { useState } from 'react';
import './App.css';
import DateRange from './DateRange'
import DisplayData from './DisplayData'
import {UnifiedData} from './Apicall'




function App() {

  const [midnightDataSet, setData] = useState<UnifiedData[]>([])

  console.log(midnightDataSet);
  
  
  return (
    <>
      <div>
        <DateRange callback={setData}/>
      </div>
      <div>
        <DisplayData data={midnightDataSet}/>
      </div>
    </>
  );
}


export default App;
