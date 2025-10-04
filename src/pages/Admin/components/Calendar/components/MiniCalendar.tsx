
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./MiniCalendar.css"

interface MiniCalendarProps {
    onWeekChange: (weekText: string)=> void;
}

export const MiniCalendar = ({onWeekChange}:MiniCalendarProps) => {
    const [value, setValue] = useState<Date>(new Date())
    const [selectedWeek, setSelectedWeek] = useState<Date[]>([]);

    function getWeekDates(date: Date): Date[] {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1);
        const week = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            week.push(d);
        }
        return week;
    }

    function formatWeek(week: Date[]):string {
    if (week.length === 0) return "";

    const start = week[0];
    const end = week[week.length - 1];

    const startMonth = start.toLocaleString('en-US', { month: 'long' });
    const endMonth = end.toLocaleString('en-US', { month: 'long' });

    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = end.getFullYear();

     return startMonth === endMonth
            ? `${startMonth} ${startDay} - ${endDay} ${year}`
            : `${startMonth} ${startDay} - ${endMonth} ${endDay} ${year}`;
}



    useEffect(() => {
        const week = getWeekDates(new Date())
        setSelectedWeek(week);
        onWeekChange(formatWeek(week));
    }, []);

    return (
        <Calendar
            onChange={() => setValue}
            value={value}
            onClickDay={(date) => {
                const week = getWeekDates(date);
                setSelectedWeek(getWeekDates(date));
                onWeekChange?.(formatWeek(week));
            }}
            prev2Label={null}
            next2Label={null}
            locale="en-US"
            calendarType="iso8601"
            tileClassName={({ date }) => {
                const week = selectedWeek;
                const dayIndex = week.findIndex(d => d.toDateString() === date.toDateString());
                if (dayIndex !== -1) {
                    if (dayIndex === 0) return "selected-day selected-week-start";
                    if (dayIndex === week.length - 1) return "selected-day selected-week-end";
                    return "selected-day";
                }
                return null;
            }}
        />
    )
}