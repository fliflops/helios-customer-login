import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState: {
        email:null,
        token:null,
        has_qr:false
    },
    reducers : {
        setCredentials: (state,action) => {
            const {user,token} = action.payload
            state.email=user
            state.token=token
            
        },
        logOut: (state,action) => {
            state.email=null
            state.token=null
            state.has_qr=false
        },
        setQr: (state,action) => {
            // const {has_qr} = action.payload
            state.has_qr = true 
        }
    }
})

export const {setCredentials,setQr,logOut} = authSlice.actions;
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth;
export const selectCurrentToken = (state) => state.auth.token;
