
import { MiniCalendar } from "./components/MiniCalendar"

export const CalendarPage = ()=>{

    return(
        <section className="mt-20 borer-1 border-text-gray min-h-screen">
            <div className="w-1/5 border-r-1 border-b-1 border-text-gray p-4">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600 duration-200 w-full">
                    <img src="#" alt="" />
                    <span>CREATE NEW</span>
                </button>
                <MiniCalendar/>
                <div>
                    <p>SERVICES</p>
                    <ul>
                        <li>service 1</li>
                        <li>service 2</li>
                        <li>service 3</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}