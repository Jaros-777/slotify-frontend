import {Clock2,HandPlatter,TreePalm  } from "lucide-react";
import { useNavigate } from "react-router-dom";


export const SettingsSideBar = () => {
    const section = window.location.href.split("/")[5]

    const navigate = useNavigate()

    return (
        <section className="flex min-h-screen w-84  border-r-1 border-gray-300">
            <div className="flex flex-col p-4 ml-4 pt-40 w-64 h-100  fixed top-0">
                <button 
                className={`flex cursor-pointer py-2 group ${section === "availability" ? "text-blue-500" : "null"}`} 
                onClick={()=>{navigate("/admin/settings/availability");window.scrollTo(0,0)}}>
                    <Clock2 className="group-hover:text-blue-600"></Clock2>
                    <p className="ml-4 group-hover:text-blue-600">Availability</p>
                </button>
                <button 
                className={`flex cursor-pointer py-2 group ${section === "services" ? "text-blue-500" : "null"}`}  
                onClick={()=>{navigate("/admin/settings/services");window.scrollTo(0,0)}}>
                    <HandPlatter className="group-hover:text-blue-600"></HandPlatter>
                    <p className="ml-4 group-hover:text-blue-600">Services</p>
                </button>
                <button 
                className={`flex cursor-pointer py-2 group ${section === "vacations" ? "text-blue-500" : "null"}`}  
                onClick={()=>{navigate("/admin/settings/vacations");window.scrollTo(0,0)}}>
                    <TreePalm className="group-hover:text-blue-600"></TreePalm>
                    <p className="ml-4 group-hover:text-blue-600">Vactions</p>
                </button>
            </div>
        </section>
    )
}