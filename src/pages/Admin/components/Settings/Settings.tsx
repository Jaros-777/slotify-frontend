import { useState } from "react";
import { Services } from "./components/Service/Services"
import { ServiceForm } from "./components/Service/components/ServiceForm";
import { PencilRuler  } from "lucide-react";

type service = "serviceSection" | "serviceForm"

export const Settings = () => {

    const [currentSection, setCurrentSection] = useState<service>("serviceForm")

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
            <div className="w-full h-full bg-gray-200">
                {currentSection === "serviceSection" && <Services/>}
                {currentSection === "serviceForm" && <ServiceForm/>}
            </div>
        </div>
    )
}