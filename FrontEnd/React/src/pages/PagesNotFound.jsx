import {Link} from "react-router-dom";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 w-full">
            <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest select-none">404</h1>
            <div className="bg-indigo-600 px-2 text-sm rounded mt-20 text-white shadow-lg">Página no
                encontrada
            </div>
            <p className="mt-32 text-gray-600 text-lg text-center max-w-md">
                Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <Link
                to="/"
                className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
                Volver al inicio
            </Link>
        </div>
    )
}