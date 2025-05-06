import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {login as loginApi} from "@/services/UserService.js";
import {decodeToken} from "@/helpers/decodeToken.jsx"
import {useAuth} from "@/providers/RoleAuthorization.jsx"

export default function LoginPage() {
    const [form, setForm] = useState({
        nombre: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loginUserContext } = useAuth();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user?.isAuthenticated) {
            if (user.role === 'ROLE_ADMIN') {
                navigate('/dashboard_admin');
            } else if (user.role === 'ROLE_READER') {
                navigate('/dashboard_reader');
            } else {
                // Redirigir a una página por defecto si el rol no se reconoce
                navigate('/');
            }
            console.log(user.role)
        }
    }, [user, navigate, loading]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const data = await loginApi({ nombre: form.nombre, password: form.password });
            localStorage.setItem("tokenJWT", data.token);

            const payload = decodeToken(data.token);
            const authorities = JSON.parse(payload.authorities);
            const role = authorities[0].authority;

            loginUserContext({
                role: role,
                token: data.token,
                isAuthenticated: true
            });

            if (role === "ROLE_ADMIN") {
                navigate("/dashboard_admin");
            } else if (role === "ROLE_READER") {
                navigate("/dashboard_reader");
            }
            else {
                console.log("Rol desconocido:", role);
            }

        } catch (error) {
            console.log(error.response);
            setError("Usuario o contraseña incorrectos");
        }
    };

    return !user?.isAuthenticated ? (
        <div className="flex md:flex-row min-h-screen flex-col ">
            {/* Columna izquierda: Login o registro */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 lg:w-[60%] w-full">
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
                        <>
                            <form onSubmit={handleSubmit} noValidate>
                                {error && (
                                    <p className="text-red-500 text-center mb-4">{error}</p>
                                )}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-1" htmlFor="nombre">
                                        Nombre de usuario
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={form.nombre}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
                                        autoComplete="off"
                                    />
                                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
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
                        </>
                    )}
                    <p className="mt-4 text-center text-gray-500 text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link to="/register" className="text-indigo-600 hover:underline font-medium">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
            {/*#4f39f6*/}
            {/* Columna derecha: Información con fondo */}
            <div
                className="relative flex flex-col bg-cover bg-bottom text-white lg:w-[40%] w-full bg-[url(@/assets/bg-login.jpg)]"
            >
                <div className="absolute inset-0 bg-[rgba(79,57,246,0.35)]"></div>
                <div className="relative text-center mt-8">
                    <h1 className="text-4xl font-bold mb-6 drop-shadow">Zen Inventory</h1>
                </div>

                <div className="relative flex flex-col items-center justify-center flex-1 space-y-6">
                    <div className="px-4 py-2 rounded">
                        <h2 className="text-2xl font-semibold drop-shadow">Bienvenido/a! Inicia sesión</h2>
                    </div>

                    <div className="px-6 py-4 rounded text-center">
                        <p className="text-xl drop-shadow">Organiza, controla y crece con Zen Inventory: Tu gestor de productos de confianza! </p>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}