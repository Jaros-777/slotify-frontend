import { Outlet } from "react-router-dom"
import { BookingSideBar } from "./pages/Admin/components/Booking/BookingSideBar"
import { FooterAdmin } from "./components/Footer/FooterAdmin"

export const BookingLayout = () => {

    return (
        <div className="flex w-full min-h-screen">
            <BookingSideBar />
            <div className="bg-gray-200 w-full flex flex-col justify-between">
                <Outlet />
                <FooterAdmin/>
            </div>
        </div>

    )
}