import {apiSlice} from './apiSlice';

export const selectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSelectData: builder.query({
            query: (params) => ({
                url:`select/${params.route}`,
                method:'GET',
                params:{
                    ...params.query
                }
            })
        })
    })
})

export const {
    useGetSelectDataQuery
} = selectApiSlice

