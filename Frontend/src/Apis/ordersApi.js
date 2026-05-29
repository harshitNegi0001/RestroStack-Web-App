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