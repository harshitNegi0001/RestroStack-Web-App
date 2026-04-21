import axios from "axios";
import toast from "react-hot-toast";


const backend_url = import.meta.env.VITE_BACKEND_URL;

export const createTableZone = async (data,successFunction)=>{
    try {
        const result =await axios.post(
            `${backend_url}/table/create-table-zone`,
            {
                zone_name:data?.zone_name,
                hourly_charge:data?.hourly_charge,
                tablesArray:data?.tablesArray
            },
            {
                withCredentials:true
            }
        );


    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}