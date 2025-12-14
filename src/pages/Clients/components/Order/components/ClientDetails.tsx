import { useState } from "react"
import type { OrderResponse } from "../../../types/OrderResponse"

interface detailsProps {
    onSuccess: () => void
    setReservationDetails: React.Dispatch<React.SetStateAction<OrderResponse | undefined>>
    reservationDetails: OrderResponse | undefined
}

export const ClientDetails = ({ onSuccess, setReservationDetails, reservationDetails }: detailsProps) => {

    const [showBookingNote, setShowBookingNote] = useState<boolean>(false)

    const handleCreateReservation = (e: React.FormEvent) => {
        e.preventDefault()
        onSuccess()
    }

    const handleUpdateReservation = (field: string, value: string | number | boolean) => {
        if (reservationDetails)
            setReservationDetails({
                ...reservationDetails,
                [field]: value
            })
    }


    return (
        <>
            <h1 className='pl-4 py-2 font-bold text-xl'>Select a time</h1>
            <div className='border border-gray-300 rounded-md ml-6 w-5/6'>
                <h2 className='pl-4 py-4 font-bold text-l'>Personal information</h2>
                <form className='border-t border-gray-300 flex flex-col p-4' id="client-details-form" onSubmit={(e) => handleCreateReservation(e)}>
                    <div className="flex justify-between w-full">
                        <div className="w-2/5">
                            <p>First name</p>
                            <input 
                            required 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-blue-500"
                            onChange={(e)=>handleUpdateReservation("firstName", e.target.value)}
                             />
                        </div>
                        <div className="w-2/5">
                            <p>Last name</p>
                            <input 
                            required 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-blue-500"
                            onChange={(e)=>handleUpdateReservation("lastName", e.target.value)}
                             />
                        </div>
                    </div>
                    <div>
                        <p>Email</p>
                        <input 
                        required 
                        type="email" 
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-blue-500"
                        onChange={(e)=>handleUpdateReservation("email", e.target.value)}
                         />
                    </div>
                    <div>
                        <p>Phone number</p>
                        <input 
                        required 
                        minLength={9}
                        maxLength={9}
                        type="tel"
                        pattern="[0-9]+"
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-blue-500"
                        onChange={(e)=>handleUpdateReservation("phone", e.target.value)}
                         />
                    </div>
                </form>
            </div>
            <div className='border border-gray-300 rounded-md ml-6 mt-4 w-5/6'>
                <div className="flex justify-between px-4 py-4">
                    <h2 className='font-bold text-l'>Booking note</h2>
                    {showBookingNote ?
                        <button className="font-bold text-gray-500 text-sm cursor-pointer" onClick={() => setShowBookingNote(false)}>REMOVE NOTE</button>
                        : <button className="font-bold text-blue-500 text-sm cursor-pointer" onClick={() => setShowBookingNote(true)}>ADD NOTE</button>
                    }

                </div>
                {showBookingNote ?
                    <div className='border-t border-gray-300 flex flex-col p-4'>
                        <textarea 
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-blue-500" placeholder="Add note..."
                        onChange={(e)=>handleUpdateReservation("description", e.target.value)}
                        ></textarea>
                    </div>
                    : null
                }
            </div>
            <div className='border border-gray-300 rounded-md ml-6 mt-4 w-5/6'>
                <h2 className='p-4 font-bold text-l'>Cancellation policy</h2>
                <div className='border-t border-gray-300 flex flex-col p-4'>
                    <div className="flex">
                        <p className="">Booking can not be cancelled.</p>
                    </div>
                </div>
            </div>
            <div className='border border-gray-300 rounded-md ml-6 mt-4 w-5/6'>
                <h2 className='p-4 font-bold text-l'>Agreements</h2>
                <div className='border-t border-gray-300 flex flex-col p-4'>
                    <div className="flex">
                        <input 
                        type="checkbox" 
                        className="bg-blue-500 cursor-pointer p-2 "
                        onChange={(e)=>handleUpdateReservation("agreements", e.target.checked)}
                         />
                        <p className="ml-4">I agree to receive promotions, marketing emails, discount and tips.</p>
                    </div>
                </div>
            </div>


        </>
    )
}