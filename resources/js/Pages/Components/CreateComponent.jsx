import { useEffect } from "react";
import { useForm, router } from "@inertiajs/react"; 


export default function CreateComponent({ component, onClose }) {
    const { data, setData, post, put, processing, reset } = useForm({
        nombre: component?.nombre || "",
        fecha_preaviso: component?.fecha_preaviso || "",
    });

    // Cargar datos en el formulario cuando se edita un componente
    useEffect(() => {
        if (component) {
            setData({
                nombre: component.nombre,
                fecha_preaviso: component.fecha_preaviso || "",
            });
        }
    }, [component]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (component) {
            // Editar componente
            put(route("components.update", component.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                    router.reload(); // 🔄 Recargar la lista después de actualizar
                },
            });
        } else {
            // Crear nuevo componente
            post(route("components.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
                onError: (errors) => {
                    console.error("❌ Error al crear componente:", errors);
                },
            });
        }
    };

    return (
        <div className="p-4 bg-gray-50 border rounded">
            <h2 className="text-xl font-bold mb-3">
                {component ? "✏️ Editar Componente" : "➕ Nuevo Componente"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block font-medium text-gray-700">Nombre del Componente</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.nombre}
                        onChange={(e) => setData("nombre", e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="block font-medium text-gray-700">Fecha de Preaviso</label>
                    <input
                        type="string"
                        className="w-full p-2 border rounded"
                        value={data.fecha_preaviso}
                        onChange={(e) => setData("fecha_preaviso", e.target.value)}
                    />
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={processing}>
                        {component ? "Actualizar Componente" : "Guardar Componente"}
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
