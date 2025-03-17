import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";


export const api = axios.create({
    baseURL: API_URL, // url du backend déclaré en haut
    headers: {
        "Content-Type": "application/json"
    }
});

// Fonction pour la connexion JWT
export const login = async (username: string, password: string) => {
    try {
        const response = await api.post("/auth/api/token/", { username, password });
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        return response.data;
    } catch (error) {
        console.error("Erreur de connexion:", error);
        throw error;
    }
};
// deconnexion
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// Fonction pour récupérer les utilisateurs (protégé par JWT)
export const getUsers = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Utilisateur non authentifié");

    const response = await api.get("/users/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
