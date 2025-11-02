import { useState } from "react";
import { Services } from "./components/Service/Services"
import { ServiceForm } from "./components/Service/components/ServiceForm";
import { PencilRuler  } from "lucide-react";

type service = "serviceSection" | "serviceForm"

export const Settings = () => {

    const [currentSection, setCurrentSection] = useState<service>("serviceSection")

    return (
        <div className="flex pt-20 h-full">
            <div className="flex flex-col p-4 ml-4 mt-20 w-[15%]">
                <button className="flex cursor-pointer py-2">
                    <PencilRuler></PencilRuler>
                    <p className="ml-4">dsd</p>
                </button>
                <button className="flex cursor-pointer py-2">
                    <PencilRuler></PencilRuler>
                    <p className="ml-4">dsds</p>
                </button>
                <button className="flex cursor-pointer py-2 group">
                    <PencilRuler className="group-hover:text-blue-600"></PencilRuler>
                    <p className="ml-4 group-hover:text-blue-600">Services</p>
                </button>
            </div>
            <div className="mt-4 w-full h-full">
                {currentSection === "serviceSection" && <Services/>}
                {currentSection === "serviceForm" && <ServiceForm/>}
            </div>
        </div>
    )
}