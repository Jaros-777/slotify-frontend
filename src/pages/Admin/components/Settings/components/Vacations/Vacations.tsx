import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { vactionType } from "./types/vactionType";
import { Search, Trash2, X } from "lucide-react";
import { useCheckIsLogged } from "../../../utlis/checkIsLoged";
import { LoadingPage } from "../../../../../../LoadingPage";
import axios from "axios";
import { monthTypes } from "../../../../../Clients/components/Order/types/dayAndMonthNames";
import { useData } from "../../../../../../AppRouter";
import { Switch } from "@/components/ui/switch"

export const Vacations = () => {
    const vactionId = useParams();
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");
    const { userToken } = useData();
    const [checkIsDataLoaded, setCheckIsDataLoaded] = useState<boolean>(false)
    const [filteredByText, setFilteredByText] = useState<string>("")
    const [showForm, setShowForm] = useState<boolean>(true)
    const [vactionsData, setVacationData] = useState<vactionType[]>([])
    const [filtredVactionsData, setFiltredVacationData] = useState<vactionType[]>([
        {
            id: "0",
            name: "First",
            date: new Date()
        }
    ])
    const [chosenVacation, setChosenVacation] = useState<vactionType>({
        id: "0",
        name: "First",
        date: new Date()
    })
    const [chosenVacationAllDateDuration, setChosenVacationAllDateDuration] =useState<boolean>(false)

    const handleFilterServices = (text: string) => {
        const filtered = vactionsData.filter(e => e.name.toLowerCase().startsWith(text.toLowerCase()))
        setFiltredVacationData(filtered)
        if (text.length === 0) {
            setFiltredVacationData(vactionsData)
        }
    }

    const fetchData = async (token: string) => {
        setCheckIsDataLoaded(true)
        await axios.get(`${import.meta.env.VITE_APP_URL}/availability`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(response => {
            console.log(response.data)
            // const sortedSchedule = response.data.sort((a: scheduleDay, b: scheduleDay) => a.dayOfWeek - b.dayOfWeek)
            // setSchedulePlan(sortedSchedule)
            setCheckIsDataLoaded(false)
        }).catch(function (error) {
            console.log(error)
        })
    }

    const postUpdateData = async () => {
        // await axios.get(`${import.meta.env.VITE_APP_URL}/availability`,
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${userToken}`
        //         }
        //     }
        // ).then(response => {
        //     console.log(response.data)
        //     // const sortedSchedule = response.data.sort((a: scheduleDay, b: scheduleDay) => a.dayOfWeek - b.dayOfWeek)
        //     // setSchedulePlan(sortedSchedule)
        //     setShowForm(false)
        // }).catch(function (error) {
        //     console.log(error)
        // })
    }


    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            if (token) {
                // await fetchData(token);
            }
        })();
    }, []);

    if (isAuthLoading) {
        return <LoadingPage text="Checking authentication..." ></LoadingPage>;
    }
    if (checkIsDataLoaded) {
        return <LoadingPage text="Loading data..." ></LoadingPage>;
    }

    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className=" bg-white w-full p-6 ">
                <div className="flex justify-between items-center w-full ">
                    <h1 className="text-3xl font-bold">Vactions</h1>
                    <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200">ADD NEW VACATION</button>
                </div>
                <div className="flex border border-gray-300 w-full mt-6 mb-6 p-2 ">
                    <Search className="text-gray-300" />
                    <input
                        value={filteredByText}
                        onChange={(e) => { setFilteredByText(e.target.value), handleFilterServices(e.target.value) }}
                        type="text"
                        placeholder="Search"
                        className="ml-2 w-full outline-0" />
                </div>
            </div>
            <ul className="w-full mt-6 pb-12 flex flex-col items-center ">
                {filtredVactionsData.length === 0 ?
                    <p className="bg-white w-[90%] rounded-md p-4 text-center">You have no vactions</p>
                    : null
                }
                {filtredVactionsData.map((e) => (
                    <li
                        key={e.id}
                        className="flex my-2 w-[90%] bg-white p-4 items-center rounded-md cursor-pointer justify-between duration-100 hover:bg-gray-200"
                        onClick={() => { setChosenVacation(e), setShowForm(true) }}
                    >
                        <p>{monthTypes[e.date.getMonth()]} {e.date.getDate()}, {e.date.getFullYear()}</p>
                        <p>{e.name}</p>
                        <Trash2 className="text-red-500"></Trash2>
                    </li>
                ))}
            </ul>
            {showForm ?
                <div className="fixed bg-gray-200 top-0 left-0 w-full h-full z-100">
                    <div className="flex bg-white justify-between py-4 px-8 items-center">
                        <X onClick={() => setShowForm(false)} className="cursor-pointer h-10 w-10 p-2 rounded-full duration-200 hover:bg-gray-200"></X>
                        <p className="font-medium text-xl">Edit vacations</p>
                        <button
                            onClick={() => postUpdateData()}
                            className="bg-blue-500 px-4 py-2 cursor-pointer text-white rounded-md duration-200 hover:bg-blue-600">SAVE</button>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <div className="p-8 bg-white w-3/4 mt-10 rounded-md">
                            <p>Details</p>
                            <p>Name</p>
                            <input
                                value={chosenVacation.name}
                                onChange={(e) => setChosenVacation(prev => (
                                    {
                                        ...prev,
                                        name: e.target.value
                                    }
                                ))}
                                type="text"
                                className="outline-0 p-2 border border-gray-300 rounded-md w-full"
                            />
                            <div className="flex items-center mt-4">
                                <Switch
                                    checked={chosenVacationAllDateDuration}
                                    onCheckedChange={(state) => setChosenVacationAllDateDuration(state)}
                                />
                                <p className="ml-4">All day</p>
                            </div>
                        </div>
                    </div>
                </div>
                : null

            }

        </div>
    )
}