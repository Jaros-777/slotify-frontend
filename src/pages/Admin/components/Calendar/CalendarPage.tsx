
import { useEffect, useState } from "react"
import { MiniCalendar } from "./components/MiniCalendar"
import { BigCalendar } from "./components/BigCalendar/BigCalendar"
import type { EventType } from "./components/types/EventType"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useData } from "../../../../AppRouter"
import { useCheckIsLogged } from "../utlis/checkIsLoged"
import { useLoadServiceData } from "../utlis/loadServiceData"
import { Image } from "lucide-react"
import { LoadingPage } from "../../../../LoadingPage"



export const CalendarPage = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");
    const { loadServiceData } = useLoadServiceData();

    const { serviceData, setServiceData, userToken, setUserToken, isAdminLogged } = useData();
    const [eventsData, setEventsData] = useState<EventType[]>([])
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const navigate = useNavigate();

    function getWeekStart(date: Date) {
        const day = date.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const start = new Date(date);
        start.setDate(date.getDate() + diff);
        start.setHours(0, 0, 0, 0);
        return start;
    }

    async function fetchData(token?: string) {
        const localDateTimeStartWeek = encodeURI(currentWeekStart.toISOString())
        axios.get(`${import.meta.env.VITE_APP_URL}/events/${localDateTimeStartWeek}`,
            {
                headers: {
                    'Authorization': `Bearer ${token ? token : userToken}`
                }
            }
        ).then(function (response) {
            setEventsData(response.data.map((event: any) => ({
                ...event,
                startDate: new Date(event.startDate),
                endDate: new Date(event.endDate)
            })));
            setLoadingState(false)
        }).catch(function (error) {
            console.log(error)
        })

    }

    useEffect(() => {

        (async () => {
            const token = await checkIsLogged()
            if (token) {
                await loadServiceData(token);
                await fetchData(token)
            }
        })();
    }, [])

    useEffect(() => {
        setLoadingState(true)
        fetchData()
    }, [currentWeekStart])

    if (isAuthLoading) {
        return <LoadingPage text="Checking authentication..." ></LoadingPage>;
    }
    if (!isAdminLogged) {
        return <LoadingPage text="Checking authentication..." ></LoadingPage>;
    }


    return (
        <section className="flex h-full">
            <div className="w-1/6 border-r-1 border-b-1 border-gray-300 p-6">
                {/* <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600 duration-200 w-full">
                    <img src="#" alt="" />
                    <span>CREATE NEW</span>
                </button> */}
                <MiniCalendar
                    onWeekChange={setCurrentWeekStart}
                    currentWeekStart={currentWeekStart}
                />
                <div className="mt-4">
                    <p className="font-medium">SERVICES</p>

                    <ul>
                        {serviceData.map((_, index) => (
                            <li key={index} className="mt-2 flex items-center">
                                {serviceData[index].servicePictureURL ?
                                    <img src={serviceData[index].servicePictureURL} alt="Service picture" className="h-6 rounded-2xl" />
                                    :
                                    <Image className="h-6"></Image>
                                }
                                <p className="ml-2">{serviceData[index].name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-5/6 flex justify-center items-center ">
                {!loadingState ?
                    <BigCalendar
                        weekStartDate={currentWeekStart}
                        onWeekChange={setCurrentWeekStart}
                        events={eventsData}
                        serviceData={serviceData}
                        fetchData={fetchData}
                        setLoadingState={setLoadingState}
                    />
                    :
                    <p className="text-5xl">Loading data...</p>
                }

            </div>
        </section>
    )
}