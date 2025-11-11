import { PencilRuler  } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BookingSideBar =()=>{
const navigate = useNavigate()
    return(
        <section className="flex max-h-full">
            <div className="flex flex-col p-4 ml-4 pt-20 w-64 border-r-1 border-gray-300">
                <button className="flex cursor-pointer py-2 group">
                    <PencilRuler className="group-hover:text-blue-600"></PencilRuler>
                    <p className="ml-4 group-hover:text-blue-600">Booking 1</p>
                </button>
                <button className="flex cursor-pointer py-2 group" onClick={()=>{navigate("/admin/booking/get-booking");window.scrollTo(0,0)}}>
                    <PencilRuler className="group-hover:text-blue-600"></PencilRuler>
                    <p className="ml-4 group-hover:text-blue-600">Get booking</p>
                </button>
                <button className="flex cursor-pointer py-2 group" onClick={()=>{navigate("/admin/booking/business-profile");window.scrollTo(0,0)}}>
                    <PencilRuler className="group-hover:text-blue-600"></PencilRuler>
                    <p className="ml-4 group-hover:text-blue-600">Bussiness profile</p>
                </button>
            </div>
        </section>
    )
}