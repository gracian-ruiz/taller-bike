import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreateClient from "./CreateClient"; // 👈 Importar correctamente

export default function Index({ auth, users }) {
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    const handleEdit = (client) => {
        console.log("Editando cliente:", client); // 🔹 Verificar en consola si pasa correctamente
        setEditingClient(client);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm("¿Seguro que deseas eliminar este cliente?")) {
            router.delete(route("clients.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => {
                        setEditingClient(null); // Resetea para añadir un nuevo
                        setShowForm(true);
                    }}
                >
                    Añadir Cliente
                </button>

                {showForm && <CreateClient client={editingClient} onClose={() => setShowForm(false)} />} {/* 🔹 Aquí pasamos los datos si es edición */}

                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Nombre</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 p-2">{user.name}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2 flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
