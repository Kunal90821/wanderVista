import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/AuthSlice'


export const Store = configureStore({
    reducer: {
        authReducer: userReducer
    }
});