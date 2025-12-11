import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { Image } from "lucide-react"
import axios from "axios"
import { useParams } from "react-router-dom"
import type { OrderType } from "./OrderType"


export const Order = () => {
    const { serviceId } = useParams()
    const [serviceData, setServiceData] = useState<OrderType>()
    const [currentSection, setCurrentSection] = useState<"time" | "details" | "finish">("finish")
    const [loadDetails, setLoadDetails] = useState<boolean>(true)

    const fetchServiceDetails = async () => {
        await axios.get(`http://localhost:8080/order/${serviceId}`
        )
            .then(function (response) {
                console.log(response.data)
                setServiceData(response.data)
                setLoadDetails(false)

            }).catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        (async () => {
            setLoadDetails(false)
            await fetchServiceDetails()

        })();
    },[])

    if (loadDetails || !serviceData) {
        return <p className="mt-20">Loading business details...</p>;
    }

    return (
        <>
            <div>
                <div className="border-b border-gray-300 px-40 py-6 flex items-center justify-center">
                    <div className="p-2 h-10 flex items-center justify-center aspect-square rounded-full bg-blue-500 mx-4">
                        {currentSection === "details" || currentSection == "finish" ?
                            <Check className="text-white"></Check>
                            :
                            <p className="text-white font-medium">1</p>
                        }
                    </div>
                    <div className="h-0.5 w-15 bg-gray-300"></div>
                    <div className="p-2 h-10 flex items-center justify-center aspect-square rounded-full bg-blue-500 mx-4">
                        {currentSection === "finish" ?
                            <Check className="text-white"></Check>
                            :
                            <p className="text-white font-medium">2</p>
                        }
                    </div>
                    <div className="h-0.5 w-15 bg-gray-300"></div>
                    <div className="p-2 h-10 flex items-center justify-center aspect-square rounded-full bg-blue-500 mx-4">
                        <p className="text-white font-medium">3</p>
                    </div>
                </div >
                <div className="flex">

                    <div>
                        <p>Sections</p>
                    </div>
                    <div className="ml-auto">
                        <div className="bg-gray-200">
                            <h2>Summary</h2>
                            <div className="bg-hite">
                                <div className="flex">
                                    {
                                        serviceData.bussinessPictureUrl ?
                                            <img className="h-10 rounded-2xl object-contain overflow-hidden" src={serviceData.bussinessPictureUrl} alt="Background picture" />
                                            :
                                            <Image className="aspect-square text-gray-400" />

                                    }
                                    <p>{serviceData.bussinessName}</p>
                                </div>
                                <div className="flex">
                                    {
                                        serviceData.serviceDTO.servicePictureURL ?
                                            <img className="h-10 rounded-2xl object-contain overflow-hidden" src={serviceData.serviceDTO.servicePictureURL} alt="Background picture" />
                                            :
                                            <Image className="aspect-square text-gray-400" />

                                    }
                                    <div>
                                        <p>{serviceData.serviceDTO.name}</p>
                                        <p>{serviceData.serviceDTO.duration / 60} minutes</p>
                                    </div>
                                    <div>
                                        <p>{serviceData.serviceDTO.price}USD</p>
                                    </div>
                                    <div>
                                        <p>Total</p>
                                        <p>100USD</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}