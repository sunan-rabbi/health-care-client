import { tagTypes } from "@/Redux/tag-type";
import { baseApi } from "./baseApi";
import { IAppointment, Tmeta } from "@/type";

const appointmentApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        createAppointment: build.mutation({
            query: (data) => ({
                url: '/appointment',
                data,
                method: 'POST',
            }),
            invalidatesTags: [tagTypes.appointment]
        }),
        getAllAppointment: build.query({
            query: (arg: Record<string, any>) => ({
                url: '/appointment',
                method: 'GET',
                params: arg
            }),
            transformResponse: (response: IAppointment[], meta: Tmeta) => {
                return {
                    appointments: response,
                    meta: meta
                }
            },
            providesTags: [tagTypes.appointment]
        }),

        getMyAppointment: build.query({
            query: (arg: Record<string, any>) => ({
                url: `/appointment/my-appointments`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response: IAppointment[], meta: Tmeta) => {
                return {
                    appointments: response,
                    meta: meta
                }
            },
            providesTags: [tagTypes.appointment]
        }),
        updateAppointment: build.mutation({
            query: ({ id, data }: { id: string, data: any }) => ({
                url: `/appointment/status/${id}`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.appointment]
        }),
    })
})

export const { useCreateAppointmentMutation, useGetAllAppointmentQuery, useGetMyAppointmentQuery, useUpdateAppointmentMutation } = appointmentApi