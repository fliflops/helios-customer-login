import { configureStore,combineReducers} from "@reduxjs/toolkit";

import {apiSlice} from '../api/apiSlice';

import authSlice from '../slice/auth.slice';
import tableSlice from '../slice/table.slice';

import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const authPersistConfig= {
    key:'auth',
    storage
}

const reducer = combineReducers({
    auth:persistReducer(authPersistConfig,authSlice),
    table: tableSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
    reducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck :{
            ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(
        apiSlice.middleware
    ),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
