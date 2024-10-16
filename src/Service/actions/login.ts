import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";

export const login = async (data: FieldValues) => {
    const fetchData = await fetch(`http://localhost:5000/api/v1/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    const res = await fetchData.json()

    if (res.data.accessToken) {
        setAccessToken(res.data.accessToken, {
            redirect: '/dashboard'
        })
    }
    return res;
}