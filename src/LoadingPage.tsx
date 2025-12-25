import {LoaderCircle } from "lucide-react"

interface textProps{
    text:string
}

export const LoadingPage = ({text}:textProps)=>{

    return(
        <div className="w-full h-full flex flex-col items-center justify-center">
            <LoaderCircle className="animate-spin h-40 w-40"></LoaderCircle>
            <p className="mt-6 text-2xl">{text}</p>
        </div>
    )
}