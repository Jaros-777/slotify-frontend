import { useNavigate } from "react-router-dom"
import Logo from "../../assets/Slotify Logo.webp"
import CalendarIcon from "./assets/calendar-icon.png"
import ClientIcon from "./assets/client-icon.png"
import LinkIcon from "./assets/link-icon.png"
import SettingsIcon from "./assets/settings-icon.png"


export const NavbarAdmin = () => {

    const navigate = useNavigate();

    return (
        <header id="navbar" className="flex h-20 px-20 w-full  fixed top-0 left-0 bg-white justify-between items-center border-b-1 border-gray-300 ">
            <a className="h-[100%] flex items-center justify-center" href="/"><img className="h-[50%]" src={Logo} alt="Slotify" /></a>

            <div className="flex">
                <button className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <img src={CalendarIcon} alt="Calendar" className="mr-4 h-[1.5em]" />
                    <span>Calendar</span>
                </button>
                <button className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <img src={ClientIcon} alt="Calendar" className="mr-4 h-[1.5em]" />
                    <span>Clients</span>
                </button>
                <button className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <img src={LinkIcon} alt="Calendar" className="mr-4 h-[1.5em]" />
                    <span>Online booking</span>
                </button>
                <button className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <img src={SettingsIcon} alt="Calendar" className="mr-4 h-[1.5em]" />
                    <span>Settings</span>
                </button>
            </div>
            <div className="bg-gray-300 rounded-full h-12 w-12 aspect-square flex items-center justify-center cursor-pointer">
                <p className="">US</p>
            </div>


        </header>
    )
}