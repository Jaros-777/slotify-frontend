import axios from "axios";
import { Camera, Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useData } from "../../../../../../../AppRouter";
import type { ServiceType } from "../../../../Calendar/components/types/ServiceType";
import { useNavigate, useParams } from "react-router-dom";

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

    const id = useParams<{id: string}>();

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const { userToken, serviceData } = useData();
    const [selecetedDuration, setSelectedDuration] = useState<durationState>({ durationHours: 0, durationMinutes: 15 })
    const [serviceCreateData, setServiceCreateData] = useState<Partial<ServiceType>>(
        {
            name: "",
            price: 0,
            duration: 0,
            description: ""
        }
    )
    const navigate = useNavigate();

    const handleAddImg = () => {
        fileInputRef.current?.click()
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            console.log("Selected file:", file.name)
        }
    }

    const handlePostNewService = () => {


        let payload:payload = {
            name: serviceCreateData.name,
            description: serviceCreateData.description,
            price: serviceCreateData.price,
            duration: selecetedDuration.durationHours * 3600 + selecetedDuration.durationMinutes * 60,
        }
        

        if (id) {
            //  payload.id = id
            axios.put("http://localhost:8080/service",
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

        navigate("/admin/settings/services")


    }

    const handleDeleteService=()=>{
        axios.delete(`http://localhost:8080/service/delete/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                }
            ).then(() => {
                navigate("/admin/settings/services")
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (id && serviceData) {
            const currentService = serviceData.filter(service => service.id == id)[0]
            setServiceCreateData(currentService);
            selecetedDuration.durationHours = Math.floor(currentService.duration / 3600)
            selecetedDuration.durationMinutes = Math.floor((currentService.duration % 3600) / 60)
        }
    }, [])

    if(!serviceData){
        return <p>Loading data...</p>
    }

    return (
        <div className="bg-gray-200 pb-20 flex flex-col items-center">
            <div className="bg-white p-6 flex items-center w-full">
                <div className="border-2 border-blue-600 w-24 h-24 rounded-4xl flex items-center justify-center relative">
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
                <h1 className="text-2xl font-bold ml-12">Add new service</h1>
                <button type="button" onClick={() => handleDeleteService()} className="ml-auto bg-red-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-red-600 duration-200">DISCARD</button>

            </div>
            <form className="bg-white m-6 rounded-2xl p-4 w-5/6" onSubmit={(e) => {
                e.preventDefault()
                handlePostNewService();
            }}>
                <h3 className="text-xl font-bold border-b border-gray-300 pb-4">Details</h3>
                <p className="font-bold mt-6">Name</p>
                <input
                    required
                    type="text"
                    placeholder="Service name"
                    className="border border-gray-300 w-full py-2 px-4 rounded-md mt-2 focus:outline-1 outline-blue-600"
                    onChange={(e) => setServiceCreateData({ ...serviceCreateData, name: e.target.value })}
                    value={serviceCreateData.name}
                />
                <p className="font-bold mt-6">Description</p>
                <textarea
                    className="resize-none border border-gray-300 w-full h-24 py-2 px-4 rounded-md mt-2 focus:outline-1 outline-blue-600"
                    placeholder="Description"
                    onChange={(e) => setServiceCreateData({ ...serviceCreateData, description: e.target.value })}
                    value={serviceCreateData.description}
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
                        onChange={(e) => setServiceCreateData({ ...serviceCreateData, price: parseInt(e.target.value) })}
                        value={serviceCreateData.price}
                    />
                    <p className="w-1/4 font-bold">USD</p>
                </div>
                <button type="submit" className="mt-12 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200">SAVE</button>
                <button type="button" onClick={() => navigate("/admin/settings/services")} className="mt-12 ml-12 bg-red-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-red-600 duration-200">DISCARD</button>
            </form>
        </div>
    )
}