import { useEffect, useState } from "react";
import { getDevices, addDevice, updateDevice, deleteDevice } from "../services/deviceService";

const DeviceManager = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        const data = await getDevices();
        setDevices(data);
    };

    const handleAdd = async () => {
        const newDevice = { name: "Nouveau Appareil", type: "capteur", status: "on" };
        const addedDevice = await addDevice(newDevice);
        setDevices([...devices, addedDevice]);
    };

    const handleUpdate = async (id) => {
        const updatedDevice = { name: "Appareil Modifié", type: "capteur", status: "off" };
        const result = await updateDevice(id, updatedDevice);
        setDevices(devices.map((dev) => (dev.id === id ? result : dev)));
    };

    const handleDelete = async (id) => {
        await deleteDevice(id);
        setDevices(devices.filter((dev) => dev.id !== id));
    };

    return (
        <div>
            <h2>Gestion des Appareils</h2>
            <button onClick={handleAdd}>Ajouter un appareil</button>
            {devices.map((device) => (
                <div key={device.id}>
                    <span>{device.name} - {device.type} - {device.status}</span>
                    <button onClick={() => handleUpdate(device.id)}>Modifier</button>
                    <button onClick={() => handleDelete(device.id)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
};

export default DeviceManager;
