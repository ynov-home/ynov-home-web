import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

    const token = localStorage.getItem("access_token");

    return token ? <Outlet /> : <Navigate to='login' replace />
    // replace empêche l'utilisateur de revenir en arrière après la redirection
}

export default PrivateRoute;
