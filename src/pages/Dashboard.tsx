import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { IAppareil } from "./Assets/IAppareil";
import dotenv from "dotenv";
dotenv.config();

const url = `${process.env.API_URL}/dashboard`;

const Dashboard = () => {
	const [appareils, setAppareils] = useState([]);
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
