import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { removeAccessToken } from "./authservice";
import removeTokenFromCookies from "./removeAccessToken";

const logoutUser = (router: AppRouterInstance) => {
    removeAccessToken();
    removeTokenFromCookies(['accessToken', 'refreshToken'])
    router.push('/login')
    router.refresh()
}

export default logoutUser