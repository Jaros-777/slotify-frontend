import CalendarImg from "./assets/calendar-img.webp"
import ClientImg from "./assets/client-img.webp"
import TeamImg from "./assets/team-img.webp"

import { useState } from "react"

export const Features = () => {
    const images: string[] = [CalendarImg, ClientImg, TeamImg]
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [visible, setVisible] = useState(true)


    function handleIndex(index: number) {
        if (index === currentIndex) return

        setVisible(false)

        setTimeout(() => {
            setCurrentIndex(index)
            setVisible(true)
        }, 100)
    }


    return (
        <section id="features" className="my-40 w-full flex justify-center">
            <div className="max-w-350 flex flex-col-reverse lg:flex-row px-4">
                <div className="flex flex-col w-full lg:w-1/2 px-8 pb-4 h-full items-start">
                    <h1 className="text-center lg:text-left mt-10 lg:mt-0 text-4xl lg:text-5xl font-medium">Optimize your schedule with smart daily tools</h1>
                    <ul className="lg:ml-4 mt-4  lg:select-auto select-none">
                        <li onClick={() => handleIndex(0)} className={`mt-8 cursor-pointer p-4 rounded-xl hover:bg-blue-200 duration-200 ${currentIndex === 0 ? "bg-blue-200" : "bg-white"}`}>
                            <p className={`text-2xl font-medium  ${currentIndex === 0 ? "text-black" : "text-text-gray"}`}>Calendar managment</p>
                            <p className={`font-medium mt-1 ${currentIndex === 0 ? "text-black" : "text-text-gray"}`}>Organize all your appointments and group events in one central calendar.</p>
                        </li>
                        <li onClick={() => handleIndex(1)} className={`mt-8 cursor-pointer p-4 rounded-xl hover:bg-blue-200 duration-200 ${currentIndex === 1 ? "bg-blue-200" : "bg-white"}`}>
                            <p className={`text-2xl font-medium  ${currentIndex === 1 ? "text-black" : "text-text-gray"}`}>Client managment</p>
                            <p className={`font-medium mt-1 ${currentIndex === 1 ? "text-black" : "text-text-gray"}`}>Track client details efficiently and enhance customer loyalty.</p>
                        </li>
                        <li onClick={() => handleIndex(2)} className={`mt-8 cursor-pointer p-4 rounded-xl hover:bg-blue-200 duration-200 ${currentIndex === 2 ? "bg-blue-200" : "bg-white"}`}>
                            <p className={`text-2xl font-medium  ${currentIndex === 2 ? "text-black" : "text-text-gray"}`}>Team managment</p>
                            <p className={`font-medium mt-1 ${currentIndex === 2 ? "text-black" : "text-text-gray"}`}>Coordinate your team, manage schedules, and monitor performance effectively.</p>
                        </li>
                    </ul>
                </div>
                <div className="w-full lg:w-1/2 aspect-[3/2] p-8 bg-blue-200 rounded-2xl flex items-center justify-center relative">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            loading="lazy"
                            alt="Feature Image"
                            className={`absolute max-w-5/6 max-h-[40rem] transition-opacity duration-150 ease-in-out ${currentIndex === i ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        />
                    ))}

                </div>
            </div>
        </section>
    )
}