import {useAuth} from "@/providers/RoleAuthorization.jsx";
import DashboardLayout from "@/layout/DashboardLayout.jsx";

export default function AdminViewPage() {

    const { user, loading } = useAuth();
    console.log(user);
    if (loading) {
        return <div>Cargando página de admin...</div>;
    }

    return (

        <>
            <DashboardLayout>

            </DashboardLayout>
        </>
    );
}