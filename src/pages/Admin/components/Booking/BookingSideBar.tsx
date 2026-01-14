import {IdCard,UserPen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BookingSideBar = () => {
    const section = window.location.href.split("/")[5]

    const navigate = useNavigate()
    return (
        <section className="flex min-h-screen w-84  border-r-1 border-gray-300">
            <div className="flex flex-col p-4 ml-4 pt-40 w-64 h-100  fixed top-0">
                <button 
                className={`flex cursor-pointer py-2 group ${section === "get-booking" ? "text-blue-500" : "null"}`} 
                onClick={() => { navigate("/admin/booking/get-booking"); window.scrollTo(0, 0) }}>
                    <IdCard className="group-hover:text-blue-600"></IdCard>
                    <p className="ml-4 group-hover:text-blue-600">Get booking</p>
                </button>
                <button 
                className={`flex cursor-pointer py-2 group ${section === "business-profile" ? "text-blue-500" : "null"}`} 
                onClick={() => { navigate("/admin/booking/business-profile"); window.scrollTo(0, 0) }}>
                    <UserPen className="group-hover:text-blue-600"></UserPen>
                    <p className="ml-4 group-hover:text-blue-600">Business profile</p>
                </button>
            </div>
        </section>
    )
}