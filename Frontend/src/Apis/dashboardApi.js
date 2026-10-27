import axios from "axios";
import toast from 'react-hot-toast';


const backend_url = import.meta.env.VITE_BACKEND_URL;

export const getUpdatedTableStats = async (successFunction) => {
    try {
        const result = await axios.get(
            `${backend_url}/dashboard/get-updated-table-data`,
            {
                withCredentials: true
            }
        );

        successFunction(result?.data?.table_occupied_stats || {});
    } catch (err) {
        console.log('Something went wrong.\n', err?.response?.data?.error)
    }
}

export const getUpdatedOrderStats = async (successFunction) => {


    try {
        const result = await axios.get(
            `${backend_url}/dashboard/get-updated-order-stats`,
            {
                withCredentials:true
            }
        );

        successFunction({
            active_orders_stats:result?.data?.active_orders_stats,
            revenue_chart_data:result?.data?.revenue_chart_data,
            most_sold_items:result?.data?.most_sold_items})
    } catch (err) {
        console.log('Error: error on getting updated orders, \n', err?.response?.data?.error);
    }
}
