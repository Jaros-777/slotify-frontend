import { useEffect, useState } from "react"
import type { bookingType } from "./types/bookingType"
import { Image } from "lucide-react"
import axios from "axios"
import { useCheckIsLogged } from "../../../Admin/components/utlis/checkIsLoged"
import { LoadingPage } from "../../../../LoadingPage"
import { monthTypes } from "../Order/types/dayAndMonthNames"
import { useNavigate } from "react-router-dom"

export const ClientBookings = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("client");
    const [loadBookings, setLoadBookings] = useState<Boolean>(true)
    const [futureBookings, setFutureBookings] = useState<bookingType[]>([])
    const [previousBookings, setPreviousBookings] = useState<bookingType[]>([])
    const [selectedTime, setSelectedTime] = useState<"prev" | "future">("future")
    const bookings = selectedTime === "future" ? futureBookings : previousBookings;
    const navigate = useNavigate()


    const splitBookingsByDate = (bookings: bookingType[]) => {

        const date = new Date();
        const previous: bookingType[] = [];
        const future: bookingType[] = [];

        bookings.map(e => {
            const eventDate = new Date(e.date);
            if (eventDate <= date) {
                previous.push(e)
            } else {
                future.push(e)
            }
        })
        previous.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )

        future.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        setPreviousBookings(previous)
        setFutureBookings(future)
    }

    const handleFetchData = async (token: string) => {
        await axios.get(`${import.meta.env.VITE_APP_URL}/client/bookings`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }).then(response => {
                setLoadBookings(false)
                splitBookingsByDate(response.data)
            }).catch(error => {
                console.log(error)
            });
    }

    useEffect(() => {

        (async () => {
            const token = await checkIsLogged();
            if (token)
                handleFetchData(token)
        })();
    }, [])

    if (isAuthLoading) {
        return <LoadingPage text="Checking authentication..." ></LoadingPage>;
    }

    if (loadBookings) {
        return <LoadingPage text="Loading data..." ></LoadingPage>;
    }

    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-medium min-w-300">Bookings</h1>
            <div className="text-lg my-4 min-w-300">
                <button className={`py-2 px-4 font-medium cursor-pointer ${selectedTime === "future" ? "text-blue-500 underline" : null} `} onClick={() => setSelectedTime("future")}>UPCOMING</button>
                <button className={`py-2 px-4 font-medium cursor-pointer ${selectedTime === "prev" ? "text-blue-500 underline" : null} `} onClick={() => setSelectedTime("prev")}>HISTORY</button>
            </div>
            <ul className="min-w-300">
                {bookings.length === 0 ?
                    selectedTime === "future" ?
                        <p className="ml-4">You don’t have any upcoming bookings.</p>
                        :
                        <p className="ml-4">You don’t have history bookings.</p>
                    :
                    bookings.map(e => {
                        const date = new Date(e.date);
                        return (

                            <li key={e.eventId} className="flex items-center border border-gray-300 rounded-2xl mb-2">
                                <div className="flex flex-col items-center justify-center py-2 w-26">
                                    <p className="font-medium">{monthTypes[date.getMonth()]}</p>
                                    <p className="font-bold">{date.getDate()}</p>
                                    <p className="font-medium">{String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}</p>

                                </div>
                                <div className="flex border-l border-gray-300 h-full py-4 pl-6 cursor-pointer" onClick={() => navigate(`/${e.businessName}`)}>
                                    {e.businessProfilePicURL ?
                                        <img className="h-20 overflow-hidden rounded-full flex items-center justify-center" src={e.businessProfilePicURL} alt="Business profile picture" />
                                        :
                                        <Image className="h-20 aspect-square text-gray-400" />}
                                </div>
                                <div className="ml-4 p-4">
                                    <p className="font-bold">{e.serviceName}</p>
                                    <p className="mt-2">{e.businessName}</p>
                                </div>
                                <div className="ml-auto py-4 pr-8">
                                    <p className="font-bold">{e.servicePrice} USD</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}