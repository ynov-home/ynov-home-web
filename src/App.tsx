import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { AjouterAppareil } from "./pages/AjouterAppareil";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/dashboard"
					index
					element={<Dashboard />}
				/>
				<Route
					path="/dashboard/add"
					element={<AjouterAppareil />}
				/>
				<Route
					path="/dashboard/add/:id"
					element={<AjouterAppareil />}
				/>
				{/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}

				{/* <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}
			</Routes>
		</Router>
	);
}

export default App;
