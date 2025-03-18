import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { API_URL } from "../config";

// 🔹 Interface TypeScript pour un appareil
interface IAppareil {
	id: string;
	name: string;
	type: string;
	room: string;
	status: "on" | "off";
}

const Dashboard = () => {
	const [appareils, setAppareils] = React.useState<IAppareil[]>([]);
	const navigate = useNavigate();

	// 🔹 Charger les appareils depuis l'API
	React.useEffect(() => {
		const fetchAppareils = async () => {
			try {
				const response = await axios.get(`${API_URL}/devices`);
				setAppareils(response.data);
			} catch (error) {
				console.error("Erreur lors du chargement des appareils :", error);
			}
		};
		fetchAppareils();
	}, []);

	// 🔹 Fonction de suppression
	const supprimer = async (id: string) => {
		try {
			await axios.delete(`${API_URL}/devices/${id}`);
			setAppareils(appareils.filter((appareil) => appareil.id !== id));
		} catch (error) {
			console.error("Erreur lors de la suppression :", error);
		}
	};

	return (
		<Layout>
			<div className="max-w-4xl mx-auto mt-6">
				<h1 className="text-3xl font-bold text-primary text-center mb-6">
					Liste des Appareils
				</h1>

				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse border border-gray-600">
						<thead>
							<tr className="bg-gray-800 text-white">
								<th className="p-3 border border-gray-600">Nom</th>
								<th className="p-3 border border-gray-600">Type</th>
								<th className="p-3 border border-gray-600">Pièce</th>
								<th className="p-3 border border-gray-600">Statut</th>
								<th className="p-3 border border-gray-600 text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{appareils.length > 0 ? (
								appareils.map((appareil) => (
									<tr key={appareil.id} className="border border-gray-600 text-white">
										<td className="p-3 border border-gray-600">{appareil.name}</td>
										<td className="p-3 border border-gray-600">{appareil.type}</td>
										<td className="p-3 border border-gray-600">{appareil.room}</td>
										<td className="p-3 border border-gray-600">
											<span
												className={`px-3 py-1 rounded-lg ${appareil.status === "on"
													? "bg-green-600 text-white"
													: "bg-red-600 text-white"
													}`}
											>
												{appareil.status === "on" ? "Allumé" : "Éteint"}
											</span>
										</td>
										<td className="p-3 border border-gray-600 flex gap-2 justify-center">
											<button
												className="px-3 py-1 bg-green-700 hover:bg-green-800 text-white rounded-lg"
												onClick={() => navigate(`/add/${appareil.id}`)}
											>
												Modifier
											</button>
											<button
												className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white rounded-lg"
												onClick={() => supprimer(appareil.id)}
											>
												Supprimer
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="p-4 text-center text-gray-400">
										Aucun appareil trouvé.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
