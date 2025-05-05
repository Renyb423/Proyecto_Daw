import {useState} from "react";
import {Link} from "react-router-dom";
import {create} from "@/services/UserService.js";
import { useNavigate } from "react-router-dom";

const ROLES = [
    { value: "", label: "Selecciona un rol" },
    { value: "administrador", label: "Administrador" },
    { value: "lector", label: "Lector" },
];


export default function Page() {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        rol: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);



    const validate = () => {
        const newErrors = {};

        if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
        if (!form.apellido.trim()) newErrors.apellido = "El apellido es obligatorio.";
        if (!form.email.trim()) newErrors.email = "El email es obligatorio.";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
            newErrors.email = "El email no es válido.";

        if (!form.password) newErrors.password = "La contraseña es obligatoria.";
        else if (form.password.length < 6)
            newErrors.password = "Debe tener al menos 6 caracteres.";

        if (!form.rol) newErrors.rol = "Selecciona un rol.";

        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await create({
                nombre: form.nombre,
                apellido: form.apellido,
                email: form.email,
                password: form.password,
                admin: form.rol === "administrador"
            });
            setShowSuccessModal(true);
        } catch (error) {
            setError(error.message || "Error al registrar usuario");
        }
    };

        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Registrate!</h2>
                    {submitted ? (
                        <div className="text-center">
                            <p className="text-green-600 font-semibold mb-4">¡Registro exitoso!</p>
                            <Link
                                to="/"
                                className="inline-block px-6 py-2 bg-indigo-600 !text-white rounded hover:bg-indigo-700 transition-colors"
                            >
                                Ir al inicio
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
                                    autoComplete="off"
                                />
                                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1" htmlFor="apellido">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={form.apellido}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.apellido ? "border-red-500" : "border-gray-300"}`}
                                    autoComplete="off"
                                />
                                {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                    autoComplete="off"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1" htmlFor="password">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                    autoComplete="off"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-1" htmlFor="rol">
                                    Rol
                                </label>
                                <select
                                    id="rol"
                                    name="rol"
                                    value={form.rol}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.rol ? "border-red-500" : "border-gray-300"}`}
                                >
                                    {ROLES.map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.rol && <p className="text-red-500 text-sm mt-1">{errors.rol}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-2 bg-indigo-600 !text-white rounded hover:bg-indigo-700 transition-colors font-semibold"
                            >
                                Registrarse
                            </button>
                        </form>
                    )}
                    <p className="mt-4 text-center text-gray-500 text-sm">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
                {/*modal popup*/}
                {showSuccessModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(107,114,128,0.6)] z-50">
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-xs text-center">
                            <h3 className="text-lg font-semibold text-green-600 mb-4">¡Usuario registrado correctamente!</h3>
                            <button

                                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                                onClick={() => navigate("/login")}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
}