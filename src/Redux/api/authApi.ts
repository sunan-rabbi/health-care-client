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
        forgetPassword: build.mutation({
            query: (data) => ({
                url: '/auth/forgot-password',
                data,
                method: 'POST',
            }),
        }),
        resetPassword: build.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                data,
                method: 'POST',
            }),
        }),
    })
})

export const { useChangePasswordMutation, useForgetPasswordMutation, useResetPasswordMutation } = authApi;