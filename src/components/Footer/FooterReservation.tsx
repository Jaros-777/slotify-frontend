import { useNavigate } from "react-router-dom"
import Logo from "../../assets/Slotify Logo.webp"

export const FooterReservation = () => {
    const navigate = useNavigate();

    return (
        <footer className="mt-8 border-t border-gray-300 flex flex-col items-center w-full">
            <div className="h-1/2 w-full max-w-[80rem] flex flex-col sm:flex-row  justify-between py-6 px-8 ">
                <div className="h-full flex items-center justify-center">
                    <p>Powered by</p>
                    <img className="w-26 ml-2" src={Logo} alt="Slotify Logo" />
                </div>
                <p className="text-center mt-4 sm:mt-0">© 2025 Jaros. Made with ❤️</p>
            </div>
            <div className="bg-blue-500 p-4 w-full">
                <p className="text-center text-white">Got your own business? <span className="underline font-bold cursor-pointer" onClick={() => {navigate("/register/business"); window.scrollTo(0,0)}}>Try Slotify</span> and create your own Booking Website</p>
            </div>
        </footer>
    )
}