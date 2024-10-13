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
        }),
        updateMyProfile: build.mutation({
            query: (data) => {
                return {
                    url: '/user/update-my-profile',
                    method: 'PATCH',
                    data,
                    contentType: 'multipart/form-data'
                }
            },
            invalidatesTags: [tagTypes.user]
        })

    })
})

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = userApi