import axios from 'axios';
import toast from 'react-hot-toast';

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const getFilteredOrderHist = async(data,successFunction)=>{
    try {
        const result =await axios.post(
            `${backend_url}/bill/get-bills-history`,
            {
                ...data
            },
            {
                withCredentials:true
            }
        );
        const statsData = result?.data?.summary
        successFunction(result?.data?.table_data,statsData);
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message,'getting bills history failed!');
    }
}