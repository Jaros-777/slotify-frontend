import { useParams } from "react-router-dom"
import { useCheckIsLogged } from "../../utlis/checkIsLoged";
import { useEffect, useState } from "react";
import { LoadingPage } from "../../../../../LoadingPage";
import type { clientDetailsAndHistoryType } from "../types/clientHistoryType";
import { dayTypes } from "../../../../Clients/components/Order/types/dayAndMonthNames";
import axios from "axios";



export const ClientHistory = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");
    const { clientId } = useParams()
    const [clientDetailsAndHistory, setClientDetailsAndHistory] = useState<clientDetailsAndHistoryType>()

    const fetchData = async (token: string) => {
        await axios.get(`${import.meta.env.VITE_APP_URL}/admin/client/${clientId}`,
			{
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}
		).then(response => {
			console.log(response.data)
			setClientDetailsAndHistory(response.data)
		}).catch(function (error) {
			console.log(error)
		})
    }

    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            if (token)
                fetchData(token)
        })();
    }, []);

    if (isAuthLoading) {
        return <LoadingPage text="Checking authentication..." ></LoadingPage>;
    }
    if (!clientDetailsAndHistory) {
        return <LoadingPage text="Loading data..." ></LoadingPage>;
    }

    return (
        <>
            <div className="mt-10 bg-white p-4 border border-gray-300 rounded-md flex min-w-250">
                <div className="w-full">
                    <div className="flex justify-between items-start">
                        <div className="flex">
                            <div className="bg-red-500 h-20 w-20 rounded-md text-white flex items-center justify-center">
                                <p className="text-4xl">{clientDetailsAndHistory.clientName.slice(0, 2)}</p>
                            </div>
                            <div className="ml-8">
                                <p className="font-medium">{clientDetailsAndHistory.clientName}</p>
                                <p>{clientDetailsAndHistory.clientEmail}</p>
                                <p>{clientDetailsAndHistory.clientPhone}</p>
                            </div>
                        </div>
                        <button className="bg-blue-500 cursor-pointer px-4 py-2 text-white duration-200 hover:bg-blue-600 rounded-md">Create appointment</button>
                    </div>
                    <div className="border-t border-gray-300 w-full mt-4 pt-2 flex justify-around">
                        <div className="flex flex-col items-center px-4">
                            <p className="font-medium text-green-600">{clientDetailsAndHistory.historyDTO.length}</p>
                            <p className="font-medium">Total bookings</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 bg-white p-4 border border-gray-300 rounded-md flex flex-col min-w-250">
                <p className="text-xl font-medium">Past bookings</p>
                <ul className="mt-4">
                    {clientDetailsAndHistory.historyDTO.map(e => {
                        const date = new Date(e.startDate)
                        const formattedDate = new Intl.DateTimeFormat('pl-PL', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }).format(date);

                        return (
                            <li key={e.id} className="mb-6 cursor-pointer duration-200 hover:bg-gray-200 p-2">
                                <p>{dayTypes[date.getDay()]}, {formattedDate}</p>
                                <div className="flex mt-2 items-center">
                                    <div>
                                        <p>{String(date.getHours()).padStart(2, '0')}:{String(date.getMinutes()).padStart(2, '0')}</p>
                                        <p className="text-gray-500 text-sm">{String(date.getHours()).padStart(2, '0')}:{String(date.getMinutes()).padStart(2, '0')}</p>
                                    </div>
                                    <div className="bg-blue-500 h-[3em] w-1 ml-4"></div>
                                    <div className="ml-4">
                                        <p>{clientDetailsAndHistory.clientName}</p>
                                        <p className="text-gray-500">{e.serviceName}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>

    )
}