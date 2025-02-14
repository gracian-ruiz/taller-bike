import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router } from "@inertiajs/react";

export default function Create({ auth, bike, componentes }) { // 🔹 Recibir `componentes`
    const { data, setData, post, processing, reset } = useForm({
        bike_id: bike.id,
        componente_id: "",  // Cambiamos `componente` a `componente_id`
        fecha_revision: "",
        descripcion: "",
        proxima_revision: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        post(route("revisions.store", { bike: bike.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                router.reload(); // 🔄 Recargar datos sin recargar la página
            },
            onError: (errors) => {
                console.error("❌ Error en la creación de la revisión:", errors);
            },
        });
    };
    

    return (
        <AuthenticatedLayout user={auth.user} roles={auth.roles}>
            <div className="p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">➕ Añadir Revisión para {bike.nombre}</h1>

                <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md">
                    {/* Seleccionar Componente */}
                    <div className="mb-3">
                        <label className="block font-medium text-gray-700">Componente Revisado</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={data.componente_id}
                            onChange={(e) => setData("componente_id", e.target.value)}
                            required
                        >
                            <option value="">Selecciona un componente</option>
                            {componentes.map((componente) => (
                                <option key={componente.id} value={componente.id}>
                                    {componente.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium text-gray-700">Fecha de Revisión</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={data.fecha_revision}
                            onChange={(e) => setData("fecha_revision", e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium text-gray-700">Descripción</label>
                        <textarea
                            className="w-full p-2 border rounded"
                            value={data.descripcion}
                            onChange={(e) => setData("descripcion", e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium text-gray-700">Fecha Próxima Revisión (Opcional)</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={data.proxima_revision}
                            onChange={(e) => setData("proxima_revision", e.target.value)}
                        />
                    </div>

                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={processing}>
                        Guardar Revisión
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
