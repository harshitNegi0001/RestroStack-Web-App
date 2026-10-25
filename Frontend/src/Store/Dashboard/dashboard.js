import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios  from 'axios';

const initialState = {
    isLoading: true,
    active_staff_stats: null,
    active_orders_stats: null,
    avg_prep_time: null,
    table_occupied_stats: null,
    most_sold_items: []
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const getInitialDashboardData = createAsyncThunk(
    'dashboard/getInitialDashboardData',
    async(_, thunkAPI)=>{
        try {
            const result = await axios.get(
                `${backendUrl}/dashboard/initial-data`,
                {
                    withCredentials:true
                }
            )
            const returnValue = {
                ...result.data.subStats,
                'most_sold_items':result.data.most_sold_items
            }
            return returnValue;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashState: (state, action) => {
            if(action.payload?.table_occupied_stats){
                state.table_occupied_stats= action.payload.table_occupied_stats;
            }
        },
        clearDashState: (state) => {
            state.isLoading = true,
                state.active_staff_stats = null,
                state.active_orders_stats = null,
                state.avg_prep_time = null,
                state.table_occupied_stats = null,
                state.most_sold_items = []
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getInitialDashboardData.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getInitialDashboardData.rejected,(state,action)=>{
            state.isLoading = false
        })
        .addCase(getInitialDashboardData.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.active_staff_stats = action.payload.active_staff_stats,
            state.active_orders_stats = action.payload.active_orders_stats,
            state.avg_prep_time = action.payload.avg_prep_time,
            state.table_occupied_stats = action.payload.table_occupied_stats,
            state.most_sold_items = action.payload.most_sold_items ?? []
        })
    }
})





export const {setDashState,clearDashState} = dashboardReducer.actions;
export default dashboardReducer.reducer;