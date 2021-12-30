import React, { useState} from 'react';
import {fetchData} from './Apicall';

type Props = {
    callback: Function
}

    function DateRange(props: Props) {
        const [start, setStart] = useState(NaN)
        const [end, setEnd] = useState(NaN)

        //TODO: implement check for correct dates, IE. start date can't be later than end date.
        function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            fetchData(start, end).then( (res) => props.callback(res))
            event.preventDefault()
        }

        //Added (day - 1 second) to end date timestamp to include actual end date in query
        function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
            const value = event.target.valueAsNumber / 1000;
            (event.target.name === "start") ? setStart(value) : setEnd(value  + 86399)
        }


        return(
            <form onSubmit={handleSubmit}>
                <label>Start date:
                    <input name="start" type="date" onChange={handleChange} />
                </label>

                <label>End date:
                    <input name="end" type="date" onChange={handleChange} />
                </label>
                <br></br>
                <button type="submit">Set dates</button>
            </form>
        );
    }

export default DateRange;