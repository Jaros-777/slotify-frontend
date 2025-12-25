import { Check, LockKeyhole, Dot } from "lucide-react"
import { useEffect, useState } from "react"
import { Image } from "lucide-react"
import axios from "axios"
import { useParams } from "react-router-dom"
import type { OrderType } from "./types/OrderType"
import { SelectTime } from "./components/SelectTime"
import { ClientDetails } from "./components/ClientDetails"
import { FinishedReservation } from "./components/FinishedReservation"
import type { OrderResponse } from "../../types/OrderResponse"
import { monthTypes } from "./types/dayAndMonthNames"
import { toLocalDateTimeString } from "../../../Admin/components/Calendar/components/BigCalendar/utils/dateUtils"
import { FooterReservation } from "../../../../components/Footer/FooterReservation"
import { useData } from "../../../../AppRouter"


export const Order = () => {
    const { serviceId } = useParams()
    const [orderData, setOrderData] = useState<OrderType>()
    const [currentSection, setCurrentSection] = useState<"time" | "details" | "finish">("time")
    const [sectionFinished, setSectionFinished] = useState<boolean>(false)
    const [loadDetails, setLoadDetails] = useState<boolean>(true)
    const [reservationDetails, setReservationDetails] = useState<OrderResponse>()
    const {businessName} = useParams()
    const { clientToken } = useData();
    console.log(clientToken)

    const fetchServiceDetails = async () => {
        await axios.get(`${import.meta.env.VITE_APP_URL}/order/${serviceId}`
        )
            .then(function (response) {
                setOrderData(response.data)
                setLoadDetails(false)
                setReservationDetails({
                    ...reservationDetails,
                    serviceId: response.data.serviceDTO.id,
                    loggedClient: clientToken? true: false,
                    agreements: false
                })

            }).catch(function (error) {
                console.log(error);
            })
    }

    const postReservation = async () => {
        setCurrentSection("finish")
        if (reservationDetails?.chosenDate) {
            const payload = {
                ...reservationDetails,
                chosenDate: toLocalDateTimeString(reservationDetails.chosenDate)
            }
            console.log(payload)

            axios.post(`${import.meta.env.VITE_APP_URL}/order`,
                payload,
            ).then(function (response) {
            }).catch(function (error) {
            })

        }
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
        <div className="flex flex-col min-h-screen">
            
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
                <div className="flex flex-1">

                    <div className="w-3/5 p-6">
                        {currentSection === "time" ?
                            <SelectTime
                                setReservationDetails={setReservationDetails}
                                reservationDetails={reservationDetails}
                                availability={orderData.availabiltyDTO}
                                serviceDuration={orderData.serviceDTO.duration}
                                setSectionFinished={setSectionFinished}
                            ></SelectTime>
                            : currentSection === "details" ?
                                <ClientDetails
                                    onSuccess={postReservation}
                                    setReservationDetails={setReservationDetails}
                                    reservationDetails={reservationDetails}
                                ></ClientDetails>
                                :
                                <FinishedReservation businessName={businessName} mail={reservationDetails?.email}></FinishedReservation>
                        }

                    </div>
                    <div className="ml-auto w-2/5">
                        <div className="bg-gray-200 px-6 py-10">
                            <h2 className="text-3xl font-bold">Summary</h2>
                            <div className="bg-white p-6 mt-6 rounded-2xl">
                                <div className="flex items-center">
                                    {
                                        orderData.bussinessPictureUrl ?
                                            <img className="w-20 rounded-2xl object-contain overflow-hidden" src={orderData.bussinessPictureUrl} alt="Background picture" />
                                            :
                                            <Image className="w-20 aspect-square text-gray-400" />

                                    }
                                    <p className="ml-10 font-bold">{orderData.bussinessName}</p>
                                </div>
                                <div className="flex mt-6 items-center border-t-2 py-6 border-gray-300 w-full">
                                    {
                                        orderData.serviceDTO.servicePictureURL ?
                                            <img className="h-20 w-20 aspect-square rounded-2xl object-contain overflow-hidden" src={orderData.serviceDTO.servicePictureURL} alt="Background picture" />
                                            :
                                            <Image className="h-20 w-20 aspect-square text-gray-400" />

                                    }
                                    <div className="flex-1 ml-10">
                                        <div className="flex w-full justify-between">
                                            <p className="font-medium">{orderData.serviceDTO.name}</p>
                                            <p className="font-bold">{orderData.serviceDTO.price} USD</p>
                                        </div>
                                        <div className="flex w-full items-center mt-2">
                                            <p className="">{orderData.serviceDTO.duration / 60} minutes</p>
                                            {currentSection !== "time" && reservationDetails?.chosenDate ?
                                                <>
                                                    <Dot></Dot>
                                                    <p>
                                                        {monthTypes[reservationDetails.chosenDate.getMonth()]}
                                                        {" "}
                                                        {reservationDetails.chosenDate.getDate()}, {reservationDetails.chosenDate.getFullYear()}
                                                        {" at "}
                                                        {reservationDetails.chosenDate.getHours() < 10 ?
                                                            0 : null
                                                        }
                                                        {reservationDetails.chosenDate.getHours()}
                                                        :
                                                        {reservationDetails.chosenDate.getMinutes()}
                                                        {reservationDetails.chosenDate.getMinutes() < 10 ?
                                                            0 : null
                                                        }
                                                         </p>
                                                </>
                                                : null
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="flex font-bold border-t-2 pt-6 border-gray-300">
                                    <p>Total</p>
                                    <p className="ml-auto">{orderData.serviceDTO.price} USD</p>
                                </div>
                                {sectionFinished && currentSection === "time" ?
                                    <button
                                        onClick={() => { setCurrentSection("details"); setSectionFinished(false) }}
                                        className="bg-blue-500 text-white font-medium w-full px-4 py-2 mt-6 rounded-md cursor-pointer duration-200 hover:bg-blue-600">CONTINUE</button>
                                    : null
                                }
                                {currentSection === "details" ?
                                    <button
                                        type="submit"
                                        form="client-details-form"
                                        className="bg-blue-500 text-white font-medium w-full px-4 py-2 mt-6 rounded-md cursor-pointer flex justify-center items-center duration-200 hover:bg-blue-600">
                                        <LockKeyhole className="mr-4 h-[1.5em]"></LockKeyhole>
                                        <span> CONFIRM BOOKING</span>
                                    </button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            
            <FooterReservation></FooterReservation>
        </div>
    )
}