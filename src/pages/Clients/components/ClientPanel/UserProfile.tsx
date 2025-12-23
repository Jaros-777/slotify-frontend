import { useEffect, useRef, useState } from "react";
import { useCheckIsLogged } from "../../../Admin/components/utlis/checkIsLoged";
import { ImageFileContainer } from "../../../Admin/components/Booking/components/BusinessProfile/components/ImageFileContainer";
import { Camera, Image, Loader, LockKeyhole } from "lucide-react";
import type { ClientType } from "./types/clientType";
import axios from "axios";
import { useData } from "../../../../AppRouter";

export const UserProfile = () => {

    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("client");
    const [clientData, setClientData] = useState<ClientType>()
    const fileInputRefServicePic = useRef<HTMLInputElement | null>(null)
    const [showPictureImageFileContainer, setShowPictureImageFileContainer] = useState<boolean>(false)
    const [clientPic, setClientPic] = useState<File | null>(null)
    const { clientToken } = useData();
    const [showSavingState, setShowSavingState] = useState<boolean>(false)

    const handleUpdateClientDetails = async () => {
        setShowSavingState(true)





        // if (clientPic != null) {
        //     const formData = new FormData()
        //     if (clientPic != null) {
        //         formData.append("clientPic", clientPic)
        //     }
        //     axios.post(`${import.meta.env.VITE_APP_URL}/service/picture`,
        //         formData,
        //         {
        //             headers: {
        //                 'Authorization': `Bearer ${clientToken}`
        //             }
        //         }
        //     )
        //         .then(response => {

        //         }).catch(function (error) {
        //             console.log(error);
        //         })


        // }
        setShowSavingState(false)
    }

    const handleAddServicePic = () => {
        fileInputRefServicePic.current?.click()
        window.scrollTo(0, 0)
    }

    useEffect(() => {

        (async () => {
            await checkIsLogged();
        })();
    }, [])

    if (isAuthLoading) {
        return <p className="mt-20">Checking authentication...</p>;
    }
    // if (!clientData) {
    //     return <p className="mt-20">Loading data...</p>;
    // }

    return (
        <div className="p-4">
            {showPictureImageFileContainer ?
                <ImageFileContainer file={clientPic} setShowImageFileContainer={setShowPictureImageFileContainer} setPic={setClientPic} aspectRatio={1} /> : null
            }
            <h1 className="text-2xl font-medium">User profile</h1>
            <div className="border border-gray-300 rounded-2xl p-4 mt-8">
                <p className="text-xl font-medium pb-4 border-b border-gray-300">Profile details</p>
                <div className=" p-4 mt-8 flex">
                    <div className="relative w-36 h-36 rounded-full border-2 border-blue-600 flex items-center justify-center">
                        {clientPic ?
                            <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={URL.createObjectURL(clientPic)} alt="Background picture" />
                            :
                            clientData?.pictureURL ?
                                <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={clientData.pictureURL} alt="Background picture" />
                                :
                                <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />

                        }

                        <Camera className="w-[50%] h-[50%] z-50 bg-white rounded-2xl p-1.5 absolute bottom-[-1rem] right-[-1rem] text-blue-600 border-2 border-gray-300 cursor-pointer"
                            onClick={handleAddServicePic}
                        />
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRefServicePic}
                            onChange={(e) => { setClientPic(e.target.files?.[0] ?? null); setShowPictureImageFileContainer(true); if (e.target) e.target.value = ""; }}
                            accept="image/*"
                        ></input>

                    </div>
                    <form onSubmit={handleUpdateClientDetails} className="ml-20">
                        <p>Full name</p>
                        <input
                            required
                            type="text"
                            className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                        />
                        <p>Phone number</p>
                        <input
                            required
                            type="tel"
                            minLength={9}
                            maxLength={9}
                            pattern="[0-9]+"
                            className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                        />
                        <p>Email</p>
                        <input
                            required
                            type="email"
                            className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                        />
                        <div>
                            <button
                                className="mt-12 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200"
                                type="submit"
                            >
                                {showSavingState ?
                                    <Loader className="animate-spin"></Loader>
                                    :
                                    <p>SAVE</p>
                                }
                            </button>
                            <button className="ml-12 border border-gray-300 px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-gray-300 duration-200">DISCARD CHANGES</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="border border-gray-300 rounded-2xl p-4 mt-8 flex justify-between">
                <div>
                    <p className="text-xl font-medium">Password</p>
                    <p className="mt-2">Set or change your account password.</p>
                </div>
                <button
                    className="ml-12 border border-gray-300 px-6 py-2 rounded-md text-md font-medium flex items-center cursor-pointer hover:bg-gray-300 duration-200">
                    <LockKeyhole className="mr-4 h-[1.5em]"></LockKeyhole>
                    <span> CHANGE PASSWORD</span>
                </button>
            </div>
        </div>
    )
}