import { data, useNavigate } from "react-router-dom"
import Logo from "../../assets/Slotify Logo.webp"
import { useEffect, useState } from "react"
import { CalendarDays, User, Link, Settings, BellRing, Image } from "lucide-react"
import type { NotificationType } from "./types/NotificationType"
import axios from "axios"
import { useData } from "@/AppRouter"


export const NavbarAdmin = () => {
    const [showDropBarUser, setShowDropBarUser] = useState<boolean>(false)
    const [showDropBarNotification, setShowDropBarNotification] = useState<boolean>(false)
    const [activeSection, setActiveSection] = useState<"calendar" | "client" | "booking" | "settings">()
    const section = window.location.href.split("/")[4];
    const { userToken, setBusinessPictureURL } = useData()
    const [notificationData, setNotificationData] = useState<NotificationType[]>([])
    const [businessImgUrl, setBusinessImgUrl] = useState<string | null>()

    const navigate = useNavigate();

    function logOut() {
        localStorage.clear()
        window.scrollTo(0, 0)
        navigate("/")
    }

    const fetchNotification = async () => {
        await axios.get(`${import.meta.env.VITE_APP_URL}/notification`,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(response => {
            const sorted = response.data.notificationDTO.map((e: NotificationType) => ({
                ...e,
                date: new Date(e.date),
                bookingStartDate: new Date(e.bookingStartDate),
            })).sort(
                (a: NotificationType, b: NotificationType) => b.date.getTime() - a.date.getTime()
            )
            setNotificationData(sorted)
            if (response.data.businessImgUrl) {
                setBusinessImgUrl(response.data.businessImgUrl)
                setBusinessPictureURL(response.data.businessImgUrl)
            }

        }).catch(function (error) {
            console.log(error)
        })
    }

    const notificationDate = (date: Date): string => {
        const today = new Date();

        if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate()) {

            if (today.getHours() === date.getHours()) {
                return (today.getMinutes() - date.getMinutes()) + "min ago"

            } if ((today.getHours() - date.getHours()) <= 12) {
                return (today.getHours() - date.getHours()) + "h ago"
            } else {
                return String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0")
            }



        } else
            return String(date.getDate()).padStart(2, "0") + "." + String(date.getMonth() + 1).padStart(2, "0") + "."
                + date.getFullYear() + " "
                + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0")

    }

    const markAsReaded = async (notificationId: string, bookingStartDate: Date) => {

        await axios.post(`${import.meta.env.VITE_APP_URL}/notification/${notificationId}`,
            null,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(response => {
            localStorage.setItem("currentWeek", bookingStartDate.toDateString())
            window.location.reload()
        }).catch(function (error) {
            console.log(error)
        })

    }

    const markAllAsReaded = async () => {


        await axios.post(`${import.meta.env.VITE_APP_URL}/notification/mark-all`,
            null,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(response => {
            window.location.reload()
        }).catch(function (error) {
            console.log(error)
        })

    }

    useEffect(() => {
        (async () => {
            if (userToken)
                await fetchNotification();
        })();
    }, [userToken]);

    useEffect(() => {
        const current = section as "calendar" | "client" | "booking" | "settings"
        setActiveSection(current)
    }, [section, window.location.href])

    useEffect(() => {
        const handleClick = () => {
            setShowDropBarNotification(false);
            setShowDropBarUser(false);
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <header
            id="navbar"
            className="flex h-20 px-12 xl:px-20 w-full fixed top-0 left-0 z-60 bg-white justify-between items-center border-b-1 border-gray-300 "
        >
            <a className="h-[100%] flex items-center justify-center shrink-0" href="/"><img className="h-[50%]" src={Logo} alt="Slotify" /></a>

            <div className="hidden lg:flex">
                <button onClick={() => { navigate("/admin/calendar"); window.scrollTo(0, 0), setActiveSection("calendar") }} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <CalendarDays className={activeSection === "calendar" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                    <span className={activeSection === "calendar" ? "text-blue-500" : ""}>Calendar</span>
                </button>
                <button onClick={() => { navigate("/admin/client"); window.scrollTo(0, 0), setActiveSection("client") }} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <User className={activeSection === "client" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                    <span className={activeSection === "client" ? "text-blue-500" : ""}>Clients</span>
                </button>
                <button onClick={() => { navigate("/admin/booking/get-booking"); window.scrollTo(0, 0), setActiveSection("booking") }} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <Link className={`${activeSection === "booking" ? "text-blue-500" : null} mr-4 h-[1.5em] shrink-0`} />
                    <span className={`${activeSection === "booking" ? "text-blue-500" : ""} text-nowrap`}>Online booking</span>
                </button>
                <button onClick={() => { navigate("/admin/settings/availability"); window.scrollTo(0, 0), setActiveSection("settings") }} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <Settings className={activeSection === "settings" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                    <span className={activeSection === "settings" ? "text-blue-500" : ""}>Settings</span>
                </button>
            </div>
            <div className="flex items-center h-3/6">
                <div className="mr-10 flex items-center justify-center cursor-pointer relative">
                    <BellRing
                        className="hidden lg:block p-2 w-10 h-10 duration-200 hover:text-blue-500 shrink-0"
                        onClick={(e) => { e.stopPropagation(), setShowDropBarNotification(!showDropBarNotification), setShowDropBarUser(false) }} />
                    <div className={`hidden lg:block absolute bottom-0 ${notificationData.filter(e => e.isReaded === false).length > 10 ? "-right-3" : "-right-1"}`}>
                        <p className="font-bold text-blue-500">{notificationData.filter(e => e.isReaded === false).length}</p>
                    </div>
                    {showDropBarNotification ?
                        <div className="fixed top-18 right-2 lg:right-4 z-60 bg-white border-1 border-gray-300 w-[calc(100%-1rem)] lg:w-90 flex flex-col justify-center p-2 max-h-150">
                            <p className="text-center font-bold my-2">Notifications</p>
                            <button className="mt-2 ml-auto text-blue-500 cursor-pointer font-medium" onClick={markAllAsReaded}>Mark all as read</button>
                            {notificationData.length > 0 ?
                                <ul className="mt-2 max-h-100 overflow-y-scroll">
                                    {notificationData.map(e => (
                                        <div
                                            key={e.id}
                                            className={`p-2 border-t-1 border-gray-300 hover:bg-gray-300 ${e.isReaded ? "bg-white" : "bg-blue-200"}`}
                                            onClick={() => markAsReaded(e.id, e.bookingStartDate)}
                                        >
                                            <div className="flex ">
                                                {e.clientImgUrl ?
                                                    <img className="h-10 w-10 overflow-hidden rounded-full flex items-center justify-center" src={e.clientImgUrl} alt="Profile picture" />
                                                    :
                                                    <Image className="h-10 w-10 aspect-square text-gray-400" />
                                                }
                                                <p className="ml-4">{e.clientName} reserved "{e.serviceName}"</p>
                                            </div>
                                            <p className="text-gray-500 mt-2">{notificationDate(e.date)}</p>
                                        </div>
                                    )
                                    )}


                                </ul>
                                :
                                <p className="text-center overflow-auto my-4">You don't have any notification yet</p>
                            }
                        </div>
                        : null
                    }
                </div>
                <div className="bg-gray-300 rounded-2xl h-12 w-12 aspect-square flex items-center justify-center cursor-pointer relative" onClick={(e) => { e.stopPropagation(), setShowDropBarUser(!showDropBarUser), setShowDropBarNotification(false) }}>

                    {businessImgUrl ?
                        <img className="h-full w-full object-contain overflow-hidden rounded-2xl" src={businessImgUrl} alt="Background picture" />
                        :
                        <p>US</p>
                    }

                    {showDropBarUser ?
                        <ul className="fixed lg:absolute top-20 lg:top-[3.5rem] left-0 lg:left-auto w-full lg:w-auto  lg:-right-10 bg-white border-1 border-gray-300">
                            <div className="block lg:hidden">
                                <li
                                    className={`px-6 py-2 flex ${notificationData.filter(e => e.isReaded === false).length > 0 ? "text-blue-500" : null}`}
                                    onClick={(e) => { e.stopPropagation(), setShowDropBarNotification(!showDropBarNotification), setShowDropBarUser(false) }}
                                >
                                    <p>Notifications </p>
                                    {notificationData.filter(e => e.isReaded === false).length > 0 ?
                                        <p className="ml-2"> - {notificationData.filter(e => e.isReaded === false).length} new</p>
                                        :
                                        <p className="ml-2"> - nothing new</p>
                                    }
                                </li>
                                <li
                                    onClick={() => { navigate("/admin/calendar"); window.scrollTo(0, 0), setActiveSection("calendar") }}
                                    className="px-6 py-2 cursor-pointer hover:text-blue-400 duration-200 flex items-center border-t-1 border-gray-300"
                                >
                                    <CalendarDays className={activeSection === "calendar" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                                    <span className={activeSection === "calendar" ? "text-blue-500" : ""}>Calendar</span>
                                </li>
                                <li
                                    onClick={() => { navigate("/admin/client"); window.scrollTo(0, 0), setActiveSection("client") }}
                                    className="px-6 py-2 cursor-pointer hover:text-blue-400 duration-200 flex items-center border-t-1 border-gray-300"
                                >
                                    <User className={activeSection === "client" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                                    <span className={activeSection === "client" ? "text-blue-500" : ""}>Clients</span>
                                </li>
                                <li
                                    onClick={() => { navigate("/admin/booking/get-booking"); window.scrollTo(0, 0), setActiveSection("booking") }}
                                    className="px-6 py-2 cursor-pointer hover:text-blue-400 duration-200 flex items-center border-t-1 border-gray-300"
                                >
                                    <Link className={`${activeSection === "booking" ? "text-blue-500" : null} mr-4 h-[1.5em] shrink-0`} />
                                    <span className={`${activeSection === "booking" ? "text-blue-500" : ""} text-nowrap`}>Online booking</span>
                                </li>
                                <li
                                    onClick={() => { navigate("/admin/settings/availability"); window.scrollTo(0, 0), setActiveSection("settings") }}
                                    className="px-6 py-2 cursor-pointer hover:text-blue-400 duration-200 flex items-center border-t-1 border-gray-300"
                                >
                                    <Settings className={activeSection === "settings" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                                    <span className={activeSection === "settings" ? "text-blue-500" : ""}>Settings</span>
                                </li>
                            </div>
                            <li className="px-6 py-2 whitespace-nowrap border-t-1 border-gray-300" onClick={() => navigate("/admin/user")}>User profile</li>
                            <li className="px-6 py-2 whitespace-nowrap border-t-1 border-gray-300" onClick={() => alert("This section isn't implemented yet!")}>Support</li>
                            <li className="px-6 py-2 whitespace-nowrap border-t-1 border-gray-300" onClick={logOut}>Log out</li>
                        </ul>

                        : null
                    }
                </div>
            </div>



        </header>
    )
}