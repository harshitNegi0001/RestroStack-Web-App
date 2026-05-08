import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from "react-hot-toast";


const backend_url = import.meta.env.VITE_BACKEND_URL;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const theme = localStorage.getItem('app-theme') || systemTheme;
const initialState = {
    theme: theme,
    userInfo: null,
    role: null,
    rolesList: [],
    activeResId: null,
    permissions: {},
    isLoading: true,
    activeResData:{}
}

export const getInitialState = createAsyncThunk(
    'auth/getInitialState',
    async (_, thunkAPI) => {
        try {
            const result = await axios.get(
                `${backend_url}/auth/get-my-info`,
                {
                    withCredentials: true
                }
            );

            return result.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const changeActiveRole = createAsyncThunk(
    'auth/changeActiveRole',
    async (newRoleId, thunkAPI) => {
        try {
            const result = await axios.post(
                `${backend_url}/auth/change-active-role`,
                {
                    newRoleId
                },
                {
                    withCredentials: true
                }
            )
            return result.data;
        } catch (err) {
            console.log(err);
            const errorMessage = err?.response?.data?.message || 'Something Went Wrong!';
            toast.error(errorMessage);
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

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
            if (action.payload.activeResId) {
                state.activeResId = action.payload.activeResId
            }
            if (action.payload.role) {
                state.role = action.payload.role
            }
            if (action.payload.permissions) {
                state.permissions = action.payload.permissions
            }
            if (action.payload.rolesList) {
                state.rolesList = action.payload.rolesList
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getInitialState.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInitialState.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getInitialState.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.userInfo = action.payload.userInfo,
                    state.role = action.payload.role,
                    state.permissions = action.payload.permissions,
                    state.rolesList = action.payload.rolesList,
                    state.activeResId = action.payload.activeResId
                    state.activeResData = state.rolesList.find(rl => rl.res_id ==state.activeResId)?.res_data|| state.rolesList[0]?.res_data
            })

            .addCase(changeActiveRole.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(changeActiveRole.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(changeActiveRole.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload?.userInfo) {
                    state.userInfo = action.payload.userInfo;
                    state.role = action.payload.role;
                    state.permissions = action.payload.permissions;
                    state.activeResId = action.payload.activeResId;
                    state.activeResData = state.rolesList.find(rl => rl.res_id ==state.activeResId)?.res_data|| state.rolesList[0]?.res_data
                }
            })
    }
})

export const { setTheme, setState } = authReducer.actions;
export default authReducer.reducer;