import {apiSlice} from './apiSlice';

export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query:(data) => ({
                url:'/user/clients',
                method:'POST',
                body:data
            })
        }),
        confirmEmail: builder.mutation({
            query:(token) =>({
                url:'/user/confirm-email',
                method:'POST',
                body:{
                    token
                }
            })
        }),
        approveUser: builder.mutation({
            query:(params) => ({
                url:`/user/clients/${params.id}`,
                method:'PUT',
                body:params.body
            }),
            invalidatesTags:['Pagination']
        })
    }),
    
})


export const {
    useRegisterMutation,
    useConfirmEmailMutation,
    useApproveUserMutation
} = userSlice
