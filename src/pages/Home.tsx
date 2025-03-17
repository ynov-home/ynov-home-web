import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text px-6">
            {/* Titre animé */}
            <h1 className="text-5xl font-bold text-primary animate-pulse text-center">
                🚀 Bienvenue sur AI Pairing
            </h1>

            {/* Sous-titre */}
            <p className="text-gray-400 text-lg text-center mt-4 max-w-2xl">
                Une plateforme innovante qui utilise l'intelligence artificielle pour
                optimiser la collaboration et la productivité des développeurs.
                Trouvez vos binômes idéaux pour coder plus efficacement !
            </p>



            {/* Boutons d'action */}
            <div className="mt-6 flex space-x-4">
                <Link
                    to="/signup"
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    S'inscrire
                </Link>
                <Link
                    to="/login"
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                    Se connecter
                </Link>
            </div>
        </div>
    );
};

export default Home;
