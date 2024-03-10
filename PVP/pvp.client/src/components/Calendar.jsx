import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ checkedDates, onCheckDate }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onChange = date => {
        setSelectedDate(date);
    };

    const tileContent = ({ date, view }) => {
        const formattedDate = date.toISOString().split('T')[0];

        if (view === 'month' && checkedDates.includes(formattedDate)) {
            return <span className="check-mark">&#10003;</span>; // Custom check mark
        }

        return null;
    };
    const handleCheckCurrentDate = () => {
        const currentDate = new Date(); // Get the current date and time
        currentDate.setHours(0, 0, 0, 0); // Set time to midnight
        const formattedDate = currentDate.toISOString().split('T')[0];

        if (!checkedDates.includes(formattedDate)) {
            onCheckDate(currentDate);
        } else {
            // Handle unchecking if needed
        }
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
            <button onClick={handleCheckCurrentDate}>Check Current Date</button>
        </div>
    );
};

MyCalendar.propTypes = {
    checkedDates: PropTypes.array.isRequired,
    onCheckDate: PropTypes.func.isRequired,
};

export default MyCalendar;


