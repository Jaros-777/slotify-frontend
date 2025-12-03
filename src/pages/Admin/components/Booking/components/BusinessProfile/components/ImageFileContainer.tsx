import Cropper from "react-easy-crop";
import { X, Plus, Minus, RotateCw, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { getCroppedFile } from "./cropImage";

interface propsImage {
    file: File | null
    setShowImageFileContainer: React.Dispatch<React.SetStateAction<boolean>>
    setProfilePic: React.Dispatch<React.SetStateAction<File | null>>
}

interface positionType {
    x: number,
    y: number
}

export const ImageFileContainer = ({ file, setShowImageFileContainer, setProfilePic }: propsImage) => {
    const [crop, setCrop] = useState<positionType>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{x:number,y:number,width:number,height:number}|null>(null);


    const handleSaveImg = async() => {
        if (!file || !croppedAreaPixels) return;

        const croppedFile = await getCroppedFile(file, croppedAreaPixels, rotation);

        setProfilePic(croppedFile);
        setShowImageFileContainer(false);
    }


    if (!file) return null;
    

    return (
        <div className="bg-gray-400/50 absolute h-full w-full top-0 left-0 z-50 overflow-hidden flex items-center justify-center">
            <div className="bg-white w-3/4 rounded-2xl">
                <div className='flex justify-between py-4 px-8'>
                    <p className='font-bold'>Reposition</p>
                    <button onClick={() => setShowImageFileContainer(false)} className='cursor-pointer'><X /></button>
                </div>
                <div className='h-80 w-full flex justify-center items-center'>
                    <Cropper
                        image={URL.createObjectURL(file)}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                        onCropComplete={(croppedAreaPx) => setCroppedAreaPixels(croppedAreaPx!)}
                        style={{
                            containerStyle: {
                                width: "100%",
                                height: "100%",
                                position: "relative",
                            },
                            mediaStyle: {
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            },
                        }}
                    />
                </div>
                <div className='flex justify-between p-8 items-center'>
                    <div className='w-3/4 flex '>
                        <button className='border border-gray-300 rounded-sm mr-4 p-2 cursor-pointer'><Minus className='text-gray-500' /></button>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.01}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className='w-full cursor-pointer' />
                        <button className='border border-gray-300 rounded-sm ml-4 p-2 cursor-pointer'><Plus className='text-gray-500' /></button>
                    </div>
                    <div>
                        <button
                            className='border border-gray-400 rounded-sm p-2 mr-4 cursor-pointer'
                            onClick={() => setRotation(rotation - 90)}
                        ><RotateCcw className='text-gray-500' /></button>
                        <button
                            className='border border-gray-400 rounded-sm p-2 cursor-pointer'
                            onClick={() => setRotation(rotation + 90)}
                        ><RotateCw className='text-gray-500' /></button>
                    </div>
                </div>
                <div className='p-8 flex justify-end border-t border-gray-300'>
                    <button className=" bg-red-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-red-600 duration-200" onClick={() => setShowImageFileContainer(false)}>CANCEL</button>
                    <button className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200" onClick={handleSaveImg}>SAVE</button>
                </div>
            </div>
        </div>
    )
}