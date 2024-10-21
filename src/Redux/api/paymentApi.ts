import { tagTypes } from "../tag-type";
import { baseApi } from "./baseApi";


const paymentApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        createPayment: build.mutation({
            query: (id: string) => ({
                url: `/payment/init/${id}`,
                method: 'POST',
            }),
            invalidatesTags: [tagTypes.payment]
        }),
    })
})

export const { useCreatePaymentMutation } = paymentApi;