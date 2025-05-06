import {useEffect, useState} from "react";

export default function EditProductModal({ open, onClose, producto, onSave, loading, error }) {
    const [form, setForm] = useState({ ...producto });

    useEffect(() => {
        setForm({ ...producto });
    }, [producto]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(form);
    };

    if (!open) return null;

    return (
        <>
            <div className="fixed inset-0 bg-[rgba(107,114,128,0.6)] z-40" onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative"
                >
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-white hover:text-gray-700 text-2xl bg-red-500 w-22 h-10 cursor-pointer "
                        onClick={onClose}
                    >
                        ×
                    </button>
                    <h2 className="text-xl font-bold mb-6 text-indigo-700">Editar producto</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            name="nombre"
                            value={form.nombre || ""}
                            onChange={handleChange}
                            placeholder="Nombre"
                            className="border rounded px-3 py-2"
                            required
                        />
                        <label htmlFor="sku">SKU:</label>
                        <input
                            name="sku"
                            value={form.sku || ""}
                            onChange={handleChange}
                            placeholder="SKU"
                            className="border rounded px-3 py-2"
                            required
                        />
                        <label htmlFor="cantidad">Cantidad:</label>
                        <input
                            type="number"
                            name="cantidad"
                            value={form.cantidad || ""}
                            onChange={handleChange}
                            placeholder="Cantidad"
                            className="border rounded px-3 py-2"
                            required
                        />
                        <label htmlFor="precioCompra">Precio Compra:</label>
                        <input
                            type="number"
                            name="precioCompra"
                            value={form.precioCompra || ""}
                            onChange={handleChange}
                            placeholder="Precio Compra"
                            className="border rounded px-3 py-2"
                            required
                        />
                        <label htmlFor="precioVenta">Precio Venta:</label>
                        <input
                            type="number"
                            name="precioVenta"
                            value={form.precioVenta || ""}
                            onChange={handleChange}
                            placeholder="Precio Venta"
                            className="border rounded px-3 py-2"
                            required
                        />
                        <label htmlFor="proveedor">Proveedor:</label>
                        <input
                            name="proveedor"
                            value={form.proveedor || ""}
                            onChange={handleChange}
                            placeholder="Proveedor"
                            className="border rounded px-3 py-2"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 mt-6 rounded hover:bg-blue-700 transition cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </form>
            </div>
        </>
    );
}