import { useNavigate, useParams } from "react-router-dom"
import { Image, Share2, Globe, Dot, Navigation } from "lucide-react"
import { useEffect, useState } from "react"
import type { ServiceType } from "../Admin/components/types/ServiceType"
import axios from "axios"
import type { BusinessProfileType } from "../Admin/components/Booking/components/BusinessProfile/types/BusinessProfileType"
import { FooterReservation } from "../../components/Footer/FooterReservation"
import FacebookLogo from "../Admin/components/Booking/components/assets/Facebook_Logo_Primary.png"
import type { scheduleDay } from "../Admin//components/Settings/components/Availability/utlis/scheduleType"
import { NavBarClient } from "../../components/Navbar/NavBarClient"
import { LoadingPage } from "../../LoadingPage"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { mapPointIcon } from "../Admin/components/Booking/components/BusinessProfile/utils/MapPointIcon"


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
    const [businessDetail, setBusinessDetail] = useState<BusinessProfileType>()
    const [serviceData, setServiceData] = useState<Partial<ServiceType[]>>([])
    const [loadDetails, setLoadDetails] = useState<boolean>(true)
    const [schedulePlan, setSchedulePlan] = useState<scheduleDay[]>([])
    const [currentDayOfWeek, setCurrentDayOfWeek] = useState<number>(0)
    const navigate = useNavigate()
    const [showServiceDescription, setShowServiceDescription] = useState<string | null>()


    const handleValidPage = async () => {
        setLoadDetails(true)

        await axios.get(`${import.meta.env.VITE_APP_URL}/business-page/${businessName}`)
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
                navigate("*")
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
            setCurrentDayOfWeek(new Date().getDay())

        })();
    }, []);

    if (loadDetails || !businessDetail) {
        return <LoadingPage text="Loading business details..." ></LoadingPage>;
    }

    return (
        <>
            <NavBarClient type="reservation" ></NavBarClient>
            <div className="w-full flex flex-col items-center">
                <section className=" w-full max-w-[80rem] h-50 lg:h-80 flex justify-center items-center">
                    {
                        businessDetail.backgroundPictureURL ?
                            <img className="h-full w-full object-cover overflow-hidden" src={businessDetail.backgroundPictureURL} alt="Background picture" />
                            :
                            <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />

                    }

                </section>
                <section className="flex flex-col items-center w-full p-4 pb-8 border-b border-gray-300 shadow-2xl">
                    <div className="flex justify-between px-4 py-2 w-full max-w-[80rem]">
                        <div className="grid grid-cols-[1fr_4fr] grid-rows-[auto_auto_auto] md:grid-rows-2 mx-4 items-start">

                            <div className="relative w-24 h-24 rounded-full flex items-center justify-center row-start-1 row-end-3">
                                {
                                    businessDetail.profilePictureURL ?
                                        <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={businessDetail.profilePictureURL} alt="Background picture" />
                                        :
                                        <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />
                                }
                            </div>
                            <div className="flex flex-col h-full ml-6 justify-center md:justify-end row-start-1 row-end-3  md:row-end-1">
                                <p className="font-bold text-xl">{businessDetail.businessName}</p>
                            </div>
                            <div className="md:ml-6 flex mt-6 md:mt-2 text-sm sm:items-center
                            col-start-1 col-end-3 md:col-start-2 row-start-3 row-end-3 md:row-start-2 md:row-end-2 
                            flex-col sm:flex-row
                            ">
                                <div className="flex">
                                    {currentOpenCompanyStatus() ?
                                        <p className=" text-green-700 font-bold">Open</p>
                                        :
                                        <p className=" text-red-700 font-bold">Closed</p>
                                    }
                                    {schedulePlan.filter(e => e.dayOfWeek === new Date().getDay())[0].isClose ?
                                        null
                                        :
                                        <p className="ml-2">({schedulePlan[currentDayOfWeek].openHour} - {schedulePlan[currentDayOfWeek].closeHour})</p>
                                    }
                                </div>
                                {businessDetail.address.city ?
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="flex mt-2 sm:mt-0">
                                            <Dot className="mx-2 hidden sm:block" />
                                            <p>{businessDetail.address.street} {businessDetail.address.houseNumber ? `${businessDetail.address.houseNumber}, ` : ""} {businessDetail.address.city}</p>
                                        </div>
                                        <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center cursor-pointer">
                                            <Navigation className="h-4" />
                                            <a href={`https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${businessDetail.address.lat},${businessDetail.address.lng}&travelmode=driving`} className="underline font-bold" target="_blank">Get directions</a>
                                        </div>
                                    </div>
                                    : null
                                }
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
                <section className="mt-10 py-4 px-4 md:px-8 w-full max-w-[80rem]">
                    <p className="text-2xl font-bold">Services</p>
                    <ul className="mt-4 border border-gray-300 rounded-md">
                        {serviceData.length > 0 ?
                            serviceData.map((e) => (
                                <li key={e?.id} className="grid grid-cols-1 grid-rows-[1fr_auto] md:flex p-4 border-b border-gray-300 items-center">
                                    <div className="flex">
                                        <div className="w-24 shrink-0 rounded-full overflow-hidden">
                                            {e?.servicePictureURL ?
                                                <img className="h-24 w-full object-contain rounded-full" src={e.servicePictureURL} alt="Service picture" />
                                                :
                                                <Image className="h-full w-full p-3 text-green-600"></Image>
                                            }
                                        </div>
                                        <div className={`ml-6 w-auto flex flex-col ${e?.description ? null : "justify-center"} `}>
                                            <p className="font-bold text-lg">{e?.name}</p>
                                            {e?.description ?
                                                <>
                                                    {showServiceDescription === e?.id ?
                                                        <p className="text-sm underline cursor-pointer mt-2 text-nowrap" onClick={() => setShowServiceDescription(null)}>Hide details</p>
                                                        :
                                                        <p className="text-sm underline cursor-pointer mt-2 text-nowrap" onClick={() => setShowServiceDescription(e?.id)}>Show details</p>
                                                    }
                                                    {showServiceDescription === e?.id ?
                                                        <p className="w-full md:w-2/3 mt-4">{e?.description}</p>
                                                        : null
                                                    }
                                                </>
                                                : null
                                            }

                                        </div>
                                    </div>
                                    <div className="md:ml-auto flex items-center mt-4 md:mt-0">
                                        <p className="ml-4 md:ml-0 font-bold text-nowrap col-start-1 row-start-2">{e?.price} USD</p>
                                        <button
                                            className="border border-blue-300 text-blue-400 font-bold px-4 py-2 rounded-md md:ml-4 cursor-pointer duration-200 
                                hover:bg-blue-200
                                            ml-auto md:m row-start-2
                                "
                                            onClick={() => navigate(`/${businessName}/order/${e?.id}`)}
                                        >
                                            Reservation
                                        </button>
                                    </div>
                                </li>
                            ))
                            : <p className="p-4 text-center">This company doesn't have any services yet</p>
                        }
                    </ul>

                </section>
                <section className="px-8 py-4 w-full max-w-[80rem]">
                    {businessDetail.slogan || businessDetail.description ?
                        <div>
                            <h2 className="text-2xl font-bold">About</h2>
                        </div>
                        : null
                    }
                    <div className="flex flex-col md:flex-row w-full justify-between">
                        <div className="w-full md:w-3/5">

                            {businessDetail.slogan ?
                                <div className="w-full mt-12">
                                    <p className="font-bold text-lg">Slogan</p>
                                    <p className="mt-4 pr-6 whitespace-pre-line">{businessDetail.slogan}</p>
                                </div>
                                : null}
                            {businessDetail.description ?
                                <div className="w-full mt-12">
                                    <p className="font-bold text-lg">Who we are</p>
                                    <p className="mt-4 pr-6 whitespace-pre-line">{businessDetail.description}</p>
                                </div>
                                : null}
                        </div>
                        <div className="min-w-60">
                            {businessDetail.websiteURL || businessDetail.facebookURL ?
                                <div>
                                    <h2 className="font-bold mt-4 text-lg">Contact details</h2>
                                    <div className="flex flex-col sm:flex-row  mt-4">
                                        {businessDetail.websiteURL ?
                                            <a href={businessDetail.websiteURL} className="flex items-center" target="_blank">
                                                <Globe className="h-5"></Globe>
                                                <p className="ml-4 underline text-nowrap">Web Page</p>
                                            </a>
                                            : null
                                        }
                                        {businessDetail.facebookURL ?
                                            <a href={businessDetail.facebookURL} className="flex mt-4 sm:mt-0 sm:ml-6 items-center" target="_blank">
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
                {businessDetail.address.lat && businessDetail.address.lng ?
                    <section className="px-4 md:px-8 py-4 w-full max-w-[80rem] mt-4">
                            <h2 className="text-xl font-bold">Address</h2>
                            <div className="border border-gray-300 rounded-md w-full p-4 mt-4">
                                <div className="mt-4 h-90">
                                    <MapContainer
                                        center={[businessDetail.address.lat, businessDetail.address.lng]}
                                        zoom={13}
                                        style={{ height: "100%", width: "100%", zIndex: "1" }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution="&copy; OpenStreetMap contributors"
                                        />
                                        <Marker position={[businessDetail.address.lat, businessDetail.address.lng]} icon={mapPointIcon}>
                                            <Popup>
                                                {businessDetail.address.street} {businessDetail.address.houseNumber ? `${businessDetail.address.houseNumber}, ` : ""}
                                                {businessDetail.address.city} {businessDetail.address.postalCode}
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>

                                <p className="mt-4 font-medium">{businessDetail.address.street} {businessDetail.address.houseNumber ? `${businessDetail.address.houseNumber}, ` : ""} {businessDetail.address.city}</p>
                                <p>{businessDetail.address.note}</p>
                                <div className="mt-4 flex items-center cursor-pointer">
                                    <Navigation className="h-4" />
                                    <a href={`https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${businessDetail.address.lat},${businessDetail.address.lng}&travelmode=driving`} className="underline font-bold" target="_blank">Get directions</a>
                                </div>
                            </div>
                    </section>
                    : null
                }
            </div>
            <FooterReservation></FooterReservation>
        </>
    )
}