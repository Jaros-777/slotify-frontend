import { useNavigate, useParams } from "react-router-dom"
import { Image, Share2, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import type { ServiceType } from "../Admin/components/types/ServiceType"
import axios from "axios"
import type { BusinessProfileType } from "../Admin/components/types/BusinessProfileType"
import { FooterReservation } from "../../components/Footer/FooterReservation"
import FacebookLogo from "../Admin/components/Booking/components/assets/Facebook_Logo_Primary.png"
import type { scheduleDay } from "../Admin//components/Settings/components/Availability/utlis/scheduleType"


const dayTypes = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

export const Reservation = () => {
    const { businessName } = useParams<{ businessName: string }>()
    const [businessDetail, setBusinessDetail] = useState<Partial<BusinessProfileType>>({})
    const [serviceData, setServiceData] = useState<Partial<ServiceType[]>>([])
    const [loadDetails, setLoadDetails] = useState<boolean>(true)
    const [schedulePlan, setSchedulePlan] = useState<scheduleDay[]>([])
    const [currentDayOfWeek, setCurrentDayOfWeek] = useState<number>(0)
    const navigate = useNavigate()


    const handleValidPage = async () => {
        setLoadDetails(true)

        await axios.get(`http://localhost:8080/business-page/${businessName}`)
            .then((response) => {
                setBusinessDetail(response.data.businessProfileDTO)
                const serData = response.data.servicesDTO
                setServiceData(serData.filter((service: { isEditable: boolean }) => service.isEditable === true))
                const sortedSchedule = response.data.availabilityDTO.sort((a: scheduleDay, b: scheduleDay) => a.dayOfWeek - b.dayOfWeek)
                setSchedulePlan(sortedSchedule)
                setLoadDetails(false)
            })
            .catch((error) => {
                console.log(error)
                navigate("/not-found")
            })
    }

    function currentOpenCompanyStatus() {
        if (!schedulePlan[currentDayOfWeek]) return false;

        const currentTime = new Date();
        const todayAvailability = schedulePlan[currentDayOfWeek];

        if (todayAvailability.isClose) return false;

        const [openHours, openMinutes] = todayAvailability.openHour.split(":").map(Number);
        const [closeHours, closeMinutes] = todayAvailability.closeHour.split(":").map(Number);

        const openTime = new Date(currentTime);
        openTime.setHours(openHours, openMinutes, 0, 0);

        const closeTime = new Date(currentTime);
        closeTime.setHours(closeHours, closeMinutes, 0, 0);

        return currentTime >= openTime && currentTime <= closeTime;
    }



    useEffect(() => {
        (async () => {
            await handleValidPage()
            setCurrentDayOfWeek((new Date().getDay() + 6) % 7)

        })();
    }, []);

    if (loadDetails) {
        return <p className="mt-20">Loading business details...</p>;
    }

    return (
        <>
            <nav className="border-b border-gray-300 flex justify-between px-40 py-6">
                <p className="font-bold">{businessDetail.businessName}</p>
                <div>
                    {/* <CircleUserRound/> */}
                    <button>Log in</button>
                </div>

            </nav>
            <div className="w-full flex flex-col items-center ">
                <section className="h-70 relative w-full flex justify-center items-center">
                    {
                        businessDetail.backgroundPictureURL ?
                            <img className="h-full w-full object-contain overflow-hidden" src={businessDetail.backgroundPictureURL} alt="Background picture" />
                            :
                            <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />

                    }

                </section>
                <section className="flex flex-col items-center w-full p-4 pb-8 border-b border-gray-300 shadow-2xl">
                    <div className="flex justify-between px-4 py-2 w-[80rem]">
                        <div className="flex mx-4 items-center">

                            <div className="relative w-24 h-24 rounded-full flex items-center justify-center">
                                {
                                    businessDetail.profilePictureURL ?
                                        <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={businessDetail.profilePictureURL} alt="Background picture" />
                                        :
                                        <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />
                                }
                            </div>


                            <div className="ml-6">
                                <p className="font-bold text-xl">{businessDetail.businessName}</p>
                                <div className="flex mt-2">
                                    {currentOpenCompanyStatus() ?
                                        <p className="text-sm text-green-700 font-bold">Open</p>
                                        :
                                        <p className="text-sm text-red-700 font-bold">Closed</p>
                                    }
                                    <p className="text-sm ml-2">({schedulePlan[currentDayOfWeek].openHour} - {schedulePlan[currentDayOfWeek].closeHour})</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex flex-col justify-center items-center">
                            <div className="bg-gray-200 p-4 rounded-full">
                                <Share2></Share2>
                            </div>
                            <p className="mt-2">Share</p>
                        </div> */}
                    </div>

                </section>
                <section className="mt-10 p-4 w-[80rem]">
                    <p className="text-2xl font-bold">Services</p>
                    <ul className="mt-4 border border-gray-300 rounded-md">
                        {serviceData.map((e) => (
                            <li key={e?.id} className="flex p-4 border-b border-gray-300 items-center">
                                <div className="w-24 bg-green-100  rounded-full overflow-hidden">
                                    {e?.servicePictureURL ?
                                        <img src={e.servicePictureURL} alt="Service picture" />
                                        :
                                        <Image className="h-full w-full p-2 text-green-600"></Image>
                                    }
                                </div>
                                <div className="ml-6">
                                    <p className="font-bold text-lg">{e?.name}</p>
                                    <p className="text-sm underline cursor-pointer mt-2">Show details</p>
                                </div>
                                <div className="ml-auto flex items-center">
                                    <p className="font-bold">{e?.price} USD</p>
                                    <button
                                        className="border border-blue-300 text-blue-400 font-bold px-4 py-2 rounded-md ml-4 cursor-pointer duration-200 
                                hover:bg-blue-200"
                                        onClick={() => navigate(`/${businessName}/order/${e?.id}`)}
                                    >
                                        Reservation
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </section>
                <section className="px-6 py-4 w-[80rem]">
                    <div>
                        <h2 className="text-2xl font-bold">About</h2>
                    </div>
                    <div className="flex justify-between">
                        <div>

                            {businessDetail.slogan ?
                                <div className="w-1/2">
                                    <p className="font-bold mt-8 text-lg">Slogan</p>
                                    <p className="mt-4">{businessDetail.slogan}</p>
                                </div>
                                : null}
                            {businessDetail.description ?
                                <div className="w-1/2">
                                    <p className="font-bold mt-8 text-lg">Who we are</p>
                                    <p className="mt-4">{businessDetail.description}</p>
                                </div>
                                : null}
                        </div>
                        <div className="">
                            {businessDetail.websiteURL || businessDetail.facebookURL ?
                                <div>
                                    <h2 className="font-bold mt-4 text-lg">Contact details</h2>
                                    <div className="flex mt-4">
                                        {businessDetail.websiteURL ?
                                            <a href={businessDetail.websiteURL} className="flex items-center" target="_blank">
                                                <Globe className="h-5"></Globe>
                                                <p className="ml-4 underline text-nowrap">Web Page</p>
                                            </a>
                                            : null
                                        }
                                        {businessDetail.facebookURL ?
                                            <a href={businessDetail.facebookURL} className="flex ml-6" target="_blank">
                                                <img src={FacebookLogo} alt="Facebok logo" className="h-5" />
                                                <p className="ml-4 underline text-nowrap">Facebook page</p>
                                            </a>
                                            : null
                                        }

                                    </div>
                                </div>
                                : null}
                            <h2 className="font-bold mt-10 text-lg">Opening hours</h2>
                            <div className="flex">
                                <ul className="w-30 mt-2 decoration-none">
                                    {schedulePlan.map(e => (
                                        <li key={e.id} className="decoration-none">
                                            <p className="mt-2 font-medium">{dayTypes[e.dayOfWeek]}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="mt-2 decoration-none">
                                    {schedulePlan.map(e => (
                                        <li key={e.id} className="decoration-none">
                                            {e.isClose ?
                                                <p className="mt-2">Closed</p>
                                                :
                                                <p className="mt-2">{e.openHour} - {e.closeHour}</p>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterReservation></FooterReservation>
        </>
    )
}