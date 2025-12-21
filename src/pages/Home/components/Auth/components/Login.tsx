import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader } from "lucide-react"

interface userDetailsType {
    email: string,
    password: string
}


export const Login = () => {
    const [userAuthData, setUserAuthData] = useState<userDetailsType>({
        email: "",
        password: ""
    })
    const [showError, setShowError] = useState<boolean>(false)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoadingState(true)
        setShowError(false)
            axios.post(`${import.meta.env.VITE_APP_URL}/auth/login`, userAuthData)
                .then(function (response) {
                    
                    if(response.data.role === "USER_COMPANY"){
                        localStorage.clear()
                        localStorage.setItem("token", response.data.token)
                        window.scrollTo(0, 0)
                        navigate("/admin/calendar")
                    }else{
                        localStorage.removeItem("token")
                        localStorage.removeItem("clientToken")
                        localStorage.setItem("clientToken", response.data.token)
                        window.scrollTo(0, 0)
                        const prevURL = localStorage.getItem("previousURL")
                        if(prevURL){
                            navigate(`/${prevURL}`)
                        }else{
                            navigate("/personal")
                        }
                        localStorage.removeItem("previousURL")
                    }
                    
                })
                .catch(function (response) {
                    setShowError(true)
                    setLoadingState(false)
                })

    }

    return (
        <section className="w-full text-left flex flex-col">
            <h1 className="text-3xl font-medium">Log in to your account</h1>
            {showError ?
                <p className="bg-gray-200 p-4 text-center mt-6 font-medium ">❗Wrong email or password ❗</p>
                :
                null
            }
            <form onSubmit={handleLogin} className="mt-12 flex flex-col">
                <label className=" text-text-gray block font-medium">Email</label>
                <input type="email" required
                    className="border-1 border-gray-300 rounded-sm w-full py-1 px-2 mt-2 
                focus:border-blue-400 outline-none focus:shadow-sm focus:shadow-blue-400 
                hover:border-black duration-200 "
                    value={userAuthData.email}
                    onChange={(e) => setUserAuthData({ ...userAuthData, email: e.target.value })}
                />
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
                        : "LOG IN"

                    }
                </button>
            </form>
            <button onClick={() => navigate("/forgot-password")} className="font-medium my-4 text-text-gray text-sm cursor-pointer">FORGOT YOUR PASSWORD?</button>
        </section>
    )
}