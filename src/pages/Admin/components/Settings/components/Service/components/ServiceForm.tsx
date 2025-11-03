import { Camera, Image } from "lucide-react";
import { useRef, useState } from "react";

interface createService {
    name: string,
    description?: string,
    durationHours: number,
    durationMinutes: number,
    price: number,
    img: string | null
}

export const ServiceForm = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [serviceCreateData, setServiceCreateData] = useState<createService>(
        {
            name: "",
            description: "",
            durationHours: 0,
            durationMinutes: 15,
            price: 0,
            img: null
        }
    )

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


        const payload = {
            name: serviceCreateData.name,
            description: serviceCreateData.description,
            price: serviceCreateData.price,
            img: serviceCreateData.img,
            duration: serviceCreateData.durationHours * 3600 + serviceCreateData.durationMinutes * 60,
        }
        console.log(payload)
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
                            onChange={(e) => setServiceCreateData({ ...serviceCreateData, durationHours: parseInt(e.target.value) })}
                            value={serviceCreateData.durationHours}
                        />
                        <p className="text-center">hrs</p>
                    </div>
                    <div className="ml-4 border border-gray-300 flex w-1/2 py-2 text-center rounded-md justify-center">
                        <input
                            required
                            type="number"
                            min={0}
                            className="w-2/3 px-2 outline-none"
                            onChange={(e) => setServiceCreateData({ ...serviceCreateData, durationMinutes: parseInt(e.target.value) })}
                            value={serviceCreateData.durationMinutes}
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
                    <p className="w-1/4 font-bold">PLN</p>
                </div>
                <button type="submit" className="mt-12 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200">SAVE</button>
                <button type="button" className="mt-12 ml-12 bg-red-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-red-600 duration-200">DISCARD</button>
            </form>
        </div>
    )
}