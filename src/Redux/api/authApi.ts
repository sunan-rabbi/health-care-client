import { baseApi } from "./baseApi";


const authApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        changePassword: build.mutation({
            query: (data) => ({
                url: '/auth/change-password',
                data,
                method: 'POST',
            }),
        }),
    })
})

export const { useChangePasswordMutation } = authApi;