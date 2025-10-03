import { useNavigate } from "react-router-dom"
import Logo from "../../assets/Slotify Logo.webp"

export const Navbar = () => {

    const navigate = useNavigate();

    return (
        <header id="navbar" className="flex h-20 px-20 w-full  fixed top-0 left-0 bg-white justify-between items-center shadow-xl text-text-gray">
            <a className="h-[100%] flex items-center justify-center" href="/"><img className="h-[50%]" src={Logo} alt="Slotify" /></a>

            <div>
                <a href="#features" className="px-8 text-lg font-medium cursor-pointer hover:text-blue-400 duration-200">Features</a>
                <a href="#" className="px-8 text-lg font-medium cursor-pointer hover:text-blue-400 duration-200">Why Slotify?</a>
                <a href="#" className="px-8 text-lg font-medium cursor-pointer hover:text-blue-400 duration-200">Pricing</a>
                <a href="#" className="px-8 text-lg font-medium cursor-pointer hover:text-blue-400 duration-200">Contact</a>
            </div>
            <div>
                <button onClick={() => navigate("/login")} className="mr-8 text-lg font-medium cursor-pointer hover:text-blue-400 duration-200">LOG IN</button>
                <button onClick={() => navigate("/register")} className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600 duration-200"> SING UP</button>
            </div>
        </header>
    )
}