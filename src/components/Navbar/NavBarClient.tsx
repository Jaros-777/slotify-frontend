import { CircleUserRound, X, BookCheck, LogOut, LogIn } from "lucide-react"
import { useEffect, useState } from "react"
import type { ClientType } from "../../pages/Clients/components/ClientPanel/types/clientType"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Logo from "../../assets/Slotify Logo.webp"
import { useData } from "../../AppRouter"

interface navBarTypeProps {
    type: "reservation" | "panel"
}

export const NavBarClient = ({ type }: navBarTypeProps) => {
    const bussinessName = window.location.href.split("/")[3]
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    const [clientIsLogged, setClientIsLogged] = useState<boolean>(false)
    const {clientDetails, setClientDetails} = useData()
    // const [clientDetails, setClientDetails] = useState<Partial<ClientType>>({})
    const navigate = useNavigate()

    useEffect(() => {
        if (showSideBar && clientIsLogged) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [showSideBar])

    const fetchData = async () => {
        setClientIsLogged(false)
        const token = localStorage.getItem("clientToken")

        if (!token)
            return false

        await axios.get(`${import.meta.env.VITE_APP_URL}/client`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(response => {
            setClientDetails(response.data)
            setClientIsLogged(true)
        }).catch(error => {
            console.log(error)
        });


    }

    const Logout = () => {
        localStorage.clear()
        setClientIsLogged(false)
        window.location.reload()
    }

    useEffect(() => {
        (async () => {
            await fetchData()
        })();

    }, [])



    return (
        <nav className="border-b border-gray-300 flex justify-between items-center px-40 py-6 z-50">
            {type === "reservation" ?
                <p className="font-bold ">{bussinessName}</p>
                :
                <img src={Logo} alt="Slotify logo" className="h-8" />

            }
            <div className="flex cursor-pointer items-center" onClick={() => setShowSideBar(true)}>
                <CircleUserRound className="text-gray-400 bg-gray-200 rounded-md p-1 h-8 w-8 cursor-pointer" />
                {clientIsLogged && clientDetails ?
                    <p className="ml-2 cursor-pointer font-medium">{clientDetails.name}</p>
                    :
                    <button className="ml-2 cursor-pointer font-medium" onClick={() => { localStorage.setItem("previousURL", window.location.href.split("/")[3]); navigate("/login") }}>Log in</button>
                }
            </div>

            {clientIsLogged && clientDetails ?
                <div className={`fixed inset-0 bg-gray-300/70 h-full w-full z-50 top-0 left-0 flex duration-300 ${showSideBar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div className={`bg-white w-80 ml-auto p-4 flex flex-col justify-between duration-300 ${showSideBar ? "translate-x-0" : "translate-x-full"}`}>
                        <div>
                            <div className="flex justify-between border-b border-gray-300 pb-4 items-center">
                                <h1 className="font-medium text-2xl">Profile</h1>
                                <X className="cursor-pointer" onClick={() => setShowSideBar(false)}></X>
                            </div>
                            <div className="flex items-center py-4">
                                <CircleUserRound className="text-gray-400 bg-gray-200 rounded-md p-1 h-12 w-12 cursor-pointer" />
                                <div className="ml-4">
                                    <p className="font-medium">{clientDetails.name}</p>
                                    <p className="text-sm">{clientDetails.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-2 cursor-pointer duration-200 hover:bg-gray-300 p-2 rounded-l">
                                <CircleUserRound className="h-8 w-8 cursor-pointer" />
                                <p className="ml-4 font-medium cursor-pointer">Profile</p>
                            </div>
                            <div className="flex items-center mt-4 cursor-pointer duration-200 hover:bg-gray-300 p-2 rounded-l">
                                <BookCheck className="h-8 w-8 cursor-pointer" />
                                <p className="ml-4 font-medium">Bookings</p>
                            </div>
                        </div>
                        <button
                            className="border-t border-gray-300 flex py-4 px-2 text-red-500 cursor-pointer font-bold items-center duration-200 hover:bg-red-100"
                            onClick={Logout}
                        >
                            <LogOut className="mr-4 text-red-500"></LogOut>
                            Log out
                        </button>
                    </div>
                </div>
                :
                null
            }
        </nav>
    )
}