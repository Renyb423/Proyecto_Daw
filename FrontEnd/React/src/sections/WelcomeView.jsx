export default function WelcomeViewPage() {
    return (
        <>
            <div
                className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 flex mt-10 flex-col md:flex-row items-center gap-6">
                {/* Imagen de bienvenida */}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                    alt="Zen Inventory Logo"
                    className="w-24 h-24 object-contain"
                />
                {/* Texto de bienvenida */}
                <div className="">
                    <h1 className="text-2xl font-bold text-indigo-700 mb-2">Bienvenido a Zen Inventory</h1>
                    <p className="text-gray-700 text-lg">
                        Has iniciado sesión correctamente.
                        <br/>
                        Nos alegra tenerte de vuelta en tu gestor de productos.
                    </p>
                </div>

            </div>

            <div className="flex justify-center items-start mt-10 min-h-screen rounded-xl">
                <img
                    src="src/assets/welcome-image.jpg"
                    alt="Zen Inventory Logo"
                    className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain  rounded-xl"
                />
            </div>
        </>
    );
}