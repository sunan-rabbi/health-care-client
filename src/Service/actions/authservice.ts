import { JwtDecodedData } from "@/type"
import { getTokenFromLocal, removeTokenFromLocal, setTokenInLocal } from "@/utils/FormData/localStorage"
import { jwtDecode } from "jwt-decode"

const key = 'accessToken'


export const saveAccessToken = async (data: { accessToken: string }) => {
    return setTokenInLocal(key, data.accessToken)
}
export const removeAccessToken = () => {
    return removeTokenFromLocal(key)
}

export const getUserInfo = () => {
    const token = getTokenFromLocal(key)
    let decoded: JwtDecodedData;
    if (!token) {
        return
    }
    decoded = jwtDecode(token as string);
    return decoded
}