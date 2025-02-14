import { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreateComponent from "./CreateComponent";

export default function Index({ auth, components }) {
    

    const [showForm, setShowForm] = useState(false);
    const [editingComponent, setEditingComponent] = useState(null);

    const handleEdit = (component) => {
        setEditingComponent(component);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm("¿Seguro que deseas eliminar este componente?")) {
            router.delete(route("components.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} roles={auth.roles}>
            <div className="p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">⚙️ Gestión de Componentes</h1>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => {
                        setEditingComponent(null); // Modo crear nuevo
                        setShowForm(true);
                    }}
                >
                    ➕ Añadir Componente
                </button>

                {showForm && (
                    <CreateComponent component={editingComponent} onClose={() => setShowForm(false)} />
                )}

                {/* Tabla de componentes */}
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Nombre</th>
                            <th className="border border-gray-300 p-2">Fecha de Preaviso</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.map((component) => (
                            <tr key={component.id}>
                                <td className="border border-gray-300 p-2">{component.nombre}</td>
                                <td className="border border-gray-300 p-2">
                                    {component.fecha_preaviso || "No definida"}
                                </td>
                                <td className="border border-gray-300 p-2 flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleEdit(component)}
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(component.id)}
                                    >
                                        🗑️ Eliminar
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
