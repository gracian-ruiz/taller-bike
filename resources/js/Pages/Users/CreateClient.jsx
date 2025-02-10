import { useEffect } from "react";
import { useForm, router } from "@inertiajs/react"; // 🔹 Asegura que `router` está importado

export default function CreateClient({ client, onClose }) {
    const { data, setData, post, put, processing, reset } = useForm({
        name: client?.name || "",
        email: client?.email || "",
        password: "",
        password_confirmation: "",
    });

    // 🔹 Cargar datos al formulario cuando es edición
    useEffect(() => {
        if (client) {
            setData({
                name: client.name,
                email: client.email,
                password: "", // No mostramos la contraseña en edición
                password_confirmation: "",
                _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content'), // 🔹 CSRF Token
            });
        }
    }, [client]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (client) {
            put(route("clients.update", client.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                    router.reload(); // 🔄 Recargar clientes después de actualizar
                },
            });
        }else {
            post(route("clients.store"), {
                preserveScroll: true,
                onSuccess: (response) => {
                    console.log("✅ Cliente creado con éxito:", response);
                    reset();
                    onClose();
                },
                onError: (errors) => {
                    console.error("❌ Error en la creación:", errors);
                },
            });
        }
    };
    
    return (
        <div className="p-4 bg-gray-50 border rounded">
            <h2 className="text-xl font-bold mb-3">
                {client ? "Editar Cliente" : "Nuevo Cliente"}
            </h2>

            <form onSubmit={handleSubmit}>
            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                <div className="mb-3">
                    <label className="block font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="block font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                </div>

                {!client && ( // 🔹 Solo pedir contraseña si es un nuevo cliente
                    <>
                        <div className="mb-3">
                            <label className="block font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block font-medium text-gray-700">Confirmar Contraseña</label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="flex justify-between">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={processing}>
                        {client ? "Actualizar Cliente" : "Guardar Cliente"}
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
