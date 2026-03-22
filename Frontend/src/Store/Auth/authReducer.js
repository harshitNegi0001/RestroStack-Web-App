import { asyncThunkCreator, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const backend_url = import.meta.env.VITE_BACKEND_URL;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const theme = localStorage.getItem('app-theme') || systemTheme;
const initialState = {
    theme:theme,
    userInfo: null,
    role:null,
    permissions:{},
    isLoading: false
}

// export const getInitialState = asyncThunkCreator(
//     'auth/getInitialState',
//     async (_, thunkAPI) => {
//         try {
//             const result = await axios.get(
//                 `${backend_url}/auth/get-my-info`,
//                 {
//                     withCredentials:true
//                 }
//             )
//         } catch (err) {
//             console.log(err);
//             return thunkAPI.rejectWithValue(err.message);
//         }
//     }
// )

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem('app-theme', action.payload);
        },
        setState: (state, action) => {
            if (action.payload.theme) {
                state.theme = action.payload.theme
                localStorage.setItem('app-theme', action.payload.theme);
            }
            if (action.payload.isLoading) {
                state.isLoading = action.payload.isLoading

            }
            if (action.payload.userInfo) {
                state.userInfo = action.payload.userInfo
            }
            if (action.payload.role) {
                state.role = action.payload.role
            }
            if (action.payload.permissions) {
                state.permissions = action.payload.permissions
            }
        }

    }
})

export const { setTheme,setState } = authReducer.actions;
export default authReducer.reducer;