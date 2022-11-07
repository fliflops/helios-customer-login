import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../slice/auth.slice';

const baseQuery  = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DEV,
    credentials:'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token) {
            headers.set('x-access-token',token)
        }
        return headers
    }
})

const baseQueryWithReauth = async(args,api, extraOptions) => {
    let result = await baseQuery(args,api,extraOptions)
    
    if(result?.error?.originalStatus === 403){
        console.log('sending refresh token')
        const refreshResult =  await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data){
            const user = api.getState().auth.email
            //store new token
            api.dispatch(setCredentials({...refreshResult.data,user}))

            // retry original query with new access token
            result = await baseQuery(args,api,extraOptions)
        }
        else {
            api.dispatch(logOut())

        }
    }

    return result
}


export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: baseQueryWithReauth,
    tagTypes:['Pagination','Invoice'],
    endpoints: builder => ({})
})