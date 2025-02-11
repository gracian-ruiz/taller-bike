import { useState } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ auth, bikes, users }) { // 🔹 Ahora recibimos `users`
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        user_id: "",
        nombre: "",
        marca: "",
        anio_modelo: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("bikes.store"), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}  roles={auth.roles}>
            <div className="p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">🚴‍♂️ Gestión de Bicicletas</h1>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cerrar Formulario" : "Añadir Bicicleta"}
                </button>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md">
                        {/* Seleccionar Usuario */}
                        <div className="mb-3">
                            <label className="block font-medium text-gray-700">Asignar a Usuario</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.user_id}
                                onChange={(e) => setData("user_id", e.target.value)}
                                required
                            >
                                <option value="">Selecciona un usuario</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Nombre de la bicicleta */}
                        <div className="mb-3">
                            <label className="block font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={data.nombre}
                                onChange={(e) => setData("nombre", e.target.value)}
                                required
                            />
                        </div>

                        {/* Marca */}
                        <div className="mb-3">
                            <label className="block font-medium text-gray-700">Marca</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={data.marca}
                                onChange={(e) => setData("marca", e.target.value)}
                                required
                            />
                        </div>

                        {/* Año Modelo */}
                        <div className="mb-3">
                            <label className="block font-medium text-gray-700">Año Modelo</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={data.anio_modelo}
                                onChange={(e) => setData("anio_modelo", e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={processing}>
                            Guardar Bicicleta
                        </button>
                    </form>
                )}

                {/* Lista de bicicletas */}
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Usuario</th>
                            <th className="border border-gray-300 p-2">Nombre</th>
                            <th className="border border-gray-300 p-2">Marca</th>
                            <th className="border border-gray-300 p-2">Año</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bikes.map((bike) => (
                            <tr key={bike.id}>
                                <td className="border border-gray-300 p-2">{bike.user.name}</td>
                                <td className="border border-gray-300 p-2">{bike.nombre}</td>
                                <td className="border border-gray-300 p-2">{bike.marca}</td>
                                <td className="border border-gray-300 p-2">{bike.anio_modelo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
