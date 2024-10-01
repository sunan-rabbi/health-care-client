import { tagTypes } from "../tag-type";
import { baseApi } from "./baseApi";

const specialityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSpeciality: build.mutation({
            query: (data) => ({
                url: '/specialties',
                data,
                method: 'POST',
                contentType: 'multipart/form-data'
            }),
            invalidatesTags: [tagTypes.specialties]
        }),
        getAllSpeciality: build.query({
            query: () => ({
                url: '/specialties',
                method: 'GET'
            }),
            providesTags: [tagTypes.specialties]
        }),
        deleteSpeciality: build.mutation({
            query: (id) => ({
                url: `/specialties/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.specialties]
        }),
    }),
})

export const { useCreateSpecialityMutation, useGetAllSpecialityQuery, useDeleteSpecialityMutation } = specialityApi