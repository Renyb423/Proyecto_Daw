import React from 'react';
import { useAuth } from '@/providers/RoleAuthorization';
import {useNavigate} from "react-router-dom";

export default function LogoutButton() {
    const { logoutUserContext } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUserContext();
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Cerrar Sesión
        </button>
    );
}