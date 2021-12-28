import React, { useState } from 'react';
import {apicall} from './Apicall';

    function DateRange() {
        const [start, setStart] = useState(NaN)
        const [end, setEnd] = useState(NaN)


        function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            apicall(start, end)
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