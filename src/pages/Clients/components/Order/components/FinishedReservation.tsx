import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface reservationProps{
    mail: string | undefined
    businessName: string | undefined
}

export const FinishedReservation = ({mail, businessName}:reservationProps) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center">
            <div className="bg-green-200 aspect-square h-20 rounded-full flex items-center justify-center">

                <Check className="text-green-600 font-bold h-1/2 w-full"></Check>
            </div>
            <h1 className="font-bold text-2xl mt-4">Great, you're booked!</h1>
            <div className="flex flex-col items-center border border-gray-300 rounded-md mt-6 p-10 w-5/6">
                <p className="text-center">We’ve sent a booking summary to your email.</p>
                <p className="text-center font-medium my-1">{mail}</p>
                <p className="text-center">If you don’t receive the email, please check your junk folder.</p>
                <div className="flex mt-10 justify-around w-full">
                    <button className="border border-blue-500 rounded-md px-4 py-2 font-medium text-md text-blue-500 w-full mr-2 cursor-pointer duration-200 hover:border-blue-900 hover:text-blue-900">ADD TO CALENDAR</button>
                    <button className="border border-blue-500 rounded-md px-4 py-2 font-medium text-blue-500 w-full ml-2 cursor-pointer duration-200 hover:border-blue-900 hover:text-blue-900">CHANGE BOOKING</button>
                </div>
                <button onClick={()=>navigate(`/${businessName}`)} className="bg-blue-500 rounded-md px-4 py-2 font-medium text-white w-full mt-4 duration-200 hover:bg-blue-600 cursor-pointer">BACK TO BOOKING WEBSITE</button>
            </div>
        </div>

    )
}