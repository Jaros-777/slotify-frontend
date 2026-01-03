import { useNavigate } from "react-router-dom"
import Logo from "../../assets/Slotify Logo.webp"
import { useEffect, useState } from "react"
import { CalendarDays, User, Link, Settings } from "lucide-react"


export const NavbarAdmin = () => {
    const [showDropBar, setShowDropBar] = useState<boolean>(false)
    const [activeSection, setActiveSection] = useState<"calendar" | "clients" | "booking" | "settings">()
    const section = window.location.href.split("/")[4];

    const navigate = useNavigate();

    function logOut() {
        localStorage.clear()
        window.scrollTo(0, 0)
        navigate("/")
    }

    useEffect(() => {
        const current = section as "calendar" | "clients" | "booking" | "settings"
        setActiveSection(current)
    }, [section])

    return (
        <header id="navbar" className="flex h-20 px-20 w-full fixed top-0 left-0 z-100 bg-white justify-between items-center border-b-1 border-gray-300 ">
            <a className="h-[100%] flex items-center justify-center" href="/"><img className="h-[50%]" src={Logo} alt="Slotify" /></a>

            <div className="flex">
                <button onClick={() => { navigate("/admin/calendar"); window.scrollTo(0, 0) }} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <CalendarDays className={activeSection === "calendar" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                    <span className={activeSection === "calendar" ? "text-blue-500" : ""}>Calendar</span>
                </button>
                <button onClick={()=>{navigate("/admin/client"); window.scrollTo(0, 0) }} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <User className={activeSection === "clients" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                    <span className={activeSection === "clients" ? "text-blue-500" : ""}>Clients</span>
                </button>
                <button onClick={() => { navigate("/admin/booking/get-booking"); window.scrollTo(0, 0) }} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <Link className={activeSection === "booking" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                    <span className={activeSection === "booking" ? "text-blue-500" : ""}>Online booking</span>
                </button>
                <button onClick={() => { navigate("/admin/settings/services"); window.scrollTo(0, 0) }} className="text-lg mx-4 font-medium cursor-pointer hover:text-blue-400 duration-200 flex items-center justify-center">
                    <Settings className={activeSection === "settings" ? "text-blue-500 mr-4 h-[1.5em]" : "mr-4 h-[1.5em]"} />
                    <span className={activeSection === "settings" ? "text-blue-500" : ""}>Settings</span>
                </button>
            </div>

            <div className="bg-gray-300 rounded-full h-12 w-12 aspect-square flex items-center justify-center cursor-pointer relative" onClick={() => showDropBar ? setShowDropBar(false) : setShowDropBar(true)}>
                <p>US</p>
                {showDropBar ?
                    <ul className="absolute top-[3rem]  bg-white border-1 border-gray-300">
                        <li className="px-6 py-2 whitespace-nowrap" onClick={()=> alert("This section isn't implemented yet!")}>User profile</li>
                        <li className="px-6 py-2 whitespace-nowrap border-t-1 border-gray-300" onClick={()=>alert("This section isn't implemented yet!")}>Support</li>
                        <li className="px-6 py-2 whitespace-nowrap border-t-1 border-gray-300" onClick={logOut}>Log out</li>
                    </ul>

                    : null
                }
            </div>



        </header>
    )
}