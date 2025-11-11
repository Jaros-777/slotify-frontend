import { useParams } from "react-router-dom"
import { CircleUserRound, Image, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import { useData } from "../../../../AppRouter"
import { useLoadServiceData } from "../utlis/loadServiceData"
import { useCheckIsLogged } from "../utlis/checkIsLoged"
import type { ServiceType } from "../types/ServiceType"


export const Reservation = () => {
    const { businessName } = useParams<{ businessName: string }>()
    const { serviceData } = useData();
    const [serviceDataToShow, setServiceDataToShow] = useState<ServiceType[]>([])
    // const { loadServiceData, isDataLoading } = useLoadServiceData();


    // useEffect(() => {
    //     (async () => {
    //             await loadServiceData(token);

    //     })();
    // }, []);

    // if (isDataLoading) {
    //     return <p className="mt-20">Loading data...</p>;
    // }

    return (
        <>
            <nav className="border-b border-gray-300 flex justify-around px-4 py-4">
                <p className="font-bold">{businessName}</p>
                <div>
                    {/* <CircleUserRound/> */}
                    <button>Log in</button>
                </div>

            </nav>
            <section className="flex flex-col p-4 border-b border-gray-300 shadow-2xl">
                <div className="flex justify-between">
                    <div className="flex mx-4">
                        <div className="bg-gray-200 p-8 rounded-2xl">
                            <Image></Image>
                        </div>
                        <div className="ml-6">
                            <p className="font-bold">{businessName}</p>
                            <p><span className="text-green-700 font-bold">Opening hours </span>(8:00-20:00)</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="bg-gray-200 p-4 rounded-2xl">
                            <ExternalLink></ExternalLink>
                        </div>
                        <p className="mt-2">Share</p>
                    </div>
                </div>
                <div className="mt-6 flex">
                    <button className="font-medium">Services</button>
                    <button className="ml-8 font-medium">About</button>
                </div>

            </section>
            <section className="mt-10 p-4">
                <p className="text-2xl font-bold">Services</p>
                <ul>
                    {serviceDataToShow.map((e) => (
                        <li>
                            <Image></Image>
                            <div>
                                <p>{e.name}</p>
                                <p>Show details</p>
                            </div>
                            <div>
                                <p>{e.price}USD</p>
                                <button>Reservation</button>
                            </div>
                        </li>
                    ))}
                    <li>
                        <Image></Image>
                        <div>
                            <p>Name</p>
                            <p>Show details</p>
                        </div>
                        <div>
                            <p>100 USD</p>
                            <button>Reservation</button>
                        </div>
                    </li>
                </ul>

            </section>
        </>
    )
}