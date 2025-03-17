import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { IAppareil } from "./Assets/IAppareil";

const API_URL = "LLL";
const url = `${API_URL}/dashboard`;

const Dashboard = () => {
	const [appareils, setAppareils] = useState<IAppareil[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAppareils = async () => {
			try {
				const response = await axios.get(url);
				setAppareils(response.data);
			} catch (error) {
				console.error("Erreur lors du chargement des utilisateurs:", error);
			}
		};

		fetchAppareils();
	}, []);

	const supprimer = async (id: number) => {
		try {
			await axios.delete(`${url}/${id}`);
			setAppareils(appareils.filter((appareil) => appareil.id !== id));
		} catch (error) {
			console.error("Erreur lors de la suppression de l'appareil:", error);
		}
	};

	return (
		<Layout>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold text-primary">
					Bienvenue sur le Dashboard
				</h1>
			</div>
			<p className="mt-2 text-gray-400">Manipulez votre maison autrement</p>

			<div className="mt-6 bg-card p-6 rounded-lg shadow-lg">
				<h3 className="text-xl font-semibold text-white">
					Appareil enregistrer :
				</h3>
				<ul className="mt-3 space-y-2">
					{appareils.length > 0 ? (
						appareils.map((appareil: IAppareil) => (
							<li
								key={appareil.id}
								className="bg-background p-3 rounded-lg"
							>
								{appareil.room}
								{appareil.type}
								{appareil.name}
								{appareil.status}

								<a
									className="p-2 rounded text-center bg-lime-800"
									href={`/AjouterAppareil?id=${appareil.id}`}
								>
									Modifier
								</a>
								<button
									className="p-2 rounded text-center bg-red-900"
									onClick={() => supprimer(appareil.id)}
								>
									Supprimer
								</button>
							</li>
						))
					) : (
						<p className="text-gray-500">Aucun appareil n'était trouvé.</p>
					)}
				</ul>
			</div>
		</Layout>
	);
};

export default Dashboard;
