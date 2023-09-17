import React, { useState, useEffect } from 'react';
import '../componentsStyle/DateForm.css'

function DateForm({ onSelectedDate }){
    const getCurrentDateLimit = () => {
        const date = new Date();
        const todayYear = date.getFullYear();
        const todayMonth =  date.getMonth() + 1;
        return `${todayYear}-${todayMonth < 10 ? '0' : ''}${todayMonth}`;
        //if month is september it will return 9, so
        //we add 0 in case if the month is under 10 fo the string
        //of the date
    }
    const [date, setDate] = useState(getCurrentDateLimit())
    const maxDateToGet = getCurrentDateLimit();
    useEffect(() => {
        onSelectedDate(date);
    }, ); // We do this If you click submit without choosing a date, even though it says current month
    // the real value of date in Report is '' thus printing everything.
    //We need it to render once, so that's why there's no array of dependencies.
    const handleDateChange = (event) => {
        setDate(event.target.value);
        onSelectedDate(event.target.value);
    }

    return (
        <div className='date-form-container'>
            <label htmlFor='date-range'>Choose Year and Month</label>
            <input type='month' id='date-range' name='date-range' onChange={handleDateChange} min='2020-01' max={maxDateToGet} value={date} />
        </div>
    );

}

export default DateForm;