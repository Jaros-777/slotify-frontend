import { useEffect, useState } from "react"
import type { bookingType } from "./types/bookingType"
import { Image } from "lucide-react"
import axios from "axios"
import { useCheckIsLogged } from "../../../Admin/components/utlis/checkIsLoged"
import { LoadingPage } from "../../../../LoadingPage"
import { monthTypes } from "../Order/types/dayAndMonthNames"

export const ClientBookings = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("client");
    const [bookings, setBookings] = useState<bookingType[]>([])


    const handleFetchData = async (token: string) => {
        await axios.get(`${import.meta.env.VITE_APP_URL}/client/bookings`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }).then(response => {
                console.log(response.data)
                setBookings(response.data)
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

    if (!bookings) {
        return <LoadingPage text="Loading data..." ></LoadingPage>;
    }

    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-medium min-w-300">Bookings</h1>
            <div className="text-lg my-4 min-w-300">
                <button className="py-2 pr-4 font-medium cursor-pointer">UPCOMING</button>
                <button className="py-2 px-4 font-medium cursor-pointer text-blue-500 underline">HISTORY</button>
            </div>
            <ul className="min-w-300">
                {bookings.map(e => {
                    const date = new Date(e.date);
                    return (
                        <li key={e.eventId} className="flex items-center border border-gray-300 rounded-2xl mb-2">
                            <div className="flex flex-col items-center justify-center py-2 w-26">
                                <p className="font-medium">{monthTypes[date.getMonth()]}</p>
                                <p className="font-bold">{date.getDay()}</p>
                                <p className="font-medium">{String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}</p>

                            </div>
                            <div className="flex border-l border-gray-300 h-full py-4 pl-6">
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
                })}
            </ul>
        </div>
    )
}