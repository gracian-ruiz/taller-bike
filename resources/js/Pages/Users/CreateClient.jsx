import { useForm } from "@inertiajs/react";

export default function CreateClient({ onClose }) {
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("clients.store"), {
            onSuccess: () => {
                reset();
                onClose(); // 🔹 Cerrar el formulario al enviar
            },
        });
    };

    return (
        <div className="p-4 bg-gray-50 border rounded">
            <h2 className="text-xl font-bold mb-3">Nuevo Cliente</h2>

            <form onSubmit={handleSubmit}>
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

                <div className="flex justify-between">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={processing}>
                        Guardar Cliente
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
