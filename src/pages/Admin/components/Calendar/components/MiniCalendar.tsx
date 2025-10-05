
import {useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./MiniCalendar.css"

interface MiniCalendarProps {
    onWeekChange: (date: Date) => void;
    currentWeekStart: Date;
}

export const MiniCalendar = ({ currentWeekStart, onWeekChange }: MiniCalendarProps) => {

    function getWeekStart(date: Date) {
        const day = date.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const start = new Date(date);
        start.setDate(date.getDate() + diff);
        start.setHours(0, 0, 0, 0);
        return start;
    }

    function getWeekDates(date: Date): Date[] {
        const start = getWeekStart(date);
        const week: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            week.push(d);
        }
        return week;
    }

    function isSameWeek(date: Date, weekStartDate: Date) {
        const start = new Date(weekStartDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return date >= start && date <= end;
    }

    const getInitialActiveStartDate = (weekStart: Date) => {
        const week = getWeekDates(weekStart);
        const today = new Date();
        const todayInWeek = week.find(d => d.toDateString() === today.toDateString());
        return todayInWeek || week[0];
    };


    const [activeStartDate, setActiveStartDate] = useState<Date>(() => getInitialActiveStartDate(currentWeekStart));


    return (
        <Calendar
            onChange={() => { }}
            value={currentWeekStart}
            onClickDay={(date) => {
                const week = getWeekDates(date);
                onWeekChange(week[0]);
                setActiveStartDate(date);
            }}
            activeStartDate={activeStartDate}
            prev2Label={null}
            next2Label={null}
            locale="en-GB"
            tileClassName={({ date, view, activeStartDate }) => {
                if (view === "month") {
                    const isWeek = isSameWeek(date, currentWeekStart);
                    const isNeighboring = date.getMonth() !== activeStartDate.getMonth();

                    if (isWeek && !isNeighboring) return "selected-day";
                    if (isWeek && isNeighboring) return "selected-day neighboring-month";
                }
                return null;
            }}


        />
    )
}