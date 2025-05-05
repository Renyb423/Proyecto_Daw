import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import PagesNotFound from "./pages/PagesNotFound";
import ReaderViewPage from "@/pages/ReaderView.jsx";
import AdminViewPage from "./pages/AdminView.jsx";
import  AdminRoute  from "@/helpers/AdminAuthoRoute.jsx";

function AppRouter() {

    return (
        <Routes>

            <Route path="/" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/Login" element={<LoginPage />} />

            {/* Rutas protegidas */}
            <Route element={<AdminRoute />}>
                <Route path="/dashboard_admin" element={<AdminViewPage />} />
            </Route>

            <Route path="/dashboard_reader" element={<ReaderViewPage />} />
            <Route path="/*" element={<PagesNotFound />} />
        </Routes>
    );
}

export default AppRouter;