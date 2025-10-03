import { useNavigate } from "react-router-dom"


export const NotFound = () => {
    const navigate = useNavigate()

    return (
        <section className="mt-34 flex flex-col items-center">
            <h1 className="text-[20rem]">404</h1>
            <h3 className="text-5xl">We apologize, but this page doesn’t exist.</h3>
            <p className="mt-16">Oh. We are sorry, but we can’t find the page you are looking for. Go back to Home or to the previous page. </p>
            <button onClick={() => navigate("/")} className="mt-12 bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600 duration-200">BACK TO HOME</button>
        </section>
    )
}