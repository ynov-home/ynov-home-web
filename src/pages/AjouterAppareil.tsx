import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const AjouterAppareil = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [room, setRoom] = useState("");
	const [status, setStatus] = useState("off");
	const [error, setError] = useState("");

	useEffect(() => {
		if (!id) return;

		const fetchAppareil = async () => {
			try {
				console.log("📡 Récupération des données de l'appareil :", id);
				const response = await axios.get(`${API_URL}/devices/${id}`);
				const appareil = response.data;

				setName(appareil.name);
				setType(appareil.type);
				setRoom(appareil.room);
				setStatus(appareil.status);
			} catch (error) {
				console.error("Erreur lors du chargement de l'appareil :", error);
				setError("Impossible de charger l'appareil.");
			}
		};

		fetchAppareil();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			let response;
			if (id) {
				response = await axios.put(`${API_URL}/devices/${id}`, { name, type, room, status });
			} else {
				response = await axios.post(`${API_URL}/devices`, { name, type, room, status });
			}

			console.log("Réponse API :", response.data);
			navigate("/");
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				console.error("Erreur API Axios :", err.response);
				setError(err.response?.data?.message || "Problème lors de la sauvegarde de l'appareil.");
			} else {
				console.error("Erreur inconnue :", err);
				setError("Une erreur inconnue est survenue.");
			}
		}
	};

	return (
		<Layout>
			<div className="flex items-center justify-center min-h-screen bg-background">
				<div className="bg-card p-8 rounded-lg shadow-lg w-96">
					<h1 className="text-3xl font-bold text-primary text-center mb-6">
						{id ? `Modifier ${name}` : "Ajouter un appareil"}
					</h1>

					{error && <p className="text-red-500 text-sm text-center">{error}</p>}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-gray-300 text-sm font-medium mb-1">
								Nom de l'appareil :
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
							/>
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-1">
								Type :
							</label>
							<input
								type="text"
								value={type}
								onChange={(e) => setType(e.target.value)}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
							/>
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-1">
								Pièce :
							</label>
							<input
								type="text"
								value={room}
								onChange={(e) => setRoom(e.target.value)}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
							/>
						</div>

						<div>
							<label className="block text-gray-300 text-sm font-medium mb-1">
								Statut :
							</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
							>
								<option value="on">Allumé</option>
								<option value="off">Éteint</option>
							</select>
						</div>

						<button
							type="submit"
							className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
						>
							{id ? "Modifier" : "Créer"}
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default AjouterAppareil;
