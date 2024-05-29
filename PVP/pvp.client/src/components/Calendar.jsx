import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import '../CalendarMoods.css'; // Ensure this CSS file handles necessary styling

const MyCalendar = ({ checkedDates, onCheckDate, onDateClick }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onChange = date => {
        setSelectedDate(date);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') { // Only modify month view tiles
            const formattedDate = format(date, 'yyyy-MM-dd');
            const checkedDate = checkedDates.find(item => item.date === formattedDate);

            if (checkedDate) {
                const mood = checkedDate.mood;
                let emoji = '';

                switch (mood) {
                    case 0:
                        emoji = '😡'; // Awful
                        break;
                    case 1:
                        emoji = '😞'; // Bad
                        break;
                    case 2:
                        emoji = '😐'; // Meh
                        break;
                    case 3:
                        emoji = '😊'; // Good
                        break;
                    case 4:
                        emoji = '😁'; // Excellent
                        break;
                    default:
                        break;
                }

                return <div className="emoji-tile">{emoji}</div>;
            }
        }

        return null;
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') { // Only apply classes for month view
            const formattedDate = format(date, 'yyyy-MM-dd');
            const checkedDate = checkedDates.find(item => item.date === formattedDate);

            if (checkedDate) {
                switch (checkedDate.mood) {
                    case 0:
                        return 'awful';
                    case 1:
                        return 'bad';
                    case 2:
                        return 'meh';
                    case 3:
                        return 'good';
                    case 4:
                        return 'excellent';
                    default:
                        return '';
                }
            }
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
                tileContent={tileContent}
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
