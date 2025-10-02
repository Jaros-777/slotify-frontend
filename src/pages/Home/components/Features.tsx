import CalendarImg from "./assets/calendar-img.webp"
import ClientImg from "./assets/client-img.webp"
import TeamImg from "./assets/team-img.webp"

import { useState } from "react"

export const Features = () => {
    const [imageData, setImageData] = useState<string[]>([CalendarImg,ClientImg, TeamImg])
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    function handleIndex(index: number){
        setCurrentIndex(index)
    }

    return (
        <section id="features" className="flex flex-col pt-30 flex-row px-60">
            <div className="flex flex-col w-1/2 px-8 pb-4 h-full items-start">
                <h1 className="text-5xl font-medium">Save time with smart daily managment</h1>
                <ul className="ml-4 mt-4">
                    <li onClick={()=>handleIndex(0)} className={`mt-8 cursor-pointer p-4 rounded-xl hover:bg-blue-200 duration-200 ${currentIndex === 0? "bg-blue-200" : "bg-white"}`}>
                        <p className={`text-2xl font-medium  ${currentIndex === 0? "text-black" : "text-gray-600"}`}>Calendar managment</p>
                        <p className={`font-medium mt-1 ${currentIndex === 0? "text-black" : "text-gray-600"}`}>Keep all your appointments or group events in one place.</p>
                    </li>
                    <li onClick={()=>handleIndex(1)} className={`mt-8 cursor-pointer p-4 rounded-xl hover:bg-blue-200 duration-200 ${currentIndex === 1? "bg-blue-200" : "bg-white"}`}>
                        <p className={`text-2xl font-medium  ${currentIndex === 1? "text-black" : "text-gray-600"}`}>Client managment</p>
                        <p className={`font-medium mt-1 ${currentIndex === 1? "text-black" : "text-gray-600"}`}>Manage client information and build customer loyalty.</p>
                    </li>
                    <li onClick={()=>handleIndex(2)} className={`mt-8 cursor-pointer p-4 rounded-xl hover:bg-blue-200 duration-200 ${currentIndex === 2? "bg-blue-200" : "bg-white"}`}>
                        <p className={`text-2xl font-medium  ${currentIndex === 2? "text-black" : "text-gray-600"}`}>Team managment</p>
                        <p className={`font-medium mt-1 ${currentIndex === 2? "text-black" : "text-gray-600"}`}>Cooridnate your team, manage shifts and track performance easily.</p>
                    </li>
                </ul>
            </div>
            <div className="w-1/2 p-8 bg-violet-200 rounded-2xl flex items-center justify-center">
                <img src={imageData[currentIndex]} alt="Feature Image" className="max-w-full max-h-[40rem]" />
            </div>
        </section>
    )
}