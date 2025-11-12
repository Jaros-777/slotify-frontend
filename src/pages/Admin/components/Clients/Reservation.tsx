import { useParams } from "react-router-dom"
import { Image, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import type { ServiceType } from "../types/ServiceType"
import axios from "axios"
import type { BusinessProfileType } from "../Booking/components/BusinessProfile/types/BusinessProfileType"


export const Reservation = () => {
    const { businessName } = useParams<{ businessName: string }>()
    const [businessDetail, setBusinessDetail] = useState<Partial<BusinessProfileType>>({})
    const [serviceData, setServiceData] = useState<Partial<ServiceType[]>>([])
    const [loadDetails, setLoadDetails] = useState<boolean>(true)


    const handleValidPage = async () => {
        setLoadDetails(true)

        await axios.get(`http://localhost:8080/business-page/${businessName}`)
            .then((response) => {
                console.log(response.data)
                setBusinessDetail(response.data.businessProfileDTO)
                const serData = response.data.servicesDTO
                setServiceData(serData.filter((service: { isEditable: boolean }) => service.isEditable === true))
                setLoadDetails(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        (async () => {
            // await loadServiceData(token);
            await handleValidPage()

        })();
    }, []);

    if (loadDetails) {
        return <p className="mt-20">Loading business details...</p>;
    }

    return (
        <>
            <nav className="border-b border-gray-300 flex justify-around px-4 py-4">
                <p className="font-bold">{businessDetail.businessName}</p>
                <div>
                    {/* <CircleUserRound/> */}
                    <button>Log in</button>
                </div>

            </nav>
            <section className="flex flex-col p-4 border-b border-gray-300 shadow-2xl">
                <div className="flex justify-between px-4 py-2">
                    <div className="flex mx-4 items-center">
                        <div className="bg-gray-200 p-8 rounded-2xl">
                            <Image></Image>
                        </div>
                        <div className="ml-6">
                            <p className="font-bold text-xl">{businessDetail.businessName}</p>
                            <p className="text-sm"><span className="text-green-700 font-bold">Opening hours </span>(8:00-20:00)</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="bg-gray-200 p-4 rounded-full">
                            <ExternalLink></ExternalLink>
                        </div>
                        <p className="mt-2">Share</p>
                    </div>
                </div>
                <div className="mt-6 px-4 flex">
                    <button className="font-medium cursor-pointer">Services</button>
                    <button className="ml-8 font-medium cursor-pointer">About</button>
                </div>

            </section>
            <section className="mt-10 p-4">
                <p className="text-2xl font-bold">Services</p>
                <ul className="mt-4 border border-gray-300 rounded-md">
                    {serviceData.map((e) => (
                        <li key={e?.id} className="flex p-4 border-b border-gray-300 items-center">
                            <div className="h-24 w-24 bg-green-100 p-2 rounded-2xl">
                                <Image className="h-full w-full text-green-600"></Image>
                            </div>
                            <div className="ml-6">
                                <p className="font-bold text-lg">{e?.name}</p>
                                <p className="text-sm underline cursor-pointer mt-2">Show details</p>
                            </div>
                            <div className="ml-auto flex items-center">
                                <p className="font-bold">{e?.price} USD</p>
                                <button className="border border-blue-300 text-blue-400 font-bold px-4 py-2 rounded-md ml-4 cursor-pointer duration-200 
                                hover:bg-blue-200">Reservation</button>
                            </div>
                        </li>
                    ))}
                </ul>

            </section>
            <section>
                <div>
                    <h2>About</h2>
                </div>
                <div>
                    <h2>Contact details</h2>
                    <div>
                        <a href="#">Web Page</a>
                        <a href="#">
                            <p>Facebook</p>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}