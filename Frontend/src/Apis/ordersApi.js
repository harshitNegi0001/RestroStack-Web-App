import axios from "axios";
import toast from "react-hot-toast";

const backend_url = import.meta.env.VITE_BACKEND_URL;




export const sendKOT = async (orderData,successFunction)=>{
    try {
        const result =await axios.post(
            `${backend_url}/order/send-kot`,
            orderData,
            {
                withCredentials:true
            }
        );
        successFunction();
        toast.success('KOT sent.')
        
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Sending KOT failed!')
    }
}

export const getRecentOrders =async (tableNo,successFunction)=>{
    try {
        const result = await axios.get(
            `${backend_url}/order/get-recent-orders?table_id=${tableNo}`,
            {
                withCredentials:true
            }
        );
        successFunction(result?.data?.items_list);
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Getting Recent Orders Failed!')
    }
}