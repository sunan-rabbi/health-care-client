import { tagTypes } from "../tag-type";
import { baseApi } from "./baseApi";
import { Tmeta } from '@/type'

const scheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        createSchedule: build.mutation({
            query: (data) => ({
                url: '/schedule',
                data,
                method: 'POST'
            }),
            invalidatesTags: [tagTypes.schedule]
        }),

        getAllSchedule: build.query({
            query: (arg: Record<string, any>) => ({
                url: '/schedule',
                method: 'GET',
                params: arg
            }),
            transformResponse: (response: [], meta: Tmeta) => {
                return {
                    schedules: response,
                    meta
                }
            },
            providesTags: [tagTypes.schedule]
        }),
        deleteSpeciality: build.mutation({
            query: (id) => ({
                url: `/schedule/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.schedule]
        }),
    })
})