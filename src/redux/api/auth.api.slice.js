// import {createSelector,createEntityAdapter} from '@reduxjs/toolkit';
import {apiSlice} from './apiSlice';

export const authSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: ({email,password}) => ({
                url:'/auth/login',
                method:'POST',
                body: {
                    email,
                    password
                }
            })
        }),
        logout: builder.mutation({
            query:({email}) => ({
                url:'/auth/logout',
                method:'POST',
                body:{
                    email
                }
            })
        }),
        qr: builder.mutation({
            query:({email,qr_key}) => ({
                url:'/auth/qr',
                method:'POST',
                body:{
                    email,
                    qr_key
                }
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useQrMutation
} = authSlice;


