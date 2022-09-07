import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './Calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateSelect = () => {};

  return (
    <div className={styles.CalendarContainer}>
      <DatePicker
        selected={startDate}
        onSelect={handleDateSelect}
        onChange={(date: Date) => setStartDate(date)}
      ></DatePicker>
    </div>
  );
}

export default Calendar;
