import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authReducer.js';
import menuReducer from './Menu/menuReducer.js';

export const store = configureStore({

    
    reducer: {
        auth:authReducer,
        menu:menuReducer
    }
})