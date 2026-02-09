import { useLocation, useNavigate } from "react-router-dom"
import Logo from "../../assets/Slotify Logo.webp"
import { TextAlignJustify, MoveRight, X } from "lucide-react"
import { useState } from "react";


export const NavbarHome = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [showDropBar, setShowDropBar] = useState<boolean>(false)
    const links = [
        { href: "#features", label: "Features" },
        { href: "#why", label: "Why Slotify?" },
        { href: "#pricing", label: "Pricing" },
        { href: "#home-footer", label: "Contact" },
    ];

    return (
        <header id="navbar" className="flex h-20 lg:px-20 w-full fixed top-0 left-0 bg-white justify-around items-center shadow-xl z-20">
            <a className="h-full min-w-40 flex items-center justify-center" href="/"><img className="h-[50%]" src={Logo} alt="Slotify" /></a>

            {location.pathname != "/register/business" && location.pathname != "/register/personal" && location.pathname != "/login" ?
                <>
                    <div className="hidden lg:flex justify-between w-2/5">
                        {links.map((_, index) => (

                            <a href={links[index].href} className=" text-lg font-medium cursor-pointer hover:text-blue-400 duration-200">{links[index].label}</a>

                        ))}
                    </div>
                    <div className="hidden lg:flex">
                        <button onClick={() => { navigate("/login"); window.scrollTo(0, 0) }} className="mr-8 text-lg font-medium cursor-pointer hover:text-blue-400 duration-200">LOG IN</button>
                        <button onClick={() => { navigate("/register/business") }} className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600 duration-200"> SING UP</button>
                    </div>
                    <div className="block lg:hidden">
                        {showDropBar ?
                            <>
                                <X className="cursor-pointer " onClick={() => setShowDropBar(false)} />
                                <div className="fixed top-20 left-0 bg-white border-y-1 border-gray-300 w-full h-full flex flex-col py-4 px-8">

                                    {links.map((_, index) => (

                                        <a key={index} href={links[index].href} className="mt-4 text-lg font-medium cursor-pointer hover:text-blue-400 duration-200 flex justify-between"
                                        >{links[index].label}<MoveRight /></a>

                                    ))}
                                    <button
                                        onClick={() => { navigate("/login"); window.scrollTo(0, 0) }}
                                        className="mt-8 text-blue-500 px-6 py-2 border border-blue-500 rounded-md text-md font-medium cursor-pointer hover:text-blue-600 duration-200">LOG IN</button>
                                    <button
                                        onClick={() => { navigate("/register/business") }}
                                        className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200"> SING UP</button>

                                </div>
                            </>
                            :

                            <TextAlignJustify className="cursor-pointer " onClick={() => setShowDropBar(true)} />
                        }
                        {/* {showDropBar ?
                            <div className="fixed top-20 left-0 bg-white border-y-1 border-gray-300 w-full h-full flex flex-col py-4 px-8">

                                {links.map((_, index) => (

                                    <a href={links[index].href} className="mt-4 text-lg font-medium cursor-pointer hover:text-blue-400 duration-200 flex justify-between"
                                    >{links[index].label}<MoveRight /></a>

                                ))}
                                <button
                                    onClick={() => { navigate("/login"); window.scrollTo(0, 0) }}
                                    className="mt-8 text-blue-500 px-6 py-2 border border-blue-500 rounded-md text-md font-medium cursor-pointer hover:text-blue-600 duration-200">LOG IN</button>
                                <button
                                    onClick={() => { navigate("/register/business") }}
                                    className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200"> SING UP</button>

                            </div>
                            : null
                        } */}
                    </div>
                </>

                :
                null
            }


        </header>
    )
}