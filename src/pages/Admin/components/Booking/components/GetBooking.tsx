import { Download,Mail,Copy} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckIsLogged } from "../../utlis/checkIsLoged";

export const GetBooking = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged();
    const navigate = useNavigate()


    useEffect(() => {
        (async () => {
            await checkIsLogged();
        })();
    }, []);

    if (isAuthLoading) {
        return <p className="mt-20">Checking authentication...</p>;
    }

    return (
        <>
            <div className="flex flex-col items-center h-full w-full">
                <div className=" bg-white w-full p-6 ">
                    <div className="flex justify-between items-center w-full pb-2">
                        <h1 className="text-3xl font-bold">Get booking</h1>
                    </div>
                </div>
                <div className="bg-white m-6 rounded-2xl p-4 w-5/6">
                    <h2 className="font-bold text-xl">Your Booking Website</h2>
                    <h3 className="border-gray-300 border-b pt-2 pb-4">Your Booking Website is how your customers can see your business profile and book your services online.</h3>
                    <div className="flex mt-4">
                        <div className="border border-gray-300 rounded-2xl w-1/5 p-4">
                            <p>QR code</p>

                            <button className="hover:text-red-500"><Download></Download>DOWNLOAD QR CODE</button>
                        </div>
                        <div className="border border-gray-300 rounded-2xl w-4/5 p-4">
                                <p>Share via socials</p>
                                <div>
                                    <div>
                                        <Mail></Mail>
                                        <p>Email</p>
                                    </div>
                                </div>
                                <p>Copy link</p>
                                <div>
                                    <p>https://my-page.pl</p>
                                    <Copy></Copy>
                                </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}