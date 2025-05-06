import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findAll, remove, update } from "@/services/ProductService.js";
import EditProductModal from "@/components/EditProductModal.jsx";
import {useAuth} from "@/providers/RoleAuthorization.jsx";

export default function ProductLayout() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [deleteError, setDeleteError] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const auth = useAuth();
    const role = auth?.user?.role;

    // Para el modal de edición
    const [showEdit, setShowEdit] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState("");

    const fetchProducto = async () => {
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
            const prod = productos.find((p) => String(p.id) === String(id));
            if (!prod) {
                setError("Producto no encontrado.");
            } else {
                setProducto(prod);
            }
        } catch (err) {
            setError("Error al cargar producto: " + (err.message || err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducto();
        // eslint-disable-next-line
    }, [id]);

    const handleRemove = async () => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
        setDeleteLoading(true);
        setDeleteError("");
        try {
            await remove(producto.id);
            navigate("/dashboard_admin/productos/buscar");
        } catch (error) {
            setDeleteError(error.message || "Error al eliminar el producto.");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleEdit = async (formData) => {
        setEditLoading(true);
        setEditError("");
        try {
            await update(formData);
            setShowEdit(false);
            await fetchProducto(); // refresca datos tras editar
        } catch (error) {
            setEditError(error.message || "Error al actualizar el producto.");
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            <div className="flex-1 p-4 mt-16 md:mt-0 flex justify-center items-start">
                <div className="w-full max-w-3xl bg-white rounded-xl shadow p-8 my-8">
                    {loading ? (
                        <p className="text-center text-gray-500">Cargando producto...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : producto ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Detalle del producto</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Mini-cards de propiedades */}
                                <div className="bg-indigo-50 rounded-lg shadow p-4 flex flex-col items-center">
                                    <span className="text-gray-500 font-semibold">ID</span>
                                    <span className="text-lg font-bold text-indigo-700">{producto.id}</span>
                                </div>
                                <div className="bg-indigo-50 rounded-lg shadow p-4 flex flex-col items-center">
                                    <span className="text-gray-500 font-semibold">Nombre</span>
                                    <span className="text-lg font-bold text-indigo-700">{producto.nombre}</span>
                                </div>
                                <div className="bg-indigo-50 rounded-lg shadow p-4 flex flex-col items-center">
                                    <span className="text-gray-500 font-semibold">SKU</span>
                                    <span className="text-lg font-bold text-indigo-700">{producto.sku}</span>
                                </div>
                                <div className="bg-indigo-50 rounded-lg shadow p-4 flex flex-col items-center">
                                    <span className="text-gray-500 font-semibold">Cantidad</span>
                                    <span className="text-lg font-bold text-indigo-700">{producto.cantidad}</span>
                                </div>
                                <div className="bg-indigo-50 rounded-lg shadow p-4 flex flex-col items-center">
                                    <span className="text-gray-500 font-semibold">Precio Compra</span>
                                    <span className="text-lg font-bold text-indigo-700">{producto.precioCompra}</span>
                                </div>
                                <div className="bg-indigo-50 rounded-lg shadow p-4 flex flex-col items-center">
                                    <span className="text-gray-500 font-semibold">Precio Venta</span>
                                    <span className="text-lg font-bold text-indigo-700">{producto.precioVenta}</span>
                                </div>
                                <div className="bg-indigo-50 rounded-lg shadow p-4 flex flex-col items-center">
                                    <span className="text-gray-500 font-semibold">Proveedor</span>
                                    <span className="text-lg font-bold text-indigo-700">{producto.proveedor}</span>
                                </div>
                                {role === "ROLE_ADMIN" && <>
                                    {/* Card extra: Editar */}
                                    <div className="bg-blue-50 rounded-lg shadow p-4 flex flex-col items-center justify-center">
                                        <span className="text-blue-700 font-semibold mb-2">¿Deseas editar?</span>
                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
                                            onClick={() => setShowEdit(true)}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                    {/* Card extra: Eliminar */}
                                    <div className="bg-red-50 rounded-lg shadow p-4 flex flex-col items-center justify-center">
                                        <span className="text-red-700 font-semibold mb-2">¿Deseas eliminar?</span>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
                                            onClick={handleRemove}
                                            disabled={deleteLoading}
                                        >
                                            {deleteLoading ? "Eliminando..." : "Eliminar"}
                                        </button>
                                        {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
                                    </div>
                                </>}
                            </div>
                            {/* Modal de edición */}
                            <EditProductModal
                                open={showEdit}
                                onClose={() => setShowEdit(false)}
                                producto={producto}
                                onSave={handleEdit}
                                loading={editLoading}
                                error={editError}
                            />
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
