import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialMenu = [];
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const getMenu = createAsyncThunk(
    'menu/getInitialMenu',
    async(_,thunkAPI)=>{
        try {
            const result =await axios.get(
                `${backend_url}/menu/get-menu`,
                {
                    withCredentials:true
                }
            );
            return result?.data?.menu || [];
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

const menuReducer = createSlice({
    name:'menu',
    initialState:{
        menu:initialMenu,
        isLoading:true
    },
    reducers:{
        setMenu:(state,action)=>{
            state.menu=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMenu.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getMenu.rejected,(state)=>{
            state.isLoading=false
        })
        .addCase(getMenu.fulfilled,(state,action)=>{
            state.isLoading=false
            state.menu=action.payload
        })
    }
});

export const {setMenu} = menuReducer.actions;
export default menuReducer.reducer;