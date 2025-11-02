import { Search, Dot, ArrowRight } from "lucide-react";
import { useData } from "../../../../../../AppRouter";

export const Services = () => {

    const { serviceData } = useData();

    return (
        <div className="flex flex-col items-center bg-gray-100 h-full">
            <div className=" bg-white w-full px-6 ">
                <div className="flex justify-between items-center w-full ">
                    <h1 className="text-2xl font-bold">Services</h1>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-blue-600 duration-200">ADD NEW SERVICE</button>
                </div>
                <div className="flex border border-gray-300 w-full mt-6 mb-6 p-2 ">
                    <Search className="text-gray-300" />
                    <input type="text" placeholder="Search" className="ml-2 w-full outline-0" />
                </div>
            </div>
            <ul className="w-full mt-6 flex flex-col items-center ">
                {serviceData.map((e) => (
                    <li key={e.id} className="flex my-2 w-[90%] bg-white p-4 items-center rounded-2xl cursor-pointer">
                        <div className="border border-black w-12 h-12 rounded-2xl flex items-center justify-center">
                            <p className="text-gray-500 font-bold">{e.name.slice(0, 2)}</p>
                        </div>
                        <div className="ml-8">
                            <div>
                                <p className="font-bold ">{e.name}</p>
                            </div>
                            <div className="flex">
                                <p>{e.duration / 3600} hours</p>
                                <Dot className="mx-2" />
                                <p className="">{e.price}$</p>
                            </div>
                        </div>
                        <ArrowRight className="ml-auto" />
                    </li>
                ))}
            </ul>

        </div>
    )
}