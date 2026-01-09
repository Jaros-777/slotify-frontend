import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { vactionType } from "./types/vactionType";
import { Search, Trash2, X } from "lucide-react";
import { useCheckIsLogged } from "../../../utlis/checkIsLoged";
import { LoadingPage } from "../../../../../../LoadingPage";
import axios from "axios";
import { monthTypes } from "../../../../../Clients/components/Order/types/dayAndMonthNames";
import { useData } from "../../../../../../AppRouter";
import { VacationForm } from "./component/VacationForm";


export const Vacations = () => {
    const vactionId = useParams();
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");
    const { userToken } = useData()
    const [checkIsDataLoaded, setCheckIsDataLoaded] = useState<boolean>(false)
    const [filteredByText, setFilteredByText] = useState<string>("")
    const [showForm, setShowForm] = useState<boolean>(true)
    const [vactionsData, setVacationData] = useState<vactionType[]>([])
    const [filtredVactionsData, setFiltredVacationData] = useState<vactionType[]>([])
    const [chosenVacation, setChosenVacation] = useState<vactionType>()

    const handleFilterServices = (text: string) => {
        const filtered = vactionsData.filter(e => e.name.toLowerCase().startsWith(text.toLowerCase()))
        setFiltredVacationData(filtered)
        if (text.length === 0) {
            setFiltredVacationData(vactionsData)
        }
    }

    const fetchData = async (token: string) => {
        setCheckIsDataLoaded(true)
        await axios.get(`${import.meta.env.VITE_APP_URL}/vacation`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(response => {
            console.log(response.data)
            setVacationData(response.data)
            const sortedData = response.data.sort(
                (a: vactionType, b: vactionType) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            )

            setFiltredVacationData(sortedData)
            setCheckIsDataLoaded(false)
        }).catch(function (error) {
            console.log(error)
        })
    }

    const deleteVacation = async (id: string) => {
        await axios.get(`${import.meta.env.VITE_APP_URL}/vacation/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(response => {
            console.log(response.data)
            setVacationData(response.data)
            const sortedData = response.data.sort(
                (a: vactionType, b: vactionType) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            )

            setFiltredVacationData(sortedData)
            setCheckIsDataLoaded(false)
        }).catch(function (error) {
            console.log(error)
        })
        window.location.reload()
    }

    const isSameDay = (start: string | Date, end: string | Date): boolean => {
    const s = typeof start === "string" ? new Date(start) : start
    const e = typeof end === "string" ? new Date(end) : end

    return (
        s.getFullYear() === e.getFullYear() &&
        s.getMonth() === e.getMonth() &&
        s.getDate() === e.getDate()
    )
}

    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            if (token) {
                await fetchData(token);
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
                    <button
                        onClick={() => {
                            let startDate = new Date();
                            startDate.setHours(0);
                            startDate.setMinutes(0)
                            let endDate = new Date();
                            endDate.setHours(23);
                            endDate.setMinutes(59)
                            setChosenVacation(
                                {
                                    name: "",
                                    startDate: startDate,
                                    endDate: endDate
                                }
                            )
                            setShowForm(true)
                        }}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200"
                    >ADD NEW VACATION</button>
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
                {filtredVactionsData.map((e) => {
                    const startDate = new Date(e.startDate)
                    const endDate = new Date(e.endDate)
                    return (
                        <li
                            key={e.id}
                            className="flex my-2 w-[90%] bg-white items-center rounded-md cursor-pointer justify-between duration-100 hover:bg-gray-200 border border-gray-300"
                            
                        >
                            <div className="flex w-full h-full p-4 " onClick={() => { setChosenVacation(e), setShowForm(true) }}>


                                <div className="flex gap-1 w-1/2">
                                    <p className="font-medium">{monthTypes[startDate.getMonth()]} {startDate.getDate()}, {startDate.getFullYear()}</p>
                                    {!isSameDay(e.startDate, e.endDate) ?
                                        <p className="font-medium">- {monthTypes[endDate.getMonth()]} {endDate.getDate()}, {endDate.getFullYear()}</p>
                                        : null
                                    }
                                </div>

                                <p>{e.name}</p>
                            </div>
                            <Trash2 onClick={() => e.id ? deleteVacation(e.id) : null} className="text-red-500 mx-2"></Trash2>
                        </li>
                    )
                })}
            </ul>
            {showForm && chosenVacation ?
                <VacationForm chosenVacation={chosenVacation} setShowForm={setShowForm}></VacationForm>
                : null

            }

        </div>
    )
}