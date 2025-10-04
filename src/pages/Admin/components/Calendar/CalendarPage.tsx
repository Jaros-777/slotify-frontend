
import { useState } from "react"
import { MiniCalendar } from "./components/MiniCalendar"

export const CalendarPage = () => {
    const [formatDate, setFormatDate] = useState<string>("")

    return (
        <section className="mt-20 borer-1 border-text-gray flex">
            <div className="w-1/6 border-r-1 border-b-1 border-gray-300 p-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600 duration-200 w-full">
                    <img src="#" alt="" />
                    <span>CREATE NEW</span>
                </button>
                <MiniCalendar onWeekChange={setFormatDate} />
                <div>
                    <p>SERVICES</p>

                    <ul>
                        <li>service 1</li>
                        <li>service 2</li>
                        <li>service 3</li>
                    </ul>
                </div>
            </div>
            <div>
                <p>{formatDate}</p>
            </div>
        </section>
    )
}