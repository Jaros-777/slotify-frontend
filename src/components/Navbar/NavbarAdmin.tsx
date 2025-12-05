import { useNavigate } from "react-router-dom"
import Logo from "../../assets/Slotify Logo.webp"
import CalendarIcon from "./assets/calendar-icon.png"
import ClientIcon from "./assets/client-icon.png"
import LinkIcon from "./assets/link-icon.png"
import SettingsIcon from "./assets/settings-icon.png"
import { useState } from "react"


export const NavbarAdmin = () => {
    const [showDropBar, setShowDropBar] = useState<boolean>(false)

    const navigate = useNavigate();

    function logOut(){
        localStorage.clear()
        window.scrollTo(0,0)
        navigate("/")
    }

    return (
        <header id="navbar" className="flex h-20 px-20 w-full fixed top-0 left-0 z-100 bg-white justify-between items-center border-b-1 border-gray-300 ">
            <a className="h-[100%] flex items-center justify-center" href="/"><img className="h-[50%]" src={Logo} alt="Slotify" /></a>

            <div className="flex">
                <button onClick={()=>{navigate("/admin/calendar");window.scrollTo(0,0)}} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <img src={CalendarIcon} alt="Calendar" className="mr-4 h-[1.5em]" />
                    <span>Calendar</span>
                </button>
                <button className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <img src={ClientIcon} alt="Calendar" className="mr-4 h-[1.5em]" />
                    <span>Clients</span>
                </button>
                <button onClick={()=>{navigate("/admin/booking/get-booking");window.scrollTo(0,0)}} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <img src={LinkIcon} alt="Calendar" className="mr-4 h-[1.5em]" />
                    <span>Online booking</span>
                </button>
                <button onClick={()=>{navigate("/admin/settings/services");window.scrollTo(0,0)}} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <img src={SettingsIcon} alt="Settings" className="mr-4 h-[1.5em]" />
                    <span>Settings</span>
                </button>
            </div>

            <div className="bg-gray-300 rounded-full h-12 w-12 aspect-square flex items-center justify-center cursor-pointer relative" onClick={()=>showDropBar? setShowDropBar(false) : setShowDropBar(true)}>
                <p>US</p>
                {showDropBar ?
                    <ul className="absolute top-[3rem]  bg-white border-1 border-gray-300">
                        <li className="px-6 py-2 whitespace-nowrap">User profile</li>
                        <li className="px-6 py-2 whitespace-nowrap border-t-1 border-gray-300">Support</li>
                        <li className="px-6 py-2 whitespace-nowrap border-t-1 border-gray-300" onClick={logOut}>Log out</li>
                    </ul>

                    : null
                }
            </div>



        </header>
    )
}