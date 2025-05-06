import { useState } from "react";
import { create } from "@/services/ProductService.js";

export default function CreateProduct({ onProductCreated }) {
    const [form, setForm] = useState({
        nombre: "",
        cantidad: "",
        precioCompra: "",
        precioVenta: "",
        proveedor: "",
        sku: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await create(form);
            setSuccess("¡Producto creado exitosamente!");
            setForm({
                nombre: "",
                cantidad: "",
                precioCompra: "",
                precioVenta: "",
                proveedor: "",
                sku: ""
            });
            if (onProductCreated) onProductCreated();
            // El mensaje de éxito se mostrará y los campos estarán vacíos
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Error al crear producto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-8 my-8">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Crear nuevo producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Cantidad</label>
                    <input
                        type="number"
                        name="cantidad"
                        value={form.cantidad}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Precio Compra</label>
                    <input
                        type="number"
                        step="0.01"
                        name="precioCompra"
                        value={form.precioCompra}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Precio Venta</label>
                    <input
                        type="number"
                        step="0.01"
                        name="precioVenta"
                        value={form.precioVenta}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Proveedor</label>
                    <input
                        type="text"
                        name="proveedor"
                        value={form.proveedor}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Creando..." : "Crear producto"}
                </button>
            </form>
        </div>
    );
}
