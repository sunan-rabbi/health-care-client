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
    })
})

export const { useCreateDoctorScheduleMutation } = doctorScheduleApi