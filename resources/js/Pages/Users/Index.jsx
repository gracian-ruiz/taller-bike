import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateClient from "./CreateClient"; // 🔹 Importamos el formulario

export default function Index({ auth, users }) {
    const roles = auth.roles || [];
    const [showForm, setShowForm] = useState(false); // 🔹 Controlamos la vista

    return (
        <AuthenticatedLayout user={auth.user} roles={roles}>
            <Head title="Clientes" />

            <div className="p-6 bg-white shadow-md rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Clientes</h1>

                    {roles.includes("admin") && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {showForm ? "Ver Lista" : "Añadir Cliente"}
                        </button>
                    )}
                </div>

                {/* 🔹 Muestra el Formulario o la Tabla */}
                {showForm ? (
                    <CreateClient onClose={() => setShowForm(false)} />
                ) : (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border">ID</th>
                                <th className="py-2 px-4 border">Nombre</th>
                                <th className="py-2 px-4 border">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="text-center">
                                    <td className="py-2 px-4 border">{user.id}</td>
                                    <td className="py-2 px-4 border">{user.name}</td>
                                    <td className="py-2 px-4 border">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
