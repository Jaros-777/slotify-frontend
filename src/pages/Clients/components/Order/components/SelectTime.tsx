import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./OrderCalendar.css"
import type { OrderResponse } from '../../../types/OrderResponse';
import type { scheduleDay } from '../../../../Admin/components/Settings/components/Availability/utlis/scheduleType';
import { useState } from 'react';
import { FinishedReservation } from './FinishedReservation';
import { dayTypes, monthTypes } from '../types/dayAndMonthNames';




interface timeProps {
    setReservationDetails: React.Dispatch<React.SetStateAction<OrderResponse | undefined>>
    reservationDetails: OrderResponse | undefined
    setSectionFinished: React.Dispatch<React.SetStateAction<boolean>>
    availability: scheduleDay[]
    serviceDuration: number
}


export const SelectTime = ({ setReservationDetails, reservationDetails, availability, serviceDuration, setSectionFinished }: timeProps) => {

    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>()
    const [openHours, setOpenHours] = useState<string[]>([])

    const today = new Date();


    const isOpenDay = (date: Date) => {
        const jsDay = date.getDay();
        const backendDay = (jsDay + 6) % 7;
        const config = availability.find((d) => d.dayOfWeek === backendDay);
        return config && !config.isClose;
    };


    const isPastDay = (date: Date) => {
        const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayNormalized = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        return normalized < todayNormalized;
    };

    const availabilityHours = (day: number, selectedDate: Date) => {
        const currentDay = availability.find((e) => e.dayOfWeek === day);
        if (!currentDay || currentDay.isClose) {
            setOpenHours([]);
            return;
        }

        const now = new Date();
        const todayBackendDay = (now.getDay() + 6) % 7;
        const isToday = day === todayBackendDay;


        const [startHour, startMin] = currentDay.openHour.split(":").map(Number);
        const [endHour, endMin] = currentDay.closeHour.split(":").map(Number);

        let startTime = new Date(selectedDate);
        startTime.setHours(startHour, startMin, 0, 0);

        const endTime = new Date(selectedDate);
        endTime.setHours(endHour, endMin, 0, 0);

        if (isToday) {
            if (endTime <= now) {
                setOpenHours([]);
                return;
            }
            if (startTime < now) {
                startTime = new Date(now.getTime());
                const minutes = Math.ceil(startTime.getMinutes() / 15) * 15;
                startTime.setMinutes(minutes, 0, 0);
            }
        }

        const slots: string[] = [];
        let current = new Date(startTime);

        while (current < endTime) {
            const hh = String(current.getHours()).padStart(2, "0");
            const mm = String(current.getMinutes()).padStart(2, "0");
            slots.push(`${hh}:${mm}`);
            current.setMinutes(current.getMinutes() + serviceDuration / 60);
        }

        setOpenHours(slots);
    };

    const handleSelectTime = (time: string) => {
        setSelectedTime(time)
        if (selectedDay) {
            const [hours, minutes] = time.split(":").map(Number)
            const dateWithTime = new Date(selectedDay)
            dateWithTime.setHours(hours, minutes, 0, 0)

            setReservationDetails({
                ...reservationDetails,
                chosenDate: dateWithTime
            })
        }
        setSectionFinished(true)

    }



    return (
        <>
            <h1 className='pl-4 py-2 font-bold text-xl'>Select a time</h1>
            <div className='border border-gray-300 rounded-md ml-6 w-5/6'>
                <h2 className='pl-4 py-4 font-bold text-l'>Date and time</h2>
                <div className='border-t border-gray-300 flex'>
                    <Calendar
                        className="bg-white p-4 rounded-xl shadow aspect-square w-2/5"
                        locale='en-EN'
                        prev2Label={null}
                        next2Label={null}
                        minDate={today}

                        onClickDay={(value) => {
                            const backendDay = (value.getDay() + 6) % 7;
                            if (isOpenDay(value) && !isPastDay(value)) {
                                setSelectedDay(value);
                                setSelectedTime(null)
                                setSectionFinished(false)
                                availabilityHours(backendDay, value);
                            }
                        }}


                        tileDisabled={({ date }) =>
                            isPastDay(date) || !isOpenDay(date)
                        }

                        tileClassName={({ date, view }) => {
                            if (view !== 'month') return '';
                            const isSelected = selectedDay && date.toDateString() === selectedDay.toDateString();
                            const open = isOpenDay(date);
                            const past = isPastDay(date);
                            if (isSelected) return '!bg-blue-500 !text-white rounded-full aspect-square';
                            if (past) return '!bg-transparent !text-gray-400';
                            if (open) return '!bg-gray-200 !text-black rounded-full aspect-square';
                            return '!bg-transparent !text-gray-400';
                        }}
                    />

                    <div className='border-l border-gray-300 w-3/5'>
                        {selectedDay && (
                            <>
                                <div className="p-3 rounded-xl  text-center">
                                    <p className='font-bold'>{dayTypes[selectedDay.getDay()]}, {monthTypes[selectedDay.getMonth()]} {selectedDay.getDate()}, {selectedDay.getFullYear()}</p>
                                </div>
                                <ul className='grid grid-cols-3 w-full items-center py-4 px-2'>
                                    {openHours.map((e, index) => (
                                        <li
                                            key={index}
                                            className={`text-center border border-gray-300 rounded-2xl py-1 m-1 cursor-pointer
                                            ${selectedTime === e ? 'bg-blue-500 text-white' : ''}`}
                                            onClick={() => { handleSelectTime(e) }}
                                        >
                                            {e}
                                        </li>
                                    ))}
                                </ul>
                            </>

                        )}
                    </div>

                </div>
            </div>
        </>

    )
}