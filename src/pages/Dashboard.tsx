import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const API_URL = "http://127.0.0.1:8000/users/";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    console.error("Utilisateur non authentifié !");
                    navigate("/login");
                    return;
                }

                const response = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs:", error);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    return (
        <Layout>
            {/* En-tête du Dashboard */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Bienvenue sur le Dashboard</h1>
                <button onClick={handleLogout} className="btn-secondary">
                    Se déconnecter
                </button>
            </div>
            <p className="mt-2 text-gray-400">
                Explorez vos statistiques et optimisez votre collaboration avec l'IA.
            </p>

            {/* Liste des utilisateurs */}
            <div className="mt-6 bg-card p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-white">Utilisateurs inscrits :</h3>
                <ul className="mt-3 space-y-2">
                    {users.length > 0 ? (
                        users.map((user: any) => (
                            <li key={user.id} className="bg-background p-3 rounded-lg">
                                👤 {user.username}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">Aucun utilisateur trouvé.</p>
                    )}
                </ul>
            </div>
        </Layout>
    );
};

export default Dashboard;
