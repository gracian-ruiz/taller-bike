import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido al Taller de Aventura Bike" />

            <div className="relative flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
                <div className="max-w-3xl">
                    {/* Navegación de Login/Register o Dashboard */}
                    <div className="absolute top-6 right-6 text-end">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-lg font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-lg font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mr-4"
                                >
                                    Iniciar sesión
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="text-lg font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Título Principal */}
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                        Bienvenido al Taller de Aventura Bike
                    </h1>

                    {/* Descripción */}
                    <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400">
                        <h1>Aquí podrá pedir cita para sus próximas revisiones</h1>
                        <h1>Llevar un libro de mantenimiento de su biciclet</h1>
                        <h1>Saber cuándo será su próxima revisión</h1>
                    </p>
                </div>
            </div>
        </>
    );
}
