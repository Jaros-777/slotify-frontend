import { Check, LockKeyhole, Dot } from "lucide-react"
import { useEffect, useState } from "react"
import { Image } from "lucide-react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import type { OrderType } from "./types/OrderType"
import { SelectTime } from "./components/SelectTime"
import { ClientDetails } from "./components/ClientDetails"
import { FinishedReservation } from "./components/FinishedReservation"
import type { OrderResponse } from "../../types/OrderResponse"
import { monthTypes } from "./types/dayAndMonthNames"
import { toLocalDateTimeString } from "../../../Admin/components/Calendar/components/BigCalendar/utils/dateUtils"
import { FooterReservation } from "../../../../components/Footer/FooterReservation"
import { useData } from "../../../../AppRouter"
import { LoadingPage } from "../../../../LoadingPage"


export const Order = () => {
    const { serviceId } = useParams()
    const [orderData, setOrderData] = useState<OrderType>()
    const [currentSection, setCurrentSection] = useState<"time" | "details" | "finish">("time")
    const [sectionFinished, setSectionFinished] = useState<boolean>(false)
    const [loadDetails, setLoadDetails] = useState<boolean>(true)
    const [reservationDetails, setReservationDetails] = useState<OrderResponse>({})
    const { businessName } = useParams()
    const { clientDetails } = useData();
    const [showReservationError, setShowReservationError] = useState<boolean>(false)
    const [reservationErrorText, setReservationErrorText] = useState<string | null>(null)
    const navigate = useNavigate();
    const [remaningTime, setRemaningTime] = useState<number>(300)
    const [showRemaningTime, setShowRemaningTime] = useState<boolean>(false)

    const fetchServiceDetails = async () => {
        await axios.get(`${import.meta.env.VITE_APP_URL}/order/${serviceId}`
        )
            .then(function (response) {
                setOrderData(response.data)
                setLoadDetails(false)
                setReservationDetails({
                    agreements: false
                })

            }).catch(function (error) {
                navigate("*")
                console.log(error);
            })
    }

    const postPreReservation = async () => {

        setShowReservationError(false)
        setReservationErrorText(null);
        sessionStorage.clear();

        if (reservationDetails?.chosenDate) {
            const payload = {
                serviceId,
                chosenDate: toLocalDateTimeString(reservationDetails.chosenDate)
            }
            axios.post(`${import.meta.env.VITE_APP_URL}/order/pre`,
                payload,
            ).then(function (response) {
                setShowRemaningTime(true);
                sessionStorage.setItem("reservationId", response.data);
                setCurrentSection("details");
                setSectionFinished(false);
                window.scrollTo(0, 0)
                setShowReservationError(false)
                
            }).catch(function (error) {
                if (error.response.status === 409) {
                    setShowReservationError(true)
                    setReservationErrorText("Someone has just booked this time, please choose another one.");
                    fetchServiceDetails();
                } else
                    console.log(error)
            })

        }
    }

    const postReservation = async () => {
        const reservationToken = sessionStorage.getItem("reservationId");
        if (reservationDetails?.chosenDate && reservationToken) {
            const payload = {
                ...reservationDetails,
                chosenDate: toLocalDateTimeString(reservationDetails.chosenDate),
                reservationToken: reservationToken
            }
            axios.post(`${import.meta.env.VITE_APP_URL}/order`,
                payload,
            ).then(function (response) {
                setCurrentSection("finish")
                sessionStorage.clear()
                setShowRemaningTime(false)
            }).catch(function (error) {
            })

        }
    }

    const handleLoadClientDetails = async () => {
        if (clientDetails) {
            let nameTab: string[] = [];
            nameTab[0] = clientDetails.name

            if (clientDetails.name.includes(" ")) {
                nameTab = clientDetails.name.split(" ")
            }
            setReservationDetails(prev => ({
                ...prev,
                email: clientDetails.email,
                firstName: nameTab[0],
                lastName: nameTab[1] || "",
                phone: clientDetails.phone
            }))
        }
    }

    useEffect(() => {
        (async () => {
            setLoadDetails(false)
            await fetchServiceDetails()
            await handleLoadClientDetails()

        })();
    }, [])

    useEffect(() => {

        if (showRemaningTime && remaningTime > 0) {
            setTimeout(() => {
                setRemaningTime(prev => prev - 1);
            }, 1000)

        } else if (remaningTime <= 0) {
            setShowReservationError(true)
            setReservationErrorText("Your time expired, please choose new availability date");
            fetchServiceDetails();
            setCurrentSection("time")
            setRemaningTime(300)
            setShowRemaningTime(false)

        }

    }, [showRemaningTime, remaningTime])

    if (loadDetails || !orderData) {
        return <LoadingPage text="Loading business details..." ></LoadingPage>;
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
            <div className="flex flex-col lg:flex-row flex-1">

                <div className="w-full lg:w-3/5 p-6">
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
                <div className="lg:ml-auto w-full lg:w-2/5">
                    <div className="bg-gray-200 px-6 py-10">
                        <h2 className="text-3xl font-bold">Summary</h2>
                        {showRemaningTime ?
                            <div className="w-full text-center font-medium">
                                <p>Time to complete booking:</p>
                                <p className={remaningTime <= 10 ? "text-red-500" : "" + "text-xl mt-2"} >{Math.floor(remaningTime / 60)}:{remaningTime % 60 < 10 ? "0" : null}{remaningTime % 60}</p>
                            </div>
                            : null
                        }
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
                                    <div className="flex flex-col lg:flex-row w-full items-start lg:items-center mt-2">
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
                            {
                                showReservationError == true ?
                                    <p className="w-full text-center mt-4 text-red-500 font-medium border border-gray-300 rounded-2xl p-4">{reservationErrorText}</p>
                                    : null
                            }
                            {sectionFinished && currentSection === "time" ?
                                <button
                                    onClick={() => postPreReservation()}
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