import { useNavigate } from "react-router-dom";
import { Login } from "./components/Login"
import { Register } from "./components/Register"

type AuthProps = {
    view: "login" | "register";
}



export const Auth = ({ view }: AuthProps) => {

    const navigate = useNavigate()
    const isPreviousUrl:boolean = localStorage.getItem("previousURL") ? true : false

    return (
        <section className=" min-h-screen bg-gray-200 flex flex-col items-center px-4">
            <div className="my-34 bg-white w-full md:w-[40rem] h-auto flex flex-col items-center text-center p-6 py-12 md:p-16 pb-0 shadow-2xl">
                {view === "login" ? <Login /> : <Register />}
                <p className="mt-12">By signing in or creating an account, you agree with {" "}
                    <span onClick={() => alert("This section isn't implemented yet!")} className="cursor-pointer underline font-medium">Terms & Conditions</span>
                    {" "}and {" "}
                    <span onClick={() => alert("This section isn't implemented yet!")} className="cursor-pointer underline font-medium">Privacy Policy</span>
                    .
                </p>
                <div className="h-[1px] w-full bg-text-gray mt-12"></div>
                {view === "login" ?
                    <p className="py-8 font-medium">Don't have an account? <span onClick={() => { isPreviousUrl ? navigate("/register/personal") : navigate("/register/business") }} className="text-blue-400 underline cursor-pointer">Sing Up</span></p>
                    :
                    <p className="py-8 font-medium">Already have an account? <span onClick={() => {navigate("/login") }} className="text-blue-400 underline cursor-pointer">Log In</span></p>
                }
            </div>

        </section>
    )
}