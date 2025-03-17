import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IAppareil } from "./Assets/IAppareil";

const API_URL = "LLL";

const url = `${API_URL}/add`;
const url_appareil = `${API_URL}/`;

export const AjouterAppareil = () => {
	const { id } = useParams();
	const [appareil, setAppareil] = useState<IAppareil | null>();
	const [name, setName] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [room, setRoom] = useState<string>("");
	const [status, _] = useState<string>("off");
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAppareil = async () => {
			try {
				const response = await axios.get(`${url_appareil}/${id}`);
				setAppareil(response.data);
			} catch (error) {
				console.error("Erreur lors du chargement de l'appareil:", error);
			}
		};

		fetchAppareil();
	}, [id]);

	const ajouterAppareil = async () => {
		try {
			const response = await axios.post(url, { name, type, room, status });

			if (response.status === 400) {
				setError("Un problème est survenu");
				return;
			}

			navigate("/dashboard");
		} catch (err: any) {
			console.error("Erreur API:", err.response); // Voir l'erreur exacte dans la console

			if (err.response) {
				setError(
					err.response.data.detail ||
						"Problème lors de la création de l'appareil."
				);
			} else {
				setError("Impossible de se connecter au serveur.");
			}
		}
	};

	return (
		<Layout>
			<div className="flex items-center justify-center min-h-screen bg-background">
				<div className="bg-card p-8 rounded-lg shadow-lg w-96">
					<h1 className="text-3xl font-bold text-primary text-center mb-6">
						{appareil ? `Modifier ${appareil.name}` : "Ajouter un appareil"}
					</h1>

					{error && <p className="text-red-500 text-sm text-center">{error}</p>}

					<form
						onSubmit={ajouterAppareil}
						className="space-y-4"
					>
						<div>
							<label
								htmlFor="name"
								className="block text-gray-300 text-sm font-medium mb-1"
							>
								Nom de l'appareil :
							</label>
							<input
								type="text"
								id="nom"
								value={appareil ? appareil.name : name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div>
							<label
								htmlFor="type"
								className="block text-gray-300 text-sm font-medium mb-1"
							>
								Type de l'appareil :
							</label>
							<input
								type="text"
								id="type"
								value={appareil ? appareil.type : type}
								onChange={(e) => setType(e.target.value)}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<div>
							<label
								htmlFor="room"
								className="block text-gray-300 text-sm font-medium mb-1"
							>
								Pièce :
							</label>
							<input
								type="text"
								id="room"
								value={appareil ? appareil.room : room}
								onChange={(e) => setRoom(e.target.value)}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
						>
							Créer
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
};
