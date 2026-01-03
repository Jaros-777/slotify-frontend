import { Search } from "lucide-react"
import { useCheckIsLogged } from "../utlis/checkIsLoged";
import { LoadingPage } from "../../../../LoadingPage";
import { useEffect, useState } from "react";
import type { clientType } from "./types/clientType";
import axios from "axios";

export const Client = () => {

	const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");
	const [clientData, setClientData] = useState<clientType[]>([
		{
			id: 0,
			name: "Jan Kowalski",
			email: "email@email.com",
			phone: "123123123"
		},
		{
			id: 1,
			name: "Jan Kowalski",
			email: "email@email.com",
			phone: "123123123"
		},
		{
			id: 2,
			name: "Jan Kowalski",
			email: "email@email.com",
			phone: "123123123"
		}
	])

	const fetchData = async (token:string) => {
		// await axios.get(`${import.meta.env.VITE_APP_URL}/availability`,
		// 	{
		// 		headers: {
		// 			'Authorization': `Bearer ${token}`
		// 		}
		// 	}
		// ).then(response => {
		// 	console.log(response)
		// }).catch(function (error) {
		// 	console.log(error)
		// })
	}

	useEffect(() => {
		(async () => {
			const token = await checkIsLogged();
			if(token)
				fetchData(token)
		})();
	}, []);

	if (isAuthLoading) {
		return <LoadingPage text="Checking authentication..." ></LoadingPage>;
	}

	return (
		<div className="bg-gray-200 flex justify-center min-w-250">
			<div className="bg-white p-4 mt-10 h-40">
				<div className="border border-gray-300 rounded-md flex p-2">
					<Search className="mr-2"></Search>
					<input type="text" placeholder="Search client" className="outline-none" />
				</div>
				<p className="font-medium mt-4">IMPORT CLIENTS</p>
				<div className="mt-2">
					<button className="bg-gray-300 rounded-md px-4 py-2 cursor-pointer duration-200 hover:bg-gray-200">CSV</button>
				</div>
			</div>
			<div className="mt-10 w-3/4 p-4">
				<div className="flex justify-between">
					<p className="text-2xl font-medium">Clients</p>
					<button className="bg-blue-500 px-4 py-2 rounded-md text-white duration-200 cursor-pointer hover:bg-blue-600">New client</button>
				</div>
				<ul className="grid grid-cols-2 gap-2 mt-4">
					{clientData.map(e => (
						<li key={e.id} className="bg-white p-4 border border-gray-300 rounded-md flex cursor-pointer duration-200 hover:bg-gray-200">
							<div className="bg-red-500 h-20 w-20 rounded-md text-white flex items-center justify-center">
								<p className="text-4xl">{e.name.slice(0, 2)}</p>
							</div>
							<div className="ml-4">
								<p className="font-medium">{e.name}</p>
								<p>{e.email}</p>
								<p>{e.phone}</p>
							</div>
						</li>
					))}

				</ul>
			</div>
		</div>
	)
}