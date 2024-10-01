import { getUserInfo, removeAccessToken } from "@/Service/actions/authservice";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
    const router = useRouter()
    const getUser: any = getUserInfo();
    const handleLogout = () => {
        removeAccessToken()
        router.refresh()
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