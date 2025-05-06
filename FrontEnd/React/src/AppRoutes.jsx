import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import PagesNotFound from "./pages/PagesNotFound";
// import ReaderViewPage from "@/pages/ReaderView.jsx";
import AdminViewPage from "./pages/AdminView.jsx";
import  AdminRoute  from "@/helpers/AdminAuthoRoute.jsx";
import AllProducts from "@/sections/AllProducts.jsx";
import DashboardLayout from "@/layout/DashboardLayout.jsx";
import WelcomeViewPage from "@/sections/WelcomeView.jsx";
import CreateProducts from "@/sections/CreateProducts.jsx";
import SearchProducts from "@/sections/SearchProducts.jsx";
import ProductLayout from "@/layout/ProductLayout.jsx";
import DashboardLayoutReader from "@/layout/DashboardLayoutReader.jsx";

function AppRouter() {

    return (
        <Routes>

            <Route path="/" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/Login" element={<LoginPage />} />

            {/* Rutas protegidas */}
            <Route element={<AdminRoute />}>
                <Route path="/dashboard_admin" element={<AdminViewPage />}>
                    <Route index element={<WelcomeViewPage />} /> {/* Ruta anidada que muestra el mensaje de bienvenida */}
                </Route>

                <Route path="/dashboard_admin/productos" element={<DashboardLayout />}>
                    <Route index element={<AllProducts />} /> {/* Ruta por defecto dentro de /dashboard_admin/productos */}
                </Route>
                <Route path="/dashboard_admin/productos/crear" element={<DashboardLayout />}>
                    <Route index element={<CreateProducts />} /> {/* Ruta por defecto dentro de /dashboard_admin/productos */}
                </Route>
                <Route path="/dashboard_admin/productos/buscar" element={<DashboardLayout />}>
                    <Route index element={<SearchProducts />} /> {/* Ruta por defecto dentro de /dashboard_admin/productos */}
                </Route>
                <Route path="/dashboard_admin/productos/:id" element={<DashboardLayout />}>
                    <Route path="/dashboard_admin/productos/:id" element={<ProductLayout />} /> {/* Ruta por defecto dentro de /dashboard_admin/id */}
                </Route>
            </Route>

            <Route path="/dashboard_reader" element={<DashboardLayoutReader />}>
                <Route index element={<WelcomeViewPage />} /> {/* Ruta anidada que muestra el mensaje de bienvenida */}
            </Route>

            <Route path="/dashboard_reader/productos" element={<DashboardLayoutReader />}>
                <Route index element={<AllProducts />} /> {/* Ruta anidada que muestra el mensaje de bienvenida */}
            </Route>

            <Route path="/dashboard_reader/productos/buscar" element={<DashboardLayoutReader />}>
                <Route index element={<SearchProducts />} /> {/* Ruta anidada que muestra el mensaje de bienvenida */}
            </Route>
            <Route path="/dashboard_reader/productos/:id" element={<DashboardLayoutReader />}>
                <Route index element={<ProductLayout />} /> {/* Ruta anidada que muestra el mensaje de bienvenida */}
            </Route>


            <Route path="/*" element={<PagesNotFound />} />
        </Routes>
    );
}

export default AppRouter;