import { Camera, Info, Search, X, Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCheckIsLogged } from "../../../utlis/checkIsLoged";
import type { BusinessProfileType } from "../../../types/BusinessProfileType";
import axios from "axios";
import { useData } from "../../../../../../AppRouter";
import { ImageFileContainer } from "./components/ImageFileContainer";

export const BusinessProfile = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged();
    const fileInputRefProfilePic = useRef<HTMLInputElement | null>(null)
    const fileInputRefBackgroundPic = useRef<HTMLInputElement | null>(null)

    const [showAddressForm, setShowAddressForm] = useState<boolean>(false)
    const [currentBusinessProfile, setCurrentBusinessProfile] = useState<Partial<BusinessProfileType>>({})
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { userToken } = useData();
    const [profilePic, setProfilePic] = useState<File | null>(null)
    const [showProfileImageFileContainer, setShowProfileImageFileContainer] = useState<boolean>(false)
    const [backgroundPic, setBackgroundPic] = useState<File | null>(null)
    const [showBackgroundImageFileContainer, setShowBackgroundmageFileContainer] = useState<boolean>(false)

    const handleFetchBusinessProfileData = async (token: string | boolean) => {
        setIsLoading(true)
        await axios.get("http://localhost:8080/business-profile",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(function (response) {
                setCurrentBusinessProfile(response.data)
                setIsLoading(false)

            }).catch(function (error) {
                console.log(error);
            })
    }


    const handleAddProfilePic = () => {
        fileInputRefProfilePic.current?.click()
    }
    const handleAddBackgroundPic = () => {
        fileInputRefBackgroundPic.current?.click()
    }

    const handleUpdateBusinessProfile = () => {
        console.log(currentBusinessProfile)
        axios.put("http://localhost:8080/business-profile",
            currentBusinessProfile,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        )
            .then(response => {
                window.scrollTo(0, 0)
                window.location.reload()

            }).catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            await handleFetchBusinessProfileData(token)
        })();
    }, []);

    if (isAuthLoading) {
        return <p className="mt-20">Checking authentication...</p>;
    }
    if (isLoading) {
        return <p className="mt-20">Loading data...</p>;
    }

    return (
        <div className="flex flex-col items-center w-full">
            {showProfileImageFileContainer ?
                <ImageFileContainer file={profilePic} setShowImageFileContainer={setShowProfileImageFileContainer} setPic={setProfilePic} aspectRatio={1}/> : null
            }
            {showBackgroundImageFileContainer ?
                <ImageFileContainer file={backgroundPic} setShowImageFileContainer={setShowBackgroundmageFileContainer} setPic={setBackgroundPic} aspectRatio={4} /> : null
            }

            <div className="h-70 relative w-full flex justify-center items-center">
                {backgroundPic ?
                    <img className="h-full w-full object-contain overflow-hidden" src={URL.createObjectURL(backgroundPic)} alt="Background picture" />
                    :
                    <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />
                }
                <Camera className="w-[5%] h-auto p-2 aspect-square z-50 bg-white rounded-2xl absolute top-0 right-0 text-blue-600 border-2 border-gray-300 cursor-pointer"
                    onClick={handleAddBackgroundPic}
                />
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRefBackgroundPic}
                    onChange={(e) => { setBackgroundPic(e.target.files?.[0] ?? null); setShowBackgroundmageFileContainer(true); if (e.target) e.target.value = ""; }}
                    accept="image/*"
                ></input>

            </div>
            <div className=" bg-white p-6 flex items-center w-full">
                <div className="relative w-24 h-24 rounded-full border-2 border-blue-600 flex items-center justify-center">

                    <div className="w-full h-full overflow-hidden rounded-full flex items-center justify-center">
                        {profilePic ?
                            <img className="h-full aspect-square object-fill overflow-hidden" src={URL.createObjectURL(profilePic)} alt="Profile picture" />
                            :
                            <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />
                        }
                    </div>

                    <Camera className="w-[50%] h-[50%] z-50 bg-white rounded-2xl p-1.5 absolute bottom-[-1rem] right-[-1rem] text-blue-600 border-2 border-gray-300 cursor-pointer"
                        onClick={handleAddProfilePic}
                    />
                    <input
                        type="file"
                        className="hidden"
                        ref={fileInputRefProfilePic}
                        onChange={(e) => { setProfilePic(e.target.files?.[0] ?? null); setShowProfileImageFileContainer(true); if (e.target) e.target.value = ""; }}
                        accept="image/*"
                    ></input>
                </div>
                <p className="text-2xl font-bold ml-12">{currentBusinessProfile.businessName}</p>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBusinessProfile()
            }
            } className="bg-white m-6 rounded-2xl p-4 w-5/6">
                <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4">Details</p>
                <p className="font-medium mt-6">Businness profile</p>
                <input
                    required
                    type="text"
                    className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                    value={currentBusinessProfile.businessName}
                    onChange={(e) => setCurrentBusinessProfile({ ...currentBusinessProfile, businessName: e.target.value })}
                />
                <p className="font-medium mt-4">Slogan</p>
                <textarea
                    className="resize-y border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                    value={currentBusinessProfile.slogan}
                    onChange={(e) => setCurrentBusinessProfile({ ...currentBusinessProfile, slogan: e.target.value })}
                ></textarea>
                <p className="font-medium mt-4">Description</p>
                <textarea
                    className="resize-y border border-gray-300 w-full h-30 rounded-md px-4 py-2 mt-2 outline-none"
                    value={currentBusinessProfile.description}
                    onChange={(e) => setCurrentBusinessProfile({ ...currentBusinessProfile, description: e.target.value })}
                ></textarea>
                <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4 mt-6">Contact</p>
                <div className="flex mt-4">
                    <div className="w-1/2 mx-2">
                        <p className="font-medium">Email</p>
                        <input
                            type="email"
                            className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                            value={currentBusinessProfile.email}
                            onChange={(e) => setCurrentBusinessProfile({ ...currentBusinessProfile, email: e.target.value })}
                        />
                    </div>
                    <div className="w-1/2 mx-2">
                        <p className="font-medium">Phone</p>
                        <input
                            type="tel"
                            minLength={9}
                            maxLength={9}
                            pattern="[0-9]+"
                            className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                            value={currentBusinessProfile.phone || undefined}
                            onChange={(e) => setCurrentBusinessProfile({ ...currentBusinessProfile, phone: Number(e.target.value) })}
                        />
                    </div>
                </div>
                {/* <div className="border-gray-300 border-b pt-2 pb-4 mt-6 flex justify-between">
                    <p className="font-bold text-xl ">Address</p>
                    <button type="button" className="text-blue-600 font-bold text-sm cursor-pointer" onClick={()=>{setShowAddressForm(true);document.body.classList.add("overflow-hidden");}}>ADD NEW ADDRESS</button>
                </div> */}
                {/* <p className="my-4">No address added. Click to add new address to fill in your business address.</p> */}
                {showAddressForm ?
                    <div className="fixed bg-gray-300/75 z-50 h-full w-full top-0 right-0 flex items-center justify-center overflow-hidden">
                        <div className="bg-white w-4/5 h-3/5 opacity-100 p-4 rounded-md">
                            <div className="border-gray-300 border-b pt-2 pb-4 flex justify-between">
                                <p className="font-bold text-xl ">Address</p>
                                <X className="cursor-pointer" onClick={() => { setShowAddressForm(false); document.body.classList.remove("overflow-hidden"); }}></X>
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

                <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4 mt-6">Channels</p>
                <div className="mt-6 flex items-center">
                    <p className="font-medium">Webiste URL</p>
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
                    type="url"
                    className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                    value={currentBusinessProfile.websiteURL}
                    onChange={(e) => setCurrentBusinessProfile({ ...currentBusinessProfile, websiteURL: e.target.value })}
                />
                <div className="mt-4 flex items-center">
                    <p className="font-medium">Facebook page URL</p>
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
                    type="url"
                    className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                    value={currentBusinessProfile.facebookURL}
                    onChange={(e) => setCurrentBusinessProfile({ ...currentBusinessProfile, facebookURL: e.target.value })}
                />
                <button type="submit" className="mt-12 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200">SAVE</button>



            </form>

        </div>
    )
}