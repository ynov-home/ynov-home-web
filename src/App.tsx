import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AjouterAppareil from "./pages/AjouterAppareil";
import Devices from "./pages/Devices";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/add" element={<AjouterAppareil />} /> {/* ✅ Page d'ajout (sans ID) */}
				<Route path="/devices" element={<Devices />} />
				<Route path="/add/:id" element={<AjouterAppareil />} /> {/* ✅ Page de modification (avec ID) */}
			</Routes>
		</Router>
	);
}

export default App;
