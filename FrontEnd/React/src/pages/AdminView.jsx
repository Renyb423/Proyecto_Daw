import {useAuth} from "@/providers/RoleAuthorization.jsx";
import LogoutButton from "@/components/LogoutButton.jsx";

export default function AdminViewPage() {

    const { user, loading } = useAuth();
    console.log(user);
    if (loading) {
        return <div>Cargando página de admin...</div>;
    }

    return (
        <div>
            <h1>Hola, Admin</h1>
            <LogoutButton></LogoutButton>
        </div>
    );
}