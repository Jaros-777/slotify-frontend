
import { useEffect, useRef, useState } from 'react';
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


    const [activeStartDate, setActiveStartDate] = useState<Date>(
        () => new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), 1)
    );

    const userChangedMonth = useRef(false);



    useEffect(() => {
        if (userChangedMonth.current) {
            userChangedMonth.current = false;
            return;
        }

        const weekDays = getWeekDates(currentWeekStart);
        const monthCounts: Record<number, number> = {};

        for (const day of weekDays) {
            const m = day.getMonth();
            monthCounts[m] = (monthCounts[m] || 0) + 1;
        }


        const dominantMonth = Number(
            Object.keys(monthCounts).reduce((a, b) =>
                monthCounts[Number(a)] > monthCounts[Number(b)] ? a : b
            )
        );


        const representativeDay = weekDays.find(d => d.getMonth() === dominantMonth)!;

        const newMonthStart = new Date(representativeDay.getFullYear(), dominantMonth, 1);
        setActiveStartDate(newMonthStart);
    }, [currentWeekStart]);


    return (
        <Calendar
            onChange={() => { }}
            value={currentWeekStart}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) => {
                if (activeStartDate) {
                    setActiveStartDate(activeStartDate);
                }
            }}
            onClickDay={(date) => {
                const week = getWeekDates(date);
                onWeekChange(week[0]);

                const clickedMonth = date.getMonth();
                const visibleMonth = activeStartDate.getMonth();

                if (clickedMonth !== visibleMonth) {
                    userChangedMonth.current = true;
                    setActiveStartDate(new Date(date.getFullYear(), clickedMonth, 1));
                }
            }}
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