import React, { useState, useEffect } from 'react';
import '../componentsStyle/date-form.css'

function DateForm({ onSelectedDate }){
    const getCurrentDateLimit = () => {
        const date = new Date();
        const todayYear = date.getFullYear();
        const todayMonth =  date.getMonth() + 1;
        return `${todayYear}-${todayMonth < 10 ? '0' : ''}${todayMonth}`;
    }
    const [date, setDate] = useState(getCurrentDateLimit())
    const maxDateToGet = getCurrentDateLimit();
    useEffect(() => {
        onSelectedDate(date);
    }, );
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