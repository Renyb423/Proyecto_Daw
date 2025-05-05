import {useAuth} from "@/providers/RoleAuthorization.jsx";
import LogoutButton from "@/components/LogoutButton.jsx";

export default function ReaderViewPage() {

    const { user } = useAuth();
    console.log(user);
    return (
        <div>
           reader

            <LogoutButton></LogoutButton>
        </div>
    )
}