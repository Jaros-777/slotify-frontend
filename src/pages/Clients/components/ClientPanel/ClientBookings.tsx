import { useEffect, useState } from "react"
import type { bookingType } from "./types/bookingType"
import { Image } from "lucide-react"
import axios from "axios"
import { useCheckIsLogged } from "../../../Admin/components/utlis/checkIsLoged"
import { LoadingPage } from "../../../../LoadingPage"

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
            <div>
                <button>UPCOMING</button>
                <button>HISTORY</button>
            </div>
            <ul className="min-w-300">
                {bookings.map(e => (
                    <li key={e.eventId}>
                        <p>d</p>
                        <div>
                            {e.businessProfilePicURL ?
                                <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={e.businessProfilePicURL} alt="Business profile picture" />
                                :
                                <Image className="h-30 aspect-square text-gray-400" />}
                            <div>
                                <p>{e.serviceName}</p>
                                <p>{e.businessName}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}