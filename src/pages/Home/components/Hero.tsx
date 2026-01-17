import BackgroundBellRing from "../assets/background-bell-ring.webp"
import { useNavigate } from "react-router-dom"
import {Check} from "lucide-react"

export const Hero =()=>{
    const navigate = useNavigate()

    return(
        <section className="flex flex-col items-center pt-38 " id="hero">
            <h1 className="text-7xl font-medium">All-in-one booking</h1>
            <h1 className="text-7xl mt-4 font-medium">for growing businesses</h1>
            <button onClick={()=>navigate("/register/business")} className="mt-20 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium cursor-pointer hover:bg-blue-600 duration-200">Create free account</button>
            <div className="flex my-12">
                <div className="flex items-center mx-4">
                    <Check className="mr-2 h-5"/>
                    <p>Free plan, no time limits</p>
                </div>
                <div className="flex items-center mx-4">
                    <Check className="mr-2 h-5"/>
                    <p>Accessible on any desktop browser</p>
                </div>
            </div>
            <img src={BackgroundBellRing} className="w-3/5 h-150 object-cover rounded-2xl mt-10"/>
        </section>
    )
}