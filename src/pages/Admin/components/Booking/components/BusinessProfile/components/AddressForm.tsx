import { useState } from "react";
import { X, Info } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import axios from "axios";
import type { AddressType } from "../types/AddressType";
import { mapPointIcon } from "../utils/MapPointIcon";


interface AddressProps {
    setShowAddressForm: React.Dispatch<React.SetStateAction<boolean>>
    address: Partial<AddressType>
    setAddress: React.Dispatch<React.SetStateAction<AddressType>>
}

type AddressShortenType = {
    lat?: number | null,
    lng?: number | null,
    streetAndHouseNumber?: string;
    city?: string;
    postcode?: string;
    note?: string
};

export const AddressForm = ({ setShowAddressForm, address, setAddress }: AddressProps) => {

    const [mapPoint, setMapPoint] = useState<[number, number]>(address.lat && address.lng? [address.lat, address.lng]: [53.023338, 18.632345])
    const [chosenAddress, setChosenAddress] = useState<AddressType>(address)
    const [buforAddress, setBuforAddress] = useState<AddressShortenType>({
        ...address,
        streetAndHouseNumber: address.street + " " + address.houseNumber
    })
    const [editableAddress, setEditableAddress] = useState<boolean>(false)

    function MapSetPoint() {
        useMapEvents({
            click: async (e) => {
                fetchPointByLatAndLng(e.latlng.lat, e.latlng.lng)
            },
        });

        return null;
    }

    const fetchPointByLatAndLng = (lat:number,lng:number)=>{
        setMapPoint([lat, lng]);

                axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                )
                    .then(response => {
                        let newAddress: AddressType = {
                            lat: lat,
                            lng: lng,
                            houseNumber: response.data.address.house_number ?? "",
                            street: response.data.address.road ?? "",
                            city: response.data.address.city || response.data.address.town || response.data.address.village,
                            postcode: response.data.address.postcode
                        };
                        setChosenAddress(newAddress);
                        setBuforAddress({
                            ...newAddress,
                            streetAndHouseNumber: `${response.data.address.road ?? ""} ${response.data.address.house_number ?? ""}`
                        });
                    }

                    ).catch(error => {
                        console.log(error)
                    })
    }

    const handleSetStreetAndHouseNumber = ():AddressType => {

        if (!buforAddress.streetAndHouseNumber) return{
            ...buforAddress,
            city: buforAddress.city,
            street:"",
            houseNumber:""
        };

        const parts = buforAddress.streetAndHouseNumber.trim().split(" ");
        let houseNumber = ""
        let street = ""

        if (parts.length === 1) {
            street = parts[0];
        } else {

            if (/^\d/.test(parts[parts.length - 1])) {
                houseNumber = parts[parts.length - 1];
                street = parts.slice(0, parts.length - 1).join(" ");
            } else {
                street = parts.slice(0, parts.length).join(" ");
            }
        }
        return {
            ...buforAddress,
            city: buforAddress.city,
            street:street,
            houseNumber:houseNumber
        }
    }

    const fetchPointByAddressName = async() => {
        const tempAddress:AddressType = handleSetStreetAndHouseNumber()

        const query = `${tempAddress.street ? tempAddress.street : ""} ${tempAddress.houseNumber ? tempAddress.houseNumber : ""}, ${tempAddress.city ? tempAddress.city : ""}`

        axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`)
            .then(response => {
                fetchPointByLatAndLng(response.data[0].lat, response.data[0].lon)
            }

            ).catch(error => {
                console.log(error)
            })
    }

    


    return (
        <div className="fixed bg-gray-300/75 z-70 h-full w-full top-0 right-0 flex items-start justify-center">
            <div className="bg-white w-3/5 mt-6 opacity-100 py-4 px-6 rounded-md max-h-[calc(100vh-3rem)]">
                <div className="border-gray-300 border-b pt-2 pb-4 flex justify-between">
                    <p className="font-bold text-xl ">Address</p>
                    <X className="cursor-pointer" onClick={() => setShowAddressForm(false)}></X>
                </div>
                <div className="max-h-[calc(100vh-14rem)] overflow-y-scroll overflow-x-hidden">


                    <p className="mt-4 font-medium">Where's your business located?</p>
                    <div className="mt-4 border border-gray-300 rounded-md p-6 flex flex-col">
                        <div className="flex items-start">
                            <div className="flex flex-col leading-10 mr-20 text-gray-500 font-medium text-sm ">
                                <p>Street</p>
                                <p>City</p>
                                <p>Country</p>
                            </div>
                            <div className="flex flex-col leading-8 w-2/3">
                                <div className="flex w-full items-center">
                                    <input
                                        type="text"
                                        value={buforAddress.streetAndHouseNumber}
                                        onChange={(e) => setBuforAddress(
                                            {
                                                ...buforAddress,
                                                streetAndHouseNumber: e.target.value
                                            }
                                        )}
                                        readOnly={!editableAddress}
                                        className={`outline-0 w-full px-2 rounded-md ${editableAddress ? "border border-gray-300" : "cursor-default"} `}
                                    />
                                    {editableAddress ?

                                        <div className="group relative">
                                            <Info className="ml-2 cursor-pointer"></Info>
                                            <p
                                                className="p-4 w-100 text-center absolute bg-slate-900 text-white -bottom-34 rounded-md right-[-350%] z-10 hidden duration-200
                            group-hover:block">
                                                Enter the full street name and the house number at the end (with a letter or a division "/"), e.g. "Rydygiera 4" or "Tadeusza Kościuszki 4/5".
                                            </p>
                                            <div className="bg-slate-900 absolute w-4 h-4 -bottom-4 right-1 rotate-45 hidden
                            group-hover:block">

                                            </div>
                                        </div>
                                        : null
                                    }
                                </div>
                                <input
                                    type="text"
                                    value={buforAddress.city}
                                    onChange={(e) => setBuforAddress(
                                        {
                                            ...buforAddress,
                                            city: e.target.value
                                        }
                                    )}
                                    readOnly={!editableAddress}
                                    className={`outline-0 mr-8 px-2 rounded-md mt-2 ${editableAddress ? "border border-gray-300" : "cursor-default"} `}
                                />
                                <div className="flex items-center mt-2">
                                    <p className="ml-2">Poland</p>
                                    {editableAddress ?
                                        <div className="group relative">
                                            <Info className="ml-2 cursor-pointer"></Info>
                                            <p
                                                className="p-4 w-60 text-center absolute bg-slate-900 text-white bottom-9 rounded-md right-[-350%] z-10 hidden duration-200
                            group-hover:block">
                                                Currently you can only set the Polish location
                                            </p>
                                            <div className="bg-slate-900 absolute w-4 h-4 bottom-8 right-1 rotate-45 hidden
                            group-hover:block">

                                            </div>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                            <button type="button" className="text-blue-500 font-bold ml-auto h-auto cursor-pointer" onClick={() => setEditableAddress(true)}>EDIT</button>
                        </div>
                        {editableAddress ?
                            <div className="w-full p-4 justify-end flex mt-4">
                                <button
                                    type="button"
                                    className="border border-gray-300 rounded-md cursor-pointer px-4 py-2 duration-200 hover:border-black"
                                    onClick={() => {
                                        setBuforAddress({
                                            ...chosenAddress,
                                            streetAndHouseNumber: `${chosenAddress.street ?? ""} ${chosenAddress.houseNumber ?? ""}`
                                        }),
                                            setEditableAddress(false)
                                    }}
                                >CANCEL</button>
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white ml-2 rounded-md cursor-pointer px-4 py-2 duration-200 hover:bg-blue-600"
                                    onClick={() => {
                                        fetchPointByAddressName()
                                        setEditableAddress(false)
                                    }}
                                >SAVE</button>
                            </div>
                            : null
                        }
                    </div>
                    <div className="flex mt-4 items-center">
                        <p className="text-gray-500 font-medium text-sm">Note</p>
                        <input
                            type="text"
                            placeholder="Example: 5th floor, green door"
                            className="outline-0 border border-gray-300 rounded-md px-4 py-2 w-full ml-4"
                            value={chosenAddress.note}
                            onChange={(e) => setChosenAddress(
                                {
                                    ...chosenAddress,
                                    note: e.target.value
                                }
                            )}
                        />
                    </div>
                    <div className="mt-4 w-full h-90 flex items-center justify-center">
                        <MapContainer
                            center={mapPoint}
                            zoom={12}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OpenStreetMap contributors"
                            />
                            <MapSetPoint />
                            {mapPoint &&(
                                <Marker position={mapPoint} icon={mapPointIcon}>
                                    <Popup>
                                        {chosenAddress.street} {chosenAddress.houseNumber ? `${chosenAddress.houseNumber}, ` : ""}
                                        {chosenAddress.city} {chosenAddress.postcode}
                                    </Popup>
                                </Marker>
                            )}
                        </MapContainer>

                    </div>
                </div>
                <div className="border-t border-gray-300 w-full p-4 justify-end flex mt-4">
                    <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="border border-gray-300 rounded-md cursor-pointer px-4 py-2 duration-200 hover:border-black"
                    >CANCEL</button>
                    <button
                        type="button"
                        onClick={() => { setAddress(chosenAddress), setShowAddressForm(false) }}
                        className="bg-blue-500 text-white ml-2 rounded-md cursor-pointer px-4 py-2 duration-200 hover:bg-blue-600"
                    >SAVE</button>
                </div>
            </div>
        </div>
    )
}