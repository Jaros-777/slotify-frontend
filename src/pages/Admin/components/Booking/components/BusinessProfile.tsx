import { Camera, Image, Info, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCheckIsLogged } from "../../utlis/checkIsLoged";

export const BusinessProfile = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged();
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false)

    const handleAddImg = () => {
        fileInputRef.current?.click()
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            console.log("Selected file:", file.name)
        }
    }

    useEffect(() => {
            (async () => {
                await checkIsLogged();
            })();
        }, []);
    
        if (isAuthLoading) {
            return <p className="mt-20">Checking authentication...</p>;
        }

    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className=" bg-white p-6 flex items-center w-full">
                <div className="border-2 border-gray-300 w-24 h-24 rounded-4xl flex items-center justify-center relative">
                    <Image className="w-full h-[60%] text-gray-400" />

                    <Camera className="w-[50%] h-[50%] bg-white rounded-2xl p-1.5 absolute bottom-[-1rem] right-[-1rem] text-blue-600 border-2 border-gray-300 cursor-pointer"
                        onClick={handleAddImg}
                    />
                    <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                    ></input>
                </div>
                <p className="text-2xl font-bold ml-12">Business name</p>
            </div>
            <div className="bg-white m-6 rounded-2xl p-4 w-5/6">
                <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4">Details</p>
                <p className="font-medium mt-6">Businness profile</p>
                <input type="text" className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none" />
                <p className="font-bold mt-4">Slogan</p>
                <textarea className="resize-y border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"></textarea>
                <p className="font-bold mt-4">Description</p>
                <textarea className="resize-y border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"></textarea>
                <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4 mt-6">Contact</p>
                <div className="flex mt-4">
                    <div className="w-1/2 mx-2">
                        <p className="font-medium">Email</p>
                        <input
                            type="email"
                            className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                        />
                    </div>
                    <div className="w-1/2 mx-2">
                        <p className="font-medium">Phone</p>
                        <input
                            type="number"
                            min={9}
                            max={9}
                            className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                        />
                    </div>
                </div>
                <div className="border-gray-300 border-b pt-2 pb-4 mt-6 flex justify-between">
                    <p className="font-bold text-xl ">Address</p>
                    <button className="text-blue-600 font-bold text-sm cursor-pointer" onClick={()=>{setShowAddressForm(true);document.body.classList.add("overflow-hidden");}}>ADD NEW ADDRESS</button>
                </div>
                <p className="my-4">No address added. Click to add new address to fill in your business address.</p>
                {showAddressForm ?
                    <div  className="fixed bg-gray-300/75 z-50 h-full w-full top-0 right-0 flex items-center justify-center overflow-hidden">
                        <div className="bg-white w-4/5 h-3/5 opacity-100 p-4 rounded-md">
                            <div className="border-gray-300 border-b pt-2 pb-4 flex justify-between">
                                <p className="font-bold text-xl ">Address</p>
                                <X className="cursor-pointer" onClick={()=>{setShowAddressForm(false);document.body.classList.remove("overflow-hidden");}}></X>
                            </div>
                            <p className="mt-4 font-medium">Where's your business located?</p>
                            <div className="flex border border-gray-400 px-4 py-2 rounded-md mt-2">
                                <Search className="text-gray-400"></Search>
                                <input type="text" placeholder="Your address and street number" className="ml-4 w-full outline-none" />
                            </div>
                        </div>
                    </div>
                    : null
                }

                <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4">Channels</p>
                <div className="mt-6 flex items-center">
                    <p className="font-medium">Webiste URL</p>
                    <div className="group relative">
                        <Info className="ml-2 cursor-pointer"></Info>
                        <p
                            className="p-4 w-60 text-center absolute bg-slate-900 text-white bottom-9 rounded-md right-[-350%] z-10 hidden duration-200
                            group-hover:block">

                            Link your facebook page directly on your booking page
                        </p>
                        <div className="bg-slate-900 absolute w-4 h-4 bottom-8 right-1 rotate-45 hidden
                            group-hover:block">

                        </div>
                    </div>
                </div>
                <input
                    type="text"
                    className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                />
                <div className="mt-4 flex items-center">
                    <p className="font-medium">Facebook page URL</p>
                    <div className="group relative">
                        <Info className="ml-2 cursor-pointer"></Info>
                        <p
                            className="p-4 w-60 text-center absolute bg-slate-900 text-white bottom-9 rounded-md right-[-350%] z-10 hidden duration-200
                            group-hover:block">

                            Link your business webpage directly on your booking page
                        </p>
                        <div className="bg-slate-900 absolute w-4 h-4 bottom-8 right-1 rotate-45 hidden
                            group-hover:block">

                        </div>

                    </div>
                </div>
                <input
                    type="text"
                    className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                />


            </div>

        </div>
    )
}