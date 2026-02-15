import { Camera, Info, Image, Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCheckIsLogged } from "../../../utlis/checkIsLoged";
import type { BusinessProfileType } from "./types/BusinessProfileType";
import axios from "axios";
import { useData } from "../../../../../../AppRouter";
import { ImageFileContainer } from "./components/ImageFileContainer";
import { LoadingPage } from "../../../../../../LoadingPage";
import { AddressForm } from "./components/AddressForm";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { mapPointIcon } from "./utils/MapPointIcon";


interface MapUpdaterProps {
    lat: number;
    lng: number;
}

export const BusinessProfile = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");
    const fileInputRefProfilePic = useRef<HTMLInputElement | null>(null)
    const fileInputRefBackgroundPic = useRef<HTMLInputElement | null>(null)

    const [showAddressForm, setShowAddressForm] = useState<boolean>(false)
    const [currentBusinessProfile, setCurrentBusinessProfile] = useState<BusinessProfileType>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { userToken } = useData();
    const [profilePic, setProfilePic] = useState<File | null>(null)
    const [showProfileImageFileContainer, setShowProfileImageFileContainer] = useState<boolean>(false)
    const [backgroundPic, setBackgroundPic] = useState<File | null>(null)
    const [showBackgroundImageFileContainer, setShowBackgroundmageFileContainer] = useState<boolean>(false)
    const [showSavingState, setShowSavingState] = useState<boolean>(false)


    const handleFetchBusinessProfileData = async (token: string | boolean) => {
        setIsLoading(true)
        await axios.get(`${import.meta.env.VITE_APP_URL}/business-profile`,
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
        window.scrollTo(0, 0)
    }
    const handleAddBackgroundPic = () => {
        fileInputRefBackgroundPic.current?.click()
    }

    const handleUpdateBusinessProfile = async () => {
        setShowSavingState(true)

        try {



            axios.put(`${import.meta.env.VITE_APP_URL}/business-profile`,
                currentBusinessProfile,
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                }
            )
                .then(response => {

                }).catch(function (error) {
                    console.log(error);
                })

            if (profilePic != null || backgroundPic != null) {
                const formData = new FormData()
                if (profilePic != null) {
                    formData.append("profilePic", profilePic)
                }

                if (backgroundPic != null) {
                    formData.append("backgroundPic", backgroundPic)
                }

                axios.post(`${import.meta.env.VITE_APP_URL}/business-profile/pictures`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${userToken}`
                        }
                    }
                )
                    .then(response => {

                    }).catch(function (error) {
                        console.log(error);
                    })
            }

        } catch (error) {
            console.log(error);
        } finally {
            setShowSavingState(false)
            window.scrollTo(0, 0)
            if(userToken)
                handleFetchBusinessProfileData(userToken);
        }



        // window.location.reload()
    }

    const MapUpdater = ({ lat, lng }: MapUpdaterProps) => {
        const map = useMap();

        useEffect(() => {
            map.setView([lat, lng]);
        }, [lat, lng, map]);

        return null;
    };


    useEffect(() => {
        if (showAddressForm) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [showAddressForm])

    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            await handleFetchBusinessProfileData(token)
        })();
    }, []);

    if (isAuthLoading) {
        return <LoadingPage text="Checking authentication..." ></LoadingPage>;
    }
    if (isLoading || !currentBusinessProfile) {
        return <LoadingPage text="Loading data..." ></LoadingPage>;
    }

    return (
        <div className="flex flex-col items-center w-full">
            {showProfileImageFileContainer ?
                <ImageFileContainer file={profilePic} setShowImageFileContainer={setShowProfileImageFileContainer} setPic={setProfilePic} aspectRatio={1} /> : null
            }
            {showBackgroundImageFileContainer ?
                <ImageFileContainer file={backgroundPic} setShowImageFileContainer={setShowBackgroundmageFileContainer} setPic={setBackgroundPic} aspectRatio={4} /> : null
            }

            <div className="h-70 relative w-full flex justify-center items-center bg-white">
                {backgroundPic ?
                    <img className="h-full w-full object-contain overflow-hidden" src={URL.createObjectURL(backgroundPic)} alt="Background picture" />
                    :
                    currentBusinessProfile.backgroundPictureURL ?
                        <img className="h-full w-full object-contain overflow-hidden" src={currentBusinessProfile.backgroundPictureURL} alt="Background picture" />
                        :
                        <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />

                }

                <Camera className="w-14 h-auto p-2 aspect-square z-50 bg-white rounded-2xl absolute top-0 right-0 text-blue-600 border-2 border-gray-300 cursor-pointer"
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
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center">
                    {profilePic ?
                        <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={URL.createObjectURL(profilePic)} alt="Background picture" />
                        :
                        currentBusinessProfile.profilePictureURL ?
                            <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={currentBusinessProfile.profilePictureURL} alt="Background picture" />
                            :
                            <Image className="h-4/6 w-4/6 aspect-square text-gray-400" />

                    }

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
            } className=" m-6 rounded-2xl w-5/6">
                <div className="bg-white rounded-md p-4">
                    <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4">Details</p>
                    <p className="font-medium mt-6">Businness profile</p>
                    <input
                        required
                        type="text"
                        pattern="^\S*$"
                        title="You cannot use white spaces"
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
                </div>
                <div className="bg-white rounded-md p-4 mt-4">
                    <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4">Contact</p>
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
                </div>
                <div className="bg-white rounded-md p-4 mt-4">
                    <div className="border-gray-300 border-b pt-2 pb-4 flex justify-between">
                        <p className="font-bold text-xl ">Address</p>
                        <button type="button" className="text-blue-500 font-bold mr-6 cursor-pointer" onClick={(e) => setShowAddressForm(true)}>EDIT</button>
                    </div>
                    {currentBusinessProfile.address.lat && currentBusinessProfile.address.lng ?
                        <div className="mt-6 px-4 flex items-center justify-between">
                            <div className="flex flex-col leading-8 w-1/2">
                                {currentBusinessProfile.address.street ?
                                    <div className="flex">
                                        <p className="text-gray-500 font-bold w-1/4">Street</p>
                                        <p className="ml-6">{currentBusinessProfile.address.street} {currentBusinessProfile.address.houseNumber}</p>
                                    </div>
                                    : null
                                }
                                <div className="flex">
                                    <p className="text-gray-500 font-bold w-1/4">City</p>
                                    <p className="ml-6">{currentBusinessProfile.address.city}</p>
                                </div>
                                <div className="flex">
                                    <p className="text-gray-500 font-bold w-1/4">Country</p>
                                    <p className="ml-6">Poland</p>
                                </div>
                                {currentBusinessProfile.address.note ?
                                    <div className="flex">
                                        <p className="text-gray-500 font-bold w-1/4">Note</p>
                                        <p className="ml-6">{currentBusinessProfile.address.note}</p>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className="mt-4 w-1/2 h-60">
                                <MapContainer
                                    center={[currentBusinessProfile.address.lat, currentBusinessProfile.address.lng]}
                                    zoom={13}
                                    style={{ height: "100%", width: "100%", zIndex: "1" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&copy; OpenStreetMap contributors"
                                    />
                                    <MapUpdater lat={currentBusinessProfile.address.lat} lng={currentBusinessProfile.address.lng} />

                                    <Marker position={[currentBusinessProfile.address.lat, currentBusinessProfile.address.lng]} icon={mapPointIcon}>
                                        <Popup>
                                            {currentBusinessProfile.address.street} {currentBusinessProfile.address.houseNumber ? `${currentBusinessProfile.address.houseNumber}, ` : ""}
                                            {currentBusinessProfile.address.city} {currentBusinessProfile.address.postalCode}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                        : <p className="mt-2">You don't have an address set</p>
                    }
                </div>
                {showAddressForm ?
                    <AddressForm
                        setShowAddressForm={setShowAddressForm}
                        address={currentBusinessProfile.address}
                        setCurrentBusinessProfile={setCurrentBusinessProfile}
                    />

                    : null
                }
                <div className="bg-white rounded-md p-4 mt-4">
                    <p className="font-bold text-xl border-gray-300 border-b pt-2 pb-4">Channels</p>
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
                </div>
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



            </form>

        </div>
    )
}