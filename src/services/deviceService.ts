import { API_URL } from "../config";
import { Device } from "../types";


export const getDevices = async (): Promise<Device[]> => {
    const response = await fetch(`${API_URL}/devices`);
    return response.json();
};

export const addDevice = async (device: Device): Promise<Device> => {  // ✅ Ajout du type Device
    console.log(" Envoi de l'appareil au backend :", device);

    const response = await fetch(`${API_URL}/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(device),
    });

    console.log(" Réponse HTTP :", response.status);
    return response.json();
};



export const updateDevice = async (id: string, device: Device): Promise<Device> => {
    const response = await fetch(`${API_URL}/devices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(device),
    });
    return response.json();
};

export const deleteDevice = async (id: string): Promise<void> => {
    await fetch(`${API_URL}/devices/${id}`, { method: "DELETE" });
};
