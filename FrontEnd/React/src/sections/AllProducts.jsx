
import { useEffect, useState } from "react";
import { findAll } from '@/services/ProductService.js';
import {useAuth} from "@/providers/RoleAuthorization.jsx";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const role = auth?.user?.role;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('tokenJWT');
                if (!token) {
                    setError('No token found, please log in again.');
                    setLoading(false);
                    return;
                }
                const data = await findAll(token);
                setProducts(data);
            } catch (err) {
                setError('Error al cargar productos: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Cargando productos...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }
    if (products.length === 0) {
        return <p className="text-center text-gray-500">No se encontraron productos.</p>;
    }

    return (
        <div className="p-4">
            <div>
                <h2 className="font-bold text-2xl my-10 text-indigo-700">Todos los productos</h2>
            </div>
            {/* Tabla para desktop */}
            <div className="overflow-x-auto rounded-xl shadow hidden md:block">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 text-gray-600 font-bold text-center">ID</th>
                        <th className="px-4 py-2 text-gray-600 font-bold text-center">Nombre</th>
                        <th className="px-4 py-2 text-gray-600 font-bold text-center">SKU</th>
                        <th className="px-4 py-2 text-gray-600 font-bold text-center">Stock</th>
                        <th className="px-4 py-2 text-gray-600 font-bold text-center">Precio Venta (€)</th>
                        {role === "ROLE_ADMIN" && <>
                        <th className="px-4 py-2 text-gray-600 font-bold text-center">Precio Compra (€)</th>
                        <th className="px-4 py-2 text-gray-600 font-bold text-center">Proveedor</th>
                        </>}
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-t">
                            <td className="px-4 py-2 text-center">{product.id}</td>
                            <td className="px-4 py-2 text-center">{product.nombre}</td>
                            <td className="px-4 py-2 text-center">{product.sku}</td>
                            <td className="px-4 py-2 text-center">{product.cantidad}</td>
                            <td className="px-4 py-2 text-center">{product.precioVenta}</td>
                            {role === "ROLE_ADMIN" && <>
                            <td className="px-4 py-2 text-center">{product.precioCompra}</td>
                            <td className="px-4 py-2 text-center">{product.proveedor}</td>
                            </>}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/* Vista tipo tarjeta para mobile */}
            <div className="md:hidden space-y-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700">ID:</span>
                            <span>{product.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700">Nombre:</span>
                            <span>{product.nombre}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700">SKU:</span>
                            <span>{product.sku}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700">Stock:</span>
                            <span>{product.cantidad}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700">Precio Venta (€):</span>
                            <span>{product.precioVenta}</span>
                        </div>
                        {role === "ROLE_ADMIN" && <>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700">Precio Compra (€):</span>
                            <span>{product.precioCompra}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700">Proveedor:</span>
                            <span>{product.proveedor}</span>
                        </div>
                        </>}
                    </div>
                ))}
            </div>
        </div>
    );
}
