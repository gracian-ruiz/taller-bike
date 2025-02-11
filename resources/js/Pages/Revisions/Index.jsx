import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Index({ auth, bike, revisions }) {
    return (
        <AuthenticatedLayout user={auth.user} roles={auth.roles}>
            <div className="p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">🔧 Revisiones de {bike.nombre}</h1>

                <Link href={route("revisions.create", bike.id)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                    ➕ Añadir Revisión
                </Link>

                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Componente</th>
                            <th className="border border-gray-300 p-2">Fecha</th>
                            <th className="border border-gray-300 p-2">Descripción</th>
                            <th className="border border-gray-300 p-2">Próxima Revisión</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revisions.map((revision) => (
                            <tr key={revision.id}>
                                <td className="border border-gray-300 p-2">{revision.componente}</td>
                                <td className="border border-gray-300 p-2">{revision.fecha_revision}</td>
                                <td className="border border-gray-300 p-2">{revision.descripcion}</td>
                                <td className="border border-gray-300 p-2">{revision.proxima_revision || "Sin definir"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
