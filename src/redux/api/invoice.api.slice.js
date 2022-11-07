import {apiSlice} from './apiSlice';

export const invoiceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHeliosInvoice: builder.query({
            query: (query) => ({
                url:'invoice/helios',
                method:'GET',
                params: {
                    ...query
                }
            }),
            providesTags:['Invoice']
        }),
        receiveInvoice: builder.mutation({
            query: (params) => ({
                url:'invoice/',
                method:'POST',
                body:params.body
            }),
            invalidatesTags:['Pagination','Invoice']
        })
    })
})

export const {
    useGetHeliosInvoiceQuery,
    useReceiveInvoiceMutation
} = invoiceApiSlice