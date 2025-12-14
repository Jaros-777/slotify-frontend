import axios from "axios";
import { Camera, Image, Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useData } from "../../../../../../../AppRouter";
import type { ServiceType } from "../../../../types/ServiceType";
import { useNavigate, useParams } from "react-router-dom";
import { useCheckIsLogged } from "../../../../utlis/checkIsLoged";
import { useLoadServiceData } from "../../../../utlis/loadServiceData";
import { ImageFileContainer } from "../../../../Booking/components/BusinessProfile/components/ImageFileContainer";

interface durationState {
    durationHours: number,
    durationMinutes: number,
}

interface payload {
    id?: string;
    name: string | undefined;
    description?: string;
    price: number | undefined;
    duration: number;
}

export const ServiceForm = () => {

    const { id } = useParams<{ id: string }>();
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged();
    const { loadServiceData, isDataLoading } = useLoadServiceData();

    const fileInputRefServicePic = useRef<HTMLInputElement | null>(null)
    const { userToken, serviceData } = useData();
    const [selecetedDuration, setSelectedDuration] = useState<durationState>({ durationHours: 0, durationMinutes: 15 })
    const [currentService, setCurrentService] = useState<Partial<ServiceType>>(
        {
            name: "",
            price: 0,
            duration: 900,
            description: ""
        }
    )
    const navigate = useNavigate();
    const [showPictureImageFileContainer, setShowPictureImageFileContainer] = useState<boolean>(false)
    const [servicePic, setServicePic] = useState<File | null>(null)
    const [showSavingState, setShowSavingState] = useState<boolean>(false)



    // const handleAddImg = () => {
    //     fileInputRefServicePic.current?.click()
    // }
    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0]
    //     if (file) {
    //         console.log("Selected file:", file.name)
    //     }
    // }

    const handleAddServicePic = () => {
        fileInputRefServicePic.current?.click()
        window.scrollTo(0, 0)
    }

    const handleAddUpdateNewService = () => {
        setShowSavingState(true)

        let payload: payload = {
            name: currentService.name,
            description: currentService.description,
            price: currentService.price,
            duration: selecetedDuration.durationHours * 3600 + selecetedDuration.durationMinutes * 60,
        }


        if (id) {
            const payloadWithId = id ? { ...payload, id } : payload;
            axios.put("http://localhost:8080/service",
                payloadWithId,
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                }
            ).then(() => {
            }).catch((error) => {
                console.log(error)
            })

        } else {
            axios.post("http://localhost:8080/service",
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                }
            ).then(() => {

            }).catch((error) => {
                console.log(error)
            })
        }

        if (servicePic != null) {
            const formData = new FormData()
            if (servicePic != null && id != null) {
                formData.append("servicePic", servicePic)
                formData.append("id", id.toString())
            }
            axios.post("http://localhost:8080/service/picture",
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
        setShowSavingState(false)
        window.scrollTo(0, 0)
        navigate("/admin/settings/services")
    }

    const handleDeleteService = () => {
        axios.delete(`http://localhost:8080/service/delete/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(() => {
            window.scrollTo(0, 0)
            navigate("/admin/settings/services")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            if (token && id != undefined) {
                await loadServiceData(token);

            }
        })();

    }, []);

    useEffect(() => {
        if (serviceData.length > 0 && id != undefined) {
            const curService = serviceData.filter(service => service.id.toString() === id)[0];
            setCurrentService(curService)
            setSelectedDuration({
                durationHours: Math.floor(curService.duration / 3600),
                durationMinutes: Math.floor((curService.duration % 3600) / 60)
            })

        }

    }, [serviceData])

    if (isAuthLoading) {
        return <p className="mt-20">Checking authentication...</p>;
    }
    if (isDataLoading && id != undefined) {
        return <p className="mt-20">Loading data...</p>;
    }

    return (
        <div className="bg-gray-200 pb-20 flex flex-col items-center">
            {showPictureImageFileContainer ?
                <ImageFileContainer file={servicePic} setShowImageFileContainer={setShowPictureImageFileContainer} setPic={setServicePic} aspectRatio={1} /> : null
            }
            <div className="bg-white p-6 flex items-center w-full">
                <div className="relative w-24 h-24 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    {servicePic ?
                        <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={URL.createObjectURL(servicePic)} alt="Background picture" />
                        :
                        currentService.servicePictureURL ?
                            <img className="w-full h-full overflow-hidden rounded-full flex items-center justify-center" src={currentService.servicePictureURL} alt="Background picture" />
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
                        onChange={(e) => { setServicePic(e.target.files?.[0] ?? null); setShowPictureImageFileContainer(true); if (e.target) e.target.value = ""; }}
                        accept="image/*"
                    ></input>

                </div>
                <h1 className="text-2xl font-bold ml-12">{id ? currentService.name : "Add new service"}</h1>
                {id ?
                    <button type="button" onClick={() => handleDeleteService()} className="ml-auto bg-red-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-red-600 duration-200">DELETE</button>
                    : null
                }

            </div>
            <form className="bg-white m-6 rounded-2xl p-4 w-5/6" onSubmit={(e) => {
                e.preventDefault()
                handleAddUpdateNewService();
            }}>
                <h3 className="text-xl font-bold border-b border-gray-300 pb-4">Details</h3>
                <p className="font-bold mt-6">Name</p>
                {/* <p>{serviceData[id].name}</p> */}
                <input
                    required
                    type="text"
                    placeholder="Service name"
                    className="border border-gray-300 w-full py-2 px-4 rounded-md mt-2 focus:outline-1 outline-blue-600"
                    onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                    value={currentService.name}
                />
                <p className="font-bold mt-6">Description</p>
                <textarea
                    className="resize-none border border-gray-300 w-full h-24 py-2 px-4 rounded-md mt-2 focus:outline-1 outline-blue-600"
                    placeholder="Description"
                    onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                    value={currentService.description}
                />
                <p className="font-bold mt-6">Duration</p>
                <div className=" w-60 flex mt-2">
                    <div className="border border-gray-300 flex w-1/2 py-2 text-center rounded-md justify-center">
                        <input
                            required
                            type="number"
                            min={0}
                            className="w-2/3 px-2 outline-none"
                            onChange={(e) => setSelectedDuration({ ...selecetedDuration, durationHours: parseInt(e.target.value) })}
                            value={selecetedDuration.durationHours}
                        />
                        <p className="text-center">hrs</p>
                    </div>
                    <div className="ml-4 border border-gray-300 flex w-1/2 py-2 text-center rounded-md justify-center">
                        <input
                            required
                            type="number"
                            min={0}
                            className="w-2/3 px-2 outline-none"
                            onChange={(e) => setSelectedDuration({ ...selecetedDuration, durationMinutes: parseInt(e.target.value) })}
                            value={selecetedDuration.durationMinutes}
                        />
                        <p>min</p>
                    </div>
                </div>
                <p className="font-bold mt-6">Price</p>
                <div className="flex mt-2 items-center border border-gray-300 w-50 text-center">
                    <input
                        required
                        type="number"
                        min={0}
                        className="border-r border-gray-300 py-2 px-4 rounded-md outline-none w-3/4"
                        onChange={(e) => setCurrentService({ ...currentService, price: parseInt(e.target.value) })}
                        value={currentService.price}
                    />
                    <p className="w-1/4 font-bold">USD</p>
                </div>
                {/* <button type="submit" className="mt-12 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200">SAVE</button> */}
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
                <button type="button" onClick={() => navigate("/admin/settings/services")} className="mt-12 ml-12 bg-red-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-red-600 duration-200">DISCARD</button>
            </form>
        </div>
    )
}