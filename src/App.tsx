import  { useState } from 'react';
import './App.css';
import DateRange from './DateRange'
import {UnifiedData} from './Apicall'




function App() {

  

  const [midnightDataSet, setData] = useState<UnifiedData[] | null>(null)

  
  
  function DisplayData(){
    return (midnightDataSet != null) ? <p>{midnightDataSet[0].price}</p> : <p>No data to display!</p>
  }

  return (
    <div>
      <DateRange onCallback={setData}/>
      <DisplayData />
      <p>{midnightDataSet}</p>
    </div>
  );
}


export default App;
