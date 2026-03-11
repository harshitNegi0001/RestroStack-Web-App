import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authReducer.js';


export const store = configureStore({

    
    reducer: {
        auth:authReducer
    }
})