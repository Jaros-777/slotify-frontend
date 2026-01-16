import { useEffect, useState } from "react";
import type { UserType } from "./types/userType";
import axios from "axios";
import { useData } from "@/AppRouter";
import { Loader, Image, LockKeyhole } from "lucide-react";
import { useCheckIsLogged } from "../utlis/checkIsLoged";
import { LoadingPage } from "@/LoadingPage";


export const UserProfile = () => {

    const [userData, setUserData] = useState<UserType>()
    const [changedUserData, setChangedUserData] = useState<UserType>()
    const { userToken, businessPictureURL } = useData()
    const [showSavingState, setShowSavingState] = useState<boolean>(false)
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");

    const handleUpdateUserDetails = async () => {
        if (userData != changedUserData) {
            setShowSavingState(true)

            await axios.put(`${import.meta.env.VITE_APP_URL}/user`,
                changedUserData,
                {
                    headers: { Authorization: `Bearer ${userToken}` },
                }).then(response => {
                    window.location.reload()
                }).catch(error => {
                    console.log(error)
                });
            setShowSavingState(false)
        }
    }

    const fetchUserDetails = async (token:string) => {
        setShowSavingState(true)
        await axios.get(`${import.meta.env.VITE_APP_URL}/user`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }).then(response => {
                setUserData(response.data)
                setChangedUserData(response.data)
            }).catch(error => {
                console.log(error)
            });
        setShowSavingState(false)
    }

    useEffect(() => {

        (async () => {
            const token = await checkIsLogged();
            if(token)
                await fetchUserDetails(token)
        })();
    }, [])

    if (isAuthLoading) {
        return <LoadingPage text="Checking authentication..." ></LoadingPage>;
    }
    if (!userData || !changedUserData) {
        return <LoadingPage text="Loading data..." ></LoadingPage>;
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="bg-white w-full flex flex-col items-center border-b border-gray-300">
                <div className="w-full flex max-w-[80rem] items-center p-4">
                    {
                        businessPictureURL ?
                            <img className="h-24 w-24 overflow-hidden rounded-2xl flex items-center justify-center" src={businessPictureURL} alt="Background picture" />
                            :
                            <Image className="h-28 w-28 aspect-square text-gray-400" />
                    }
                    <p className="text-3xl ml-4 font-medium">{userData.name}</p>
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <form
                    onSubmit={e => { e.preventDefault(); handleUpdateUserDetails() }}
                    className="bg-white m-4 p-4 w-full max-w-[80rem] rounded-2xl border border-gray-300">
                    <p className="mt-4 font-medium text-xl">Profile details</p>
                    <p className="mt-4">Full name</p>
                    <input
                        required
                        type="text"
                        className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                        value={changedUserData.name}
                        onChange={(e) => setChangedUserData({ ...changedUserData, name: e.target.value })}
                    />
                    <p className="mt-4">Email</p>
                    <input
                        required
                        type="email"
                        className="border border-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none"
                        value={changedUserData.email}
                        onChange={(e) => setChangedUserData({ ...changedUserData, email: e.target.value })}
                    />
                    <div>
                        <button
                            className="mt-12 bg-blue-500 text-white px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-blue-600 duration-200"
                            type="submit"
                        >
                            {showSavingState ?
                                <Loader className="animate-spin"></Loader>
                                :
                                <p>SAVE</p>
                            }
                        </button>
                        {userData.name != changedUserData.name || userData.email != changedUserData.email ?
                            <button
                                className="ml-12 border border-gray-300 px-6 py-2 rounded-md text-md font-medium cursor-pointer hover:bg-gray-300 duration-200"
                                onClick={() => setChangedUserData(userData)}
                                type="button"
                            >DISCARD CHANGES</button>
                            : null
                        }
                    </div>
                </form>
                <div className="border border-gray-300 rounded-2xl p-4 mt-4 flex justify-between w-full max-w-[80rem] bg-white">
                    <div>
                        <p className="text-xl font-medium">Password</p>
                        <p className="mt-2">Set or change your account password.</p>
                    </div>
                    <button
                        onClick={() => alert("This section isn't implemented yet!")}
                        className="ml-12 border border-gray-300 px-6 py-2 rounded-md text-md font-medium flex items-center cursor-pointer hover:bg-gray-300 duration-200">
                        <LockKeyhole className="mr-4 h-[1.5em]"></LockKeyhole>
                        <span>CHANGE PASSWORD</span>
                    </button>
                </div>
            </div>
        </div>
    )
}