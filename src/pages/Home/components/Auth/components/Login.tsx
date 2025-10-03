import { useNavigate } from "react-router-dom"


export const Login = () => {

    const navigate = useNavigate()

    return (
        <section className="w-full text-left flex flex-col">
            <h1 className="text-3xl font-medium">Log in to your account</h1>
            <form action="" className="mt-12 flex flex-col">
                <label className=" text-text-gray block font-medium">Email</label>
                <input type="email" required
                className="border-1 border-gray-300 rounded-sm w-full py-1 px-2 mt-2 
                focus:border-blue-400 outline-none focus:shadow-sm focus:shadow-blue-400 
                hover:border-black duration-200 "
                 />
                <label className=" text-text-gray block mt-6 font-medium">Password</label>
                <input type="password" required
                className="border-1 border-gray-300 rounded-sm w-full py-1 px-2 mt-2 
                focus:border-blue-400 outline-none focus:shadow-sm focus:shadow-blue-400 
                hover:border-black duration-200 "
                 />
                <button className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-md font-medium cursor-pointer hover:bg-blue-600 duration-200">LOG IN</button>
            </form>
            <button onClick={()=>navigate("/forgot-password")} className="font-medium my-4 text-text-gray text-sm cursor-pointer">FORGOT YOUR PASSWORD?</button>
        </section>
    )
}