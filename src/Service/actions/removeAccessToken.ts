'use server'

import { cookies } from "next/headers"

const removeTokenFromCookies = (keys: string[]) => {
    keys.forEach(key => {
        cookies().delete(key)
    })
}

export default removeTokenFromCookies