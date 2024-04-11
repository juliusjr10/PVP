import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import '../CalendarMoods.css';

const MyCalendar = ({ checkedDates, onCheckDate, onDateClick }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onChange = date => {
        setSelectedDate(date);
    };

    const tileClassName = ({ date }) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const checkedDate = checkedDates.find(item => item.date === formattedDate);

        if (checkedDate) {
            const mood = checkedDate.mood;
            let moodClass = '';

            switch (mood) {
                case 0:
                    moodClass = 'awful';
                    break;
                case 1:
                    moodClass = 'bad';
                    break;
                case 2:
                    moodClass = 'meh';
                    break;
                case 3:
                    moodClass = 'good';
                    break;
                case 4:
                    moodClass = 'excellent';
                    break;
                default:
                    break;
            }

            console.log('Mood class:', moodClass); // Log the mood class
            return moodClass;
        }

        return '';
    };

    const handleDayClick = date => {
        onDateClick(date); // Call the onDateClick function passed from parent component
    };

    return (
        <div>
            <Calendar
                onChange={onChange}
                minDate={new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)} // 30 days before today
                maxDate={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)} // 30 days after today
                value={selectedDate}
                tileClassName={tileClassName}
                onClickDay={handleDayClick} // Call handleDayClick when a day is clicked
            />
        </div>
    );
};

MyCalendar.propTypes = {
    checkedDates: PropTypes.array.isRequired,
    onCheckDate: PropTypes.func.isRequired,
    onDateClick: PropTypes.func.isRequired, // Add onDateClick prop type
};

export default MyCalendar;
