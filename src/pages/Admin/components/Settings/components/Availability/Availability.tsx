import { useEffect, useState } from "react";
import { useCheckIsLogged } from "../../../utlis/checkIsLoged";
import type { scheduleWeek } from "./utlis/scheduleType";


const initialSchedule: scheduleWeek = {
  monday: { openHour: "08:00", closeHour: "20:00", isClose: false },
  tuesday: { openHour: "08:00", closeHour: "20:00", isClose: false },
  wednesday: { openHour: "08:00", closeHour: "20:00", isClose: false },
  thursday: { openHour: "08:00", closeHour: "20:00", isClose: false },
  friday: { openHour: "08:00", closeHour: "20:00", isClose: false },
  saturday: { openHour: "10:00", closeHour: "18:00", isClose: true },
  sunday: { openHour: "10:00", closeHour: "18:00", isClose: true },
};

type dayTypes = "monday"


export const Availability = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged();
    const [schedulePlan, setSchedulePlan] = useState<scheduleWeek>(initialSchedule)

    const handleChangeSchedule =(day: dayTypes, field: keyof scheduleWeek, value: string | boolean)=>{
        setSchedulePlan(prev=>({
            ...prev,
            [day]: {...prev[day], [field]:value}
        }))
    }


    useEffect(() => {
            (async () => {
                await checkIsLogged();
            })();
        }, []);

    if (isAuthLoading) {
        return <p className="mt-20">Checking authentication...</p>;
    }


    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className=" bg-white w-full p-6 ">
                <div className="flex justify-between items-center w-full ">
                    <h1 className="text-3xl font-bold">Availability</h1>
                </div>
            </div>
            <div className="flex flex-col my-2 w-[90%] bg-white p-4 rounded-md cursor-pointer">
                <h3 className="font-bold">Opening hours</h3>
                <p className="border-b border-gray-300 pb-6 pt-2">Adjust the general operating hours of your business.</p>
                <div>
                    <div className="flex justify-around p-4">
                        <div className="flex">
                            <input type="checkbox" />
                            <p className="ml-4 font-bold">Monday</p>
                        </div>
                        <div className="flex">
                            <p className="font-bold mr-4">FROM</p>
                            <input 
                            type="time" 
                            className="mr-6"
                            value={schedulePlan.monday.openHour}
                            // onChange={(e)=>handleChangeSchedule("monday","openHour", e.target.value)}
                            />
                            <p className="font-bold mr-4">TO</p>
                            <input type="time" />
                        </div>
                    </div>
                    <div className="flex justify-around p-4">
                        <div className="flex">
                            <input type="checkbox" />
                            <p>Monday</p>
                        </div>
                        <div className="flex">
                            <p>FROM</p>
                            <input type="time" />
                            <p>FROM</p>
                            <input type="time" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    )
}