import { tagTypes } from "../tag-type";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getMyProfile: build.query({
            query: () => ({
                url: '/user/me',
                method: 'GET'
            }),
            providesTags: [tagTypes.user]
        })

    })
})

export const { useGetMyProfileQuery } = userApi