import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./OrderCalendar.css"
import type { OrderResponse } from '../../../types/OrderResponse';
import type { scheduleDay } from '../../../../Admin/components/Settings/components/Availability/utlis/scheduleType';
import { useEffect, useState } from 'react';
import { dayTypes, monthTypes } from '../types/dayAndMonthNames';
import axios from 'axios';
import { LoadingPage } from '../../../../../LoadingPage';
import { toLocalDateTimeString } from '../../../../Admin/components/Calendar/components/BigCalendar/utils/dateUtils';




interface timeProps {
    setReservationDetails: React.Dispatch<React.SetStateAction<OrderResponse>>
    reservationDetails: OrderResponse | undefined
    setSectionFinished: React.Dispatch<React.SetStateAction<boolean>>
    availability: scheduleDay[]
    serviceDuration: number
}

interface timeType {
    hour: number
    minute: number
}

interface bookedTimeType {
    eventStartTime: Date
}


export const SelectTime = ({ setReservationDetails, reservationDetails, availability, serviceDuration, setSectionFinished }: timeProps) => {

    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>()
    const [openHours, setOpenHours] = useState<string[]>([])
    const [bookedTime, setBookedTime] = useState<timeType[]>([])

    const today = new Date();

    const fetchBookedTime = async (day: Date) => {

        if (reservationDetails)
            await axios.get(`${import.meta.env.VITE_APP_URL}/order/booked/${reservationDetails.serviceId}/${toLocalDateTimeString(day)}`)
                .then(function (response) {
                    // console.log(response.data)
                    handleSetBookedTime(response.data)


                }).catch(function (error) {
                    console.log(error);
                })
    }

    const handleSetBookedTime = (booked: bookedTimeType[]) => {
        const bookedArr: timeType[] = booked.map(e => {
            const date = new Date(e.eventStartTime);

            return {
                hour: date.getHours(),
                minute: date.getMinutes()
            };
        });
        setBookedTime(bookedArr)

    }

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

    const availabilityHours = (day: number, chosenDate: Date) => {
        const todayAvailability = availability.find(e => e.dayOfWeek === day)
        if (!todayAvailability) return [];

        let [startHour, startMin] = todayAvailability.openHour.split(":").map(Number);
        let [endHour, endMin] = todayAvailability.closeHour.split(":").map(Number);

        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;

        const slotsCount = Math.ceil((endMinutes - startMinutes) / (serviceDuration / 60));

        const bookedMinutes = bookedTime.map(
            b => b.hour * 60 + b.minute
        );

        const todaySlots: timeType[] = Array.from({ length: slotsCount }, (_, i) => {
            const totalMinutes = startMinutes + i * (serviceDuration / 60);

            return {
                hour: Math.floor(totalMinutes / 60),
                minute: totalMinutes % 60,
                totalMinutes
            };
        }
        )
            .filter(slot =>
                !bookedMinutes.includes(slot.totalMinutes)
            )
            .map(({ hour, minute }) => ({ hour, minute }));



        let today = new Date()
        const originalHours = today.getHours();
        const originalMinutes = today.getMinutes();
        today.setHours(0, 0, 0, 0)

        const finalSlots = [];

        if (today.getTime() === chosenDate.getTime()) {

            today.setHours(originalHours, originalMinutes);
            const todayMinutes = today.getHours() * 60 + today.getMinutes();

            for (let slot of todaySlots) {
                const slotMinutes = slot.hour * 60 + slot.minute;
                if (slotMinutes >= todayMinutes) {
                    finalSlots.push(`${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}`);
                }
            }

        } else {

            for (let slot of todaySlots) {
                finalSlots.push(`${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}`);

            }

        }
        setOpenHours(finalSlots)

    }

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


    useEffect(() => {
        if (!selectedDay) return;

        const backendDay = (selectedDay.getDay() + 6) % 7;
        availabilityHours(backendDay, selectedDay);

    }, [bookedTime, selectedDay]);


    if (!reservationDetails) {
        return <LoadingPage text='Loading data...'></LoadingPage>
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
                            if (isOpenDay(value) && !isPastDay(value)) {
                                setOpenHours([])
                                setBookedTime([])
                                setSelectedDay(value);
                                setSelectedTime(null)
                                setSectionFinished(false)
                                fetchBookedTime(value)
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