import {Link} from "react-router-dom";
import {useState} from "react";

export default function Page() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!form.email.trim()) newErrors.email = "El email es obligatorio.";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
            newErrors.email = "El email no es válido.";

        if (!form.password) newErrors.password = "La contraseña es obligatoria.";
        else if (form.password.length < 6)
            newErrors.password = "Debe tener al menos 6 caracteres.";

        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setSubmitted(true);
            // Aquí puedes manejar el login real (API, etc)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Iniciar Sesión</h2>
                {submitted ? (
                    <div className="text-center">
                        <p className="text-green-600 font-semibold mb-4">¡Inicio de sesión exitoso!</p>
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
                        <div className="mb-6">
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
                        <button
                            type="submit"
                            className="w-full px-6 py-2 bg-indigo-600 !text-white rounded hover:bg-indigo-700 transition-colors font-semibold"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                )}
                <p className="mt-4 text-center text-gray-500 text-sm">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="text-indigo-600 hover:underline font-medium">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    )
}