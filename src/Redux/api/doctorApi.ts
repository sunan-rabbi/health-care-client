import { tagTypes } from "@/Redux/tag-type";
import { baseApi } from "./baseApi";
import { IDoctor, Tmeta } from "@/type";

const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor: build.mutation({
            query: (data) => ({
                url: '/user/create-doctor',
                data,
                method: 'POST',
                contentType: 'multipart/form-data'
            }),
            invalidatesTags: [tagTypes.doctor]
        }),
        getAllDoctor: build.query({
            query: (arg: Record<string, any>) => ({
                url: '/doctor',
                method: 'GET',
                params: arg
            }),
            transformErrorResponse: (response: IDoctor[], meta: Tmeta) => {
                return {
                    doctors: response,
                    meta: meta
                }
            },
            providesTags: [tagTypes.doctor]
        }),
        deleteDoctor: build.mutation({
            query: (id) => ({
                url: `/user/soft/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.doctor]
        }),
    })
})

export const { useCreateDoctorMutation, useGetAllDoctorQuery, useDeleteDoctorMutation } = doctorApi