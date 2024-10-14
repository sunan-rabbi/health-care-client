import { getUserInfo } from "@/Service/actions/authservice";
import logoutUser from "@/Service/actions/logOut";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
    const router = useRouter()
    const getUser: any = getUserInfo();
    const handleLogout = () => {
        logoutUser(router)
    }
    return (
        <>
            {
                getUser?.userId ? (<Button variant="outlined" color="error" onClick={handleLogout}>Log Out</Button>) : (<Button component={Link} href="/login">Login</Button>)
            }
        </>
    );
};

export default AuthButton;