import { tagTypes } from "../tag-type";
import { baseApi } from "./baseApi";
import { Tmeta } from '@/type'

const doctorScheduleApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        createDoctorSchedule: build.mutation({
            query: (data) => ({
                url: '/doctor-schedule',
                data,
                method: 'POST'
            }),
            invalidatesTags: [tagTypes.doctorSchedule]
        }),
        getMyDoctorSchedule: build.query({
            query: (data) => ({
                url: '/doctor-schedule/my-schedules',
                data
            }),
            providesTags: [tagTypes.doctorSchedule]
        }),
        deleteDoctorSchedule: build.mutation({
            query: (id) => ({
                url: `/doctor-schedule/${id}`,
                method: 'DELETE'
            }),

            invalidatesTags: [tagTypes.doctorSchedule]
        }),

    })
})

export const { useCreateDoctorScheduleMutation, useGetMyDoctorScheduleQuery, useDeleteDoctorScheduleMutation } = doctorScheduleApi