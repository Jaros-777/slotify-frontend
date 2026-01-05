import { Search } from "lucide-react"
import { useCheckIsLogged } from "../utlis/checkIsLoged";
import { LoadingPage } from "../../../../LoadingPage";
import { useEffect, useState } from "react";
import type { clientType } from "./types/clientType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { clientDetailsAndHistoryType } from "./types/clientDetailsAndHistoryType";
import { useData } from "../../../../AppRouter";


const colors = [
	"red",
	"blue",
	"purple",
	"green"
]

export const Client = () => {

	const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");
	const [clientData, setClientData] = useState<clientType[]>([])
	const [fliteredByText, setFilteredByText] = useState<string>("")
	const [filteredClientsList, setFilteredClientList] = useState<clientType[]>(clientData)
	const navigate = useNavigate();
	const { userToken } = useData()

	const fetchData = async (token: string) => {
		await axios.get(`${import.meta.env.VITE_APP_URL}/admin/client/all`,
			{
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}
		).then(response => {
			setClientData(response.data)
			setFilteredByText("")
			setFilteredClientList(response.data)
		}).catch(function (error) {
			console.log(error)
		})
	}

	const filterClients = (text: string) => {
		const filtered = clientData.filter(client =>
			client.name.toLowerCase().startsWith(text.toLowerCase())
		);
		setFilteredClientList(filtered);
	}

	const formatDate = (date: Date) =>
		`${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

	const formatTime = (date: Date) =>
		`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

	const exportAllClientsHistoryCSV = async () => {

		let allData: clientDetailsAndHistoryType[] = [];

		try {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_URL}/admin/client/all/with-reservations`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			allData = response.data;
		} catch (error) {
			console.error(error);
			return;
		}

		if (allData.length === 0) return;

		const headers = [
			"Client ID",
			"Name",
			"Email",
			"Phone",
			"Service name",
			"Date",
			"Start",
			"End",
		];

		const rows = allData.flatMap(client =>
			client.historyDTO.map(history => {
				const start = new Date(history.startDate);
				const end = new Date(history.endDate);

				return [
					client.clientId,
					client.clientName,
					client.clientEmail,
					client.clientPhone,
					history.serviceName,
					formatDate(start),
					formatTime(start),
					formatTime(end),
				].join(",");
			})
		);

		if (rows.length === 0) return;

		const csvContent = [headers.join(","), ...rows].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);

		const date = new Date();
		link.download = `Clients_${formatDate(date)}.csv`;

		link.click();
		URL.revokeObjectURL(link.href);
	};

	useEffect(() => {
		(async () => {
			const token = await checkIsLogged();
			if (token)
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
					<input
						value={fliteredByText}
						onChange={(e) => { setFilteredByText(e.target.value), filterClients(e.target.value) }}
						type="text"
						placeholder="Search client"
						className="outline-none" />
				</div>
				<p className="font-medium mt-4">IMPORT CLIENTS</p>
				<div className="mt-2">
					<button
						onClick={() => exportAllClientsHistoryCSV()}
						className="bg-gray-300 rounded-md px-4 py-2 cursor-pointer font-medium duration-200 hover:bg-gray-200"
					>CSV</button>
				</div>
			</div>
			<div className="mt-10 w-3/4 p-4">
				<p className="text-2xl font-medium">Clients ({filteredClientsList.length})</p>
				<ul className="grid grid-cols-2 gap-2 mt-4">
					{filteredClientsList.map(e => {
						const bgColor = colors[Math.floor(Math.random() * colors.length)];
						return (
							<li key={e.id} className="bg-white p-4 border border-gray-300 rounded-md flex cursor-pointer duration-200 hover:bg-gray-200" onClick={() => navigate(`/admin/client/${e.id}`)}>
								<div
									style={{ backgroundColor: bgColor }}
									className="h-20 w-20 rounded-md text-white flex items-center justify-center">
									<p className="text-4xl">{e.name.slice(0, 2)}</p>
								</div>
								<div className="ml-4">
									<p className="font-medium">{e.name}</p>
									<p>{e.email}</p>
									<p>{e.phone}</p>
								</div>
							</li>
						)
					})}

				</ul>
			</div>
		</div>
	)
}