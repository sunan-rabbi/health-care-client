import { FieldValues } from "react-hook-form";

export const login = async (data: FieldValues) => {
    const fetchData = await fetch(`http://localhost:5000/api/v1/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        cache: 'no-store'
    })
    const res = await fetchData.json()
    return res;
}