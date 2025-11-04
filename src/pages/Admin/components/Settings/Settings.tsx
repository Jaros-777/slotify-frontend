import { useEffect, useState } from "react";
import { Services } from "./components/Service/Services"
import { PencilRuler  } from "lucide-react";
import { useCheckIsLogged } from "../utlis/checkIsLoged";

type sectionTypes = "serviceSection"

export const Settings = () => {

    const {checkIsLogged, isAuthLoading} = useCheckIsLogged();
    const [currentSection, setCurrentSection] = useState<sectionTypes>("serviceSection")

    useEffect(() => {
    
            (async () => {
                await checkIsLogged()
            })();
        }, [])

    if (isAuthLoading) {
        return <p className="mt-20">Checking authentication...</p>;
    }

    return (
        <div className="flex pt-20 min-h-full">
            <div className="flex flex-col p-4 ml-4 pt-20 w-46 border-r-1 border-gray-300">
                <button className="flex cursor-pointer py-2 group">
                    <PencilRuler className="group-hover:text-blue-600"></PencilRuler>
                    <p className="ml-4 group-hover:text-blue-600">Setting 1</p>
                </button>
                <button className="flex cursor-pointer py-2 group">
                    <PencilRuler className="group-hover:text-blue-600"></PencilRuler>
                    <p className="ml-4 group-hover:text-blue-600">Setting 2</p>
                </button>
                <button className="flex cursor-pointer py-2 group">
                    <PencilRuler className="group-hover:text-blue-600"></PencilRuler>
                    <p className="ml-4 group-hover:text-blue-600">Services</p>
                </button>
            </div>
            <div className="w-full min-h-full bg-gray-200">
                {currentSection === "serviceSection" && <Services/>}
            </div>
        </div>
    )
}