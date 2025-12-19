import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { Loader } from "lucide-react"

interface userDetailsType {
    name: string,
    businessName?: string,
    email: string,
    password: string,
    phone?:string
}

const businessInitData = {
    name: "",
    businessName: "",
    email: "",
    password: "",
    phone: "",
    role: "USER_COMPANY"
}
const personalInitData = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CLIENT"
}

export const Register = () => {
    const [userAuthData, setUserAuthData] = useState<userDetailsType>(businessInitData)
    const [showError, setShowError] = useState<boolean>(false)
    const [loadingState, setLoadingState] = useState<boolean>(false)

    const navigate = useNavigate()
    const accountType = window.location.href.split("/")[4]

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoadingState(true)
        setShowError(false)
        axios.post("http://localhost:8080/auth/register", userAuthData)
            .then(function (response) {
                navigate("/login")
            })
            .catch(function (response) {
                setShowError(true)
                setLoadingState(false)
            })
    }

    useEffect(() => {
        if (accountType === "bussines") {
            setUserAuthData(businessInitData)
        } else
            setUserAuthData(personalInitData)
    }, [accountType])



    return (
        <section className="w-full text-left flex flex-col">
            <h1 className="text-3xl font-medium">Create your account</h1>
            {showError ?
                <p className="bg-gray-200 p-4 text-center mt-6 font-medium ">❗User with this email address already exists. Try to login. ❗</p>
                :
                null
            }

            <form onSubmit={handleRegister} className="mt-12 flex flex-col">
                <label className=" text-text-gray block font-medium">Full name</label>
                <input type="text" required
                    className="border-1 border-gray-300 rounded-sm w-full py-1 px-2 mt-2 
                focus:border-blue-400 outline-none focus:shadow-sm focus:shadow-blue-400 
                hover:border-black duration-200 "
                    value={userAuthData.name}
                    onChange={(e) => setUserAuthData({ ...userAuthData, name: e.target.value })}
                />
                {accountType === "business" ?
                    <>
                        <label className=" text-text-gray block mt-6 font-medium">Business name</label>
                        <input type="text" required
                            className="border-1 border-gray-300 rounded-sm w-full py-1 px-2 mt-2 
                focus:border-blue-400 outline-none focus:shadow-sm focus:shadow-blue-400 
                hover:border-black duration-200 "
                            value={userAuthData.businessName}
                            onChange={(e) => setUserAuthData({ ...userAuthData, businessName: e.target.value })}
                        />
                    </>
                    : null
                }

                <label className=" text-text-gray block mt-6 font-medium">Email</label>
                <input type="email" required
                    className="border-1 border-gray-300 rounded-sm w-full py-1 px-2 mt-2 
                focus:border-blue-400 outline-none focus:shadow-sm focus:shadow-blue-400 
                hover:border-black duration-200 "
                    value={userAuthData.email}
                    onChange={(e) => setUserAuthData({ ...userAuthData, email: e.target.value })}
                />
                {accountType === "personal" ?
                    <>
                        <label className=" text-text-gray block mt-6 font-medium">Phone</label>
                        <input type="tel"
                            required
                            minLength={9}
                            maxLength={9}
                            pattern="[0-9]+"
                            className="border-1 border-gray-300 rounded-sm w-full py-1 px-2 mt-2 
                focus:border-blue-400 outline-none focus:shadow-sm focus:shadow-blue-400 
                hover:border-black duration-200 "
                            value={userAuthData.phone}
                            onChange={(e) => setUserAuthData({ ...userAuthData, phone: e.target.value })}
                        />
                    </>
                    : null
                }
                <label className=" text-text-gray block mt-6 font-medium">Password</label>
                <input type="password" required
                    className="border-1 border-gray-300 rounded-sm w-full py-1 px-2 mt-2 
                focus:border-blue-400 outline-none focus:shadow-sm focus:shadow-blue-400 
                hover:border-black duration-200 "
                    value={userAuthData.password}
                    onChange={(e) => setUserAuthData({ ...userAuthData, password: e.target.value })}
                />

                <button type="submit" className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-600 duration-200" >
                    {loadingState ?
                        <Loader className=" w-full animate-spin "></Loader>
                        : "CREATE ACCOUNT"

                    }
                </button>
            </form>
        </section>
    )
}