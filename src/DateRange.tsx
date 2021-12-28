import App from './App'
import React, {Props, useState} from 'react';
import {fetchDataArray, UnifiedData} from './Apicall';


    function DateRange(props: any) {
        const [start, setStart] = useState(NaN)
        const [end, setEnd] = useState(NaN)

        
        function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            fetchDataArray(start, end).then( (res) => props.onCallback(res))
            event.preventDefault()
        }

        function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
            const value = event.target.valueAsNumber / 1000;
            (event.target.name === "start") ? setStart(value) : setEnd(value)
        }


        return(
            <form onSubmit={handleSubmit}>
                <label>Start date:
                    <input name="start" type="date" onChange={handleChange} />
                </label>

                <label>End date:
                    <input name="end" type="date" onChange={handleChange} />
                </label>
                <button type="submit">Set dates</button>
            </form>
        );
    }

export default DateRange;