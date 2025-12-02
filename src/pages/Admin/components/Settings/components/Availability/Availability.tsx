import { useEffect, useState } from "react";
import { useCheckIsLogged } from "../../../utlis/checkIsLoged";
import type { scheduleDay } from "./utlis/scheduleType";
import axios from "axios";
import { useData } from "../../../../../../AppRouter";



const dayTypes = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]


export const Availability = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged();
    const [checkIsDataLoaded, setCheckIsDataLoaded] = useState(true)
    const {userToken} = useData();
    const [schedulePlan, setSchedulePlan] = useState<scheduleDay[]>([])

    const handleChangeSchedule = async(dayOfWeek: number, field: "openHour" | "closeHour" | "isClose", value: string | boolean) => {
        let copy = schedulePlan;
        copy = copy.map(day=>
                day.dayOfWeek === dayOfWeek ?
                {...day, [field]:value} :
                day
            )
        console.log("Copy ",copy)

        await axios.put("http://localhost:8080/availability", copy,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(response=> {
        }).catch(function (error) {
            console.log(error)
        })
        window.location.reload()
    }

    const fetchAvailability = async (token:string)=>{
        setCheckIsDataLoaded(true)
        await axios.get("http://localhost:8080/availability",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(response=> {
            console.log(response.data)
            const sortedSchedule = response.data.sort((a:scheduleDay,b:scheduleDay)=> a.dayOfWeek - b.dayOfWeek)
            setSchedulePlan(sortedSchedule)
            setCheckIsDataLoaded(false)
        }).catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            if(token)
                await fetchAvailability(token)
        })();
    }, []);

    if (isAuthLoading) {
        return <p className="mt-20">Checking authentication...</p>;
    }
    if (checkIsDataLoaded) {
        return <p className="mt-20">Checking data...</p>;
    }


    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className=" bg-white w-full p-6 ">
                <div className="flex justify-between items-center w-full ">
                    <h1 className="text-3xl font-bold">Availability</h1>
                </div>
            </div>
            <div className="flex flex-col my-2 w-[90%] bg-white p-4 rounded-md">
                <h3 className="font-bold">Opening hours</h3>
                <p className="border-b border-gray-300 pb-6 pt-2">Adjust the general operating hours of your business.</p>
                <ul>
                    {schedulePlan?.map((e) => (
                        <li className="flex p-4" key={e.id}>
                            <div className="flex w-1/2">
                                <input
                                    className="cursor-pointer"
                                    type="checkbox"
                                    checked = {e.isClose}
                                    onChange={(ev) => handleChangeSchedule(e.dayOfWeek, "isClose", ev.target.checked)}
                                />
                                <p className="ml-4 font-medium">{dayTypes[e.dayOfWeek]}</p>
                            </div>
                            {e.isClose ?
                                <div>
                                    <p className="font-medium">Closed</p>
                                </div>
                                :
                                <div className="flex w-1/2">
                                    <p className="font-medium mr-8">FROM</p>
                                    <input
                                        type="time"
                                        className="mr-6 cursor-pointer"
                                        value={schedulePlan[e.dayOfWeek].openHour}
                                        onChange={(ev) => handleChangeSchedule(e.dayOfWeek, "openHour", ev.target.value)}
                                    />
                                    <p className="font-medium mr-4">TO</p>
                                    <input
                                        type="time"
                                        className="mr-6 cursor-pointer"
                                        value={schedulePlan[e.dayOfWeek].closeHour}
                                        onChange={(ev) => handleChangeSchedule(e.dayOfWeek, "closeHour", ev.target.value)}
                                    />
                                </div>
                            }

                        </li>
                    ))}

                </ul>
            </div>

        </div>

    )
}