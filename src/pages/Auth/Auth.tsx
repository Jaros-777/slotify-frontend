import { useNavigate } from "react-router-dom";
import { Login } from "./components/Login"
import { Register } from "./components/Register"

type AuthProps = {
    view: "login" | "register";
}



export const Auth = ({ view }: AuthProps) => {

    const navigate = useNavigate()

    return (
        <section className=" min-h-screen bg-gray-200 flex flex-col items-center">
            <div className="my-34 bg-white w-[40rem] h-auto flex flex-col items-center text-center p-16 pb-0 shadow-2xl">
                {view === "login" ? <Login /> : <Register />}
                <p className="mt-12">By signing in or creating an account, you agree with {" "}
                    <span onClick={() => navigate("/terms-and-conditions")} className="cursor-pointer underline font-medium">Terms & Conditions</span>
                    {" "}and {" "}
                    <span onClick={() => navigate("/privacy-policy")} className="cursor-pointer underline font-medium">Privacy Policy</span>
                    .
                </p>
                <div className="h-[1px] w-full bg-text-gray mt-12"></div>
                {view === "login" ?
                    <p className="py-8 font-medium">Don't have an account? <span onClick={() => navigate("/register")} className="text-blue-400 underline cursor-pointer">Sing Up</span></p>
                    :
                    <p className="py-8 font-medium">Already have an account? <span onClick={() => navigate("/login")} className="text-blue-400 underline cursor-pointer">Log In</span></p>
                }
            </div>

        </section>
    )
}