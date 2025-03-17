import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { IAppareil } from "./Assets/IAppareil";

const API_URL = "http://127.0.0.1:8000/appareils/";

const Dashboard = () => {
	const [appareils, setAppareils] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(API_URL);
				setAppareils(response.data);
			} catch (error) {
				console.error("Erreur lors du chargement des utilisateurs:", error);
			}
		};

		fetchUsers();
	}, [navigate]);

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
								{appareil.locaton}
								{appareil.type}
								{appareil.name}
								{appareil.statut}
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
