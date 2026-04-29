import axios from "axios";
import toast from "react-hot-toast";


const backend_url = import.meta.env.VITE_BACKEND_URL;


export const getMenuCategories =async(successFunction)=>{

    try {
        const result =await axios.get(
            `${backend_url}/menu/get-categories`,
            {
                withCredentials:true
            }
        );

        successFunction(result.data?.categories||[]);
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}
