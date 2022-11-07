import {apiSlice} from './apiSlice';

export const paginationSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClients: builder.query({
            query: (params) => ({
                url:`${params.route}`,
                method:'GET',
                params:{
                    ...params.query
                }
            }),
            providesTags:['Pagination']
            //transformResponse: (response,meta,args) => 
        })
    })
})

export const {
    useGetClientsQuery
} = paginationSlice;