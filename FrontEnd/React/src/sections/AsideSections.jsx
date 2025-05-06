import {Link} from "react-router-dom";
import LogoutButton from "@/components/LogoutButton.jsx";

export default function Page() {
    return (

            <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
                <div className="p-4">
                    <h2 className="text-xl font-semibold">CRUD Productos</h2>
                </div>
                <nav className="mt-4">
                    <Link to="./AllProducts.jsx" className="block py-2 px-4 hover:bg-gray-700">
                        Ver Productos
                    </Link>
                    <Link to="/dashboard/productos/buscar" className="block py-2 px-4 hover:bg-gray-700">
                        Buscar Productos
                    </Link>
                    <Link to="/dashboard/productos/crear" className="block py-2 px-4 hover:bg-gray-700">
                        Crear Producto
                    </Link>
                    <LogoutButton></LogoutButton>
                </nav>
            </aside>

    )
}