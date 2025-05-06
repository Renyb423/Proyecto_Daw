import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAll } from "@/services/ProductService.js";
import {useAuth} from "@/providers/RoleAuthorization.jsx";
export default function SearchProducts() {
    const [query, setQuery] = useState("");
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const user = useAuth();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("tokenJWT");
            if (!token) {
                setError("No token found, please log in again.");
                setLoading(false);
                return;
            }
            const productos = await findAll(token);
            const filtrados = productos.filter(
                (p) =>
                    p.nombre.toLowerCase().includes(query.toLowerCase()) ||
                    (p.sku && p.sku.toLowerCase().includes(query.toLowerCase()))
            );
            setResultados(filtrados);
        } catch (err) {
            setError("Error al buscar productos: " + (err.message || err));
        } finally {
            setLoading(false);
        }
    };

    const handleView = (id) => {
        const realRole = user?.user?.role;
        if (realRole === "ROLE_ADMIN") {
            navigate(`/dashboard_admin/productos/${id}`);
        } else if (realRole === "ROLE_READER") {
            navigate(`/dashboard_reader/productos/${id}`);
        } else {
            navigate("/no-autorizado");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 my-8">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Buscar producto</h2>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre o SKU"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setError("");
                    }}
                    className="flex-1 border rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </form>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <ul className="divide-y">
                {resultados.length === 0 && query && !loading && (
                    <li className="py-2 text-gray-500">No se encontraron productos.</li>
                )}
                {resultados.map((producto) => (
                    <li key={producto.id} className="flex items-center justify-between py-3">
                        <div>
                            <span className="font-bold text-indigo-700 mr-2">{producto.nombre}</span>
                            <span className="text-gray-500">[ID: {producto.id}]</span>
                        </div>
                        <button
                            onClick={() => handleView(producto.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
                        >
                            Ver
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
