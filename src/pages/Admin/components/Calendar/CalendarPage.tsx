
import { useState } from "react"
import { MiniCalendar } from "./components/MiniCalendar"
import { BigCalendar } from "./components/BigCalendar"

export const CalendarPage = () => {
    const [formatDate, setFormatDate] = useState<string>("")
    const [serviceData, setServiceData] = useState<string[]>(["service 1", 'service 2', 'service 3'])

    return (
        <section className="mt-20 borer-1 border-text-gray flex">
            <div className="w-1/6 border-r-1 border-b-1 border-gray-300 p-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600 duration-200 w-full">
                    <img src="#" alt="" />
                    <span>CREATE NEW</span>
                </button>
                <MiniCalendar onWeekChange={setFormatDate} />
                <div className="mt-4">
                    <p className="font-medium">SERVICES</p>

                    <ul>
                        {serviceData.map((_, index)=>(
                            <li key={index} className="mt-2">🏿 {serviceData[index]}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-5/6">
                <p>{formatDate}</p>
                <BigCalendar/>
            </div>
        </section>
    )
}