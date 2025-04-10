import { API_URL } from "../config";

// Définition du type Device
export interface Device {
    id?: string;
    name: string;
    type: string;
    status: string;
}

export const getDevices = async (): Promise<Device[]> => {
    const response = await fetch(`${API_URL}/devices`);
    return response.json();
};

export const addDevice = async (device: Device): Promise<Device> => {
    const response = await fetch(`${API_URL}/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(device),
    });
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
