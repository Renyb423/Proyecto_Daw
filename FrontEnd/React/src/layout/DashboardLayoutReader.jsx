import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton.jsx";
import { useAuth } from "@/providers/RoleAuthorization.jsx";

export default function DashboardLayoutReader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const userContext = useAuth();
    const [roleName, setRoleName] = useState("");

    useEffect(() => {
        const realUser = userContext?.user;
        if (!realUser || !realUser.role) {
            setRoleName("");
            return;
        }
        switch (realUser.role) {
            case "ROLE_READER":
                setRoleName("Reader");
                break;
            default:
                setRoleName("Usuario");
        }
    }, [userContext]);

    const handleNavigateHome = () => {
        navigate("/dashboard_reader");
        setMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            <header className="md:hidden bg-indigo-800 text-white flex items-center justify-between p-4">
                <h2 className="text-xl font-semibold cursor-pointer" onClick={handleNavigateHome}>
                    Zen Inventory <span className="text-white">{roleName}</span>
                </h2>
                <button
                    className="focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </header>

            <aside
                className={`
                    bg-indigo-800 text-white w-full md:w-64 flex-shrink-0
                    ${menuOpen ? "block" : "hidden"} md:block
                    absolute md:static top-16 left-0 z-20 md:z-auto
                `}
            >
                <div className="p-4 md:block hidden">
                    <h2 className="text-xl font-semibold cursor-pointer" onClick={handleNavigateHome}>
                        Zen Inventory <span className="text-white text-xs">{roleName}</span>
                    </h2>
                </div>
                <nav className="mt-4">
                    <Link
                        to="/dashboard_reader/productos"
                        className="block py-4 px-4 hover:bg-indigo-400"
                        onClick={() => setMenuOpen(false)}
                    >
                        Ver Productos
                    </Link>
                    <Link
                        to="/dashboard_reader/productos/buscar"
                        className="block py-4 px-4 hover:bg-indigo-400"
                        onClick={() => setMenuOpen(false)}
                    >
                        Buscar Productos
                    </Link>
                    {/* NOTA: No mostramos Crear Producto aquí */}
                    <LogoutButton />
                </nav>
            </aside>

            <main className="flex-1 p-4 mt-16 md:mt-0">
                <Outlet />
            </main>
        </div>
    );
}
