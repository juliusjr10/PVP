// MyCalendar.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

const MyCalendar = ({ checkedDates, onCheckDate }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onChange = date => {
        setSelectedDate(date);
    };

    const tileContent = ({ date, view }) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        if (view === 'month' && checkedDates.includes(formattedDate)) {
            return <span className="check-mark">&#10003;</span>; // Custom check mark
        }

        return null;
    };

    return (
        <div>
            <Calendar
                onChange={onChange}
                minDate={new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)} // 30 days before today
                maxDate={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)} // 30 days after today
                value={selectedDate}
                tileContent={tileContent}
            />
        </div>
    );
};

MyCalendar.propTypes = {
    checkedDates: PropTypes.array.isRequired,
    onCheckDate: PropTypes.func.isRequired,
};

export default MyCalendar;
