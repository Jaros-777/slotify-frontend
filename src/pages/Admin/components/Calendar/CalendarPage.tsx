
import { useEffect, useState } from "react"
import { MiniCalendar } from "./components/MiniCalendar"
import { BigCalendar } from "./components/BigCalendar/BigCalendar"
import type { EventType } from "./components/types/EventType"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import type { ServiceType } from "./components/types/ServiceType"

export const CalendarPage = () => {
    const [serviceData, setServiceData] = useState<ServiceType[]>([])
    const [eventsData, setEventsData] = useState<EventType[]>([])
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const navigate = useNavigate();

    function getWeekStart(date: Date) {
        const day = date.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const start = new Date(date);
        start.setDate(date.getDate() + diff);
        start.setHours(0, 0, 0, 0);
        return start;
    }

    async function checkIsLogged() {
        const token = localStorage.getItem("token")
        await axios.get("http://localhost:8080/auth/validate",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(function (response) {
                setIsLogged(true)
                loadServiceData();
            }).catch(function (error) {
                console.log(error);
                navigate("/login")
            })

    }

    async function loadServiceData() {
        const token = localStorage.getItem("token")
        await axios.get("http://localhost:8080/service",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(function (response) {
                setServiceData(response.data)
            }).catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        checkIsLogged()
    }, [])

    if (!isLogged) {
        return <p className="mt-20">Waiting..</p>
    }

    return (
        <section className="mt-20 borer-1 border-text-gray flex">
            <div className="w-1/6 border-r-1 border-b-1 border-gray-300 p-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600 duration-200 w-full">
                    <img src="#" alt="" />
                    <span>CREATE NEW</span>
                </button>
                <MiniCalendar
                    onWeekChange={setCurrentWeekStart}
                    currentWeekStart={currentWeekStart}
                />
                <div className="mt-4">
                    <p className="font-medium">SERVICES</p>

                    <ul>
                        {serviceData.map((_, index) => (
                            <li key={index} className="mt-2">🏿 {serviceData[index].name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-5/6">
                <BigCalendar
                    weekStartDate={currentWeekStart}
                    onWeekChange={setCurrentWeekStart}
                    events={eventsData}
                    serviceData={serviceData}
                />
            </div>
        </section>
    )
}