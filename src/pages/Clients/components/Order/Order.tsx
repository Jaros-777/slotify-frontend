import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { Image } from "lucide-react"
import axios from "axios"
import { useParams } from "react-router-dom"
import type { OrderType } from "./OrderType"
import { SelectTime } from "./components/SelectTime"
import type { OrderResponse } from "../../types/OrderResponse"


export const Order = () => {
    const { serviceId } = useParams()
    const [orderData, setOrderData] = useState<OrderType>()
    const [currentSection, setCurrentSection] = useState<"time" | "details" | "finish">("time")
    const [loadDetails, setLoadDetails] = useState<boolean>(true)
    const [reservationDetails, setReservationDetails] = useState<OrderResponse>()

    const fetchServiceDetails = async () => {
        await axios.get(`http://localhost:8080/order/${serviceId}`
        )
            .then(function (response) {
                setOrderData(response.data)
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
    }, [])

    if (loadDetails || !orderData) {
        return <p className="mt-20">Loading business details...</p>;
    }

    return (
        <>
            <div className="h-screen">
                <div className="border-b border-gray-300 py-6 flex items-center justify-center sticky top-0 right-0 bg-white">
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

                    <div className="w-3/5 p-6">
                        <SelectTime
                            setReservationDetails={setReservationDetails}
                            availability={orderData.availabiltyDTO}
                            serviceDuration={orderData.serviceDTO.duration}
                            setCurrentSection={setCurrentSection}
                        ></SelectTime>
                    </div>
                    <div className="ml-auto w-2/5">
                        <div className="bg-gray-200 px-6 py-10 min-h-full">
                            <h2 className="text-3xl font-bold">Summary</h2>
                            <div className="bg-white p-6 mt-6 rounded-2xl">
                                <div className="flex items-center">
                                    {
                                        orderData.bussinessPictureUrl ?
                                            <img className="h-20 rounded-2xl object-contain overflow-hidden" src={orderData.bussinessPictureUrl} alt="Background picture" />
                                            :
                                            <Image className="aspect-square text-gray-400" />

                                    }
                                    <p className="ml-10 font-bold">{orderData.bussinessName}</p>
                                </div>
                                <div className="flex mt-6 items-center border-t-2 py-6 border-gray-300">
                                    {
                                        orderData.serviceDTO.servicePictureURL ?
                                            <img className="h-20 rounded-2xl object-contain overflow-hidden" src={orderData.serviceDTO.servicePictureURL} alt="Background picture" />
                                            :
                                            <Image className="aspect-square text-gray-400" />

                                    }
                                    <div className="ml-10">
                                        <p className="font-medium">{orderData.serviceDTO.name}</p>
                                        <p className="mt-4">{orderData.serviceDTO.duration / 60} minutes</p>
                                    </div>
                                    <div className="ml-auto">
                                        <p className="font-bold">{orderData.serviceDTO.price} USD</p>
                                    </div>
                                </div>
                                <div className="flex font-bold border-t-2 pt-6 border-gray-300">
                                    <p>Total</p>
                                    <p className="ml-auto">{orderData.serviceDTO.price} USD</p>
                                </div>
                                {currentSection === "details" ?
                                    <button className="bg-blue-500 text-white font-medium w-full px-4 py-2 mt-6 rounded-xl cursor-pointer">CONTINUE</button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}