import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Définition de l'URL de l'API JWT
const API_URL = "http://127.0.0.1:8000/auth/api/token/";

const Login = () => {
    const [username, setUsername] = useState<string>(""); // Modification : email -> username
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Réinitialisation de l'erreur

        try {
            const response = await axios.post(API_URL, { username, password });

            // Stocker le token
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            // Redirection vers Dashboard
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Erreur API:", err.response); // Voir l'erreur exacte dans la console

            if (err.response) {
                setError(err.response.data.detail || "Identifiants incorrects.");
            } else {
                setError("Impossible de se connecter au serveur.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-card p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold text-primary text-center mb-6">Se connecter</h1>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Se connecter
                    </button>
                </form>
                <a
                    href="http://127.0.0.1:8000/oauth/login/github/"
                    className="block w-full text-center mt-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out">
                    Se connecter avec GitHub
                </a>

                <p className="text-gray-400 text-sm text-center mt-4">
                    Pas encore de compte ? <a href="/signup" className="text-primary hover:underline">Inscrivez-vous</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
