import { useEffect, useState } from "react"
import type { vactionType } from "../types/vactionType"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import { useData } from "@/AppRouter"
import axios from "axios"
import { toLocalDateTimeString } from "@/pages/Admin/components/Calendar/components/BigCalendar/utils/dateUtils"
import { useNavigate } from "react-router-dom"

interface vactionFormProps {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    chosenVacation: vactionType
}

export const VacationForm = ({ setShowForm, chosenVacation }: vactionFormProps) => {
    const [vacation, setVacation] = useState<vactionType>(chosenVacation)
    const [showHours, setShowHours] = useState<boolean>(false)
    const { userToken } = useData();
    const navigate = useNavigate()


    const postUpdateData = async () => {
        const payload = {
            ...vacation,
            startDate: vacation.id ? vacation.startDate : toLocalDateTimeString(vacation.startDate),
            endDate: vacation.id ? vacation.endDate : toLocalDateTimeString(vacation.endDate),
        }
        console.log(payload)
        await axios.post(`${import.meta.env.VITE_APP_URL}/vacation`,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(response => {
            handleCloseForm
            window.location.reload()
        }).catch(function (error) {
            console.log(error)
        })
    }

    const formatDateForInput = (d: string | Date) => {
        const date = toDate(d)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    const formatTimeForInput = (d: string | Date) => {
        const date = toDate(d)
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")
        return `${hours}:${minutes}`
    }

    const toDate = (d: string | Date) => typeof d === "string" ? new Date(d) : d
    const isAllDay = (start: string | Date, end: string | Date): boolean => {
        const s = toDate(start)
        const e = toDate(end)
        return (
            s.getHours() === 0 &&
            s.getMinutes() === 0 &&
            e.getHours() === 23 &&
            e.getMinutes() === 59
        )
    }

    const handleCloseForm=()=>{
        setShowForm(false)
        const prevWeek = localStorage.getItem("currentWeek")
        if(prevWeek){
            navigate("/admin/calendar")
        }
    }


    useEffect(() => {
        setShowHours(!isAllDay(new Date(vacation.startDate), new Date(vacation.endDate)))
    }, [])

    return (
        <div className="fixed bg-gray-200 top-0 left-0 w-full h-full z-100">
            <div className="flex bg-white justify-between py-4 px-8 items-center">
                <X onClick={handleCloseForm} className="cursor-pointer h-10 w-10 p-2 rounded-full duration-200 hover:bg-gray-200"></X>
                <p className="font-bold text-xl">{vacation.id ? "Edit vacation" : "New vacation"}</p>
                <button
                    type="submit"
                    form="vacation-form"
                    className="bg-blue-500 px-4 py-2 cursor-pointer text-white rounded-md duration-200 hover:bg-blue-600">SAVE</button>
            </div>
            <div className="flex flex-col items-center w-full">
                <form onSubmit={(e) => { e.preventDefault(), postUpdateData() }} id="vacation-form" className="p-8 bg-white w-3/4 mt-10 rounded-md">


                    <p className="font-medium text-2xl border-b border-gray-300 pb-2">Details</p>
                    <p className="font-medium mt-4">Name</p>
                    <input
                        value={vacation.name}
                        onChange={(e) => setVacation(prev => (
                            {
                                ...prev,
                                name: e.target.value
                            }
                        ))}
                        placeholder="Your holiday name"
                        type="text"
                        required
                        className="outline-0 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <div className="flex items-center mt-6">
                        <Switch
                            checked={!showHours}
                            onCheckedChange={() => {
                                let startDate = new Date();
                                startDate.setHours(0);
                                startDate.setMinutes(0)
                                let endDate = new Date();
                                endDate.setHours(23);
                                endDate.setMinutes(59)
                                setVacation(prev => (
                                    {
                                        ...prev,
                                        startDate: vacation.id ? vacation.startDate : startDate,
                                        endDate: vacation.id ? vacation.endDate : endDate
                                    }
                                )), setShowHours(!showHours)
                            }}
                        />
                        <p className="ml-4">All day</p>
                    </div>
                    <div className="flex mt-6">
                        <div className="w-1/2">
                            <p className="font-medium">From</p>
                            <input
                                className="border border-gray-300 rounded-md p-2"
                                value={formatDateForInput(vacation.startDate)}
                                onChange={(e) => {
                                    const [year, month, day] = e.target.value.split("-").map(Number)
                                    setVacation(prev => {
                                        const updated = new Date(prev.startDate)
                                        updated.setFullYear(year)
                                        updated.setMonth(month - 1)
                                        updated.setDate(day)

                                        return { ...prev, startDate: updated }
                                    })
                                }}
                                required
                                type="date"
                            />
                            {showHours &&
                                <input
                                    className="border border-gray-300 rounded-md p-2 ml-4"
                                    value={formatTimeForInput(vacation.startDate)}
                                    onChange={(e) => {
                                        const [hours, minutes] = e.target.value.split(":").map(Number)
                                        setVacation(prev => {
                                            const updated = new Date(prev.startDate)
                                            updated.setHours(hours)
                                            updated.setMinutes(minutes)
                                            updated.setSeconds(0)
                                            return { ...prev, startDate: updated }
                                        })
                                    }}
                                    required
                                    type="time"
                                />}
                        </div>
                        <div>
                            <p className="font-medium">To</p>
                            <input
                                className="border border-gray-300 rounded-md p-2"
                                value={formatDateForInput(vacation.endDate)}
                                onChange={(e) => {
                                    const [year, month, day] = e.target.value.split("-").map(Number)
                                    setVacation(prev => {
                                        const updated = new Date(prev.endDate)
                                        updated.setFullYear(year)
                                        updated.setMonth(month - 1)
                                        updated.setDate(day)
                                        return { ...prev, endDate: updated }
                                    })
                                }}
                                required
                                type="date"
                            />
                            {showHours &&
                                <input
                                    className="border border-gray-300 rounded-md p-2 ml-4"
                                    value={formatTimeForInput(vacation.endDate)}
                                    onChange={(e) => {
                                        const [hours, minutes] = e.target.value.split(":").map(Number)
                                        setVacation(prev => {
                                            const updated = new Date(prev.endDate)
                                            updated.setHours(hours)
                                            updated.setMinutes(minutes)
                                            updated.setSeconds(0)
                                            return { ...prev, endDate: updated }
                                        })
                                    }}
                                    required
                                    type="time"
                                />}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}