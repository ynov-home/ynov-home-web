import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://127.0.0.1:8000/auth/api/register/"; // ✅ URL corrigée

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            console.log("📢 Envoi des données :", { username, email, password });
            const response = await axios.post(API_URL, { username, email, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log("✅ Inscription réussie :", response.data);
            navigate("/login");
        } catch (err: any) {
            console.error("❌ Erreur lors de l'inscription :", err);
            if (err.response && err.response.data) {
                const errorMessage = err.response.data.detail || JSON.stringify(err.response.data);
                setError(errorMessage);
            } else {
                setError("Impossible de se connecter au serveur.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-card p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold text-primary text-center mb-6">Créer un compte</h1>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-1">
                            Nom d'utilisateur :
                        </label>
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
                        <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">
                            Email :
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">
                            Mot de passe :
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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-1">
                            Confirmer le mot de passe :
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        S'inscrire
                    </button>
                </form>

                <p className="text-gray-400 text-sm text-center mt-4">
                    Déjà un compte ? <a href="/login" className="text-primary hover:underline">Connectez-vous</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
