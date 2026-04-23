import axios from "axios";
import toast from "react-hot-toast";


const backend_url = import.meta.env.VITE_BACKEND_URL;

export const createTableZone = async (data,type,successFunction)=>{
    try {
        const result =await axios.post(
            `${backend_url}/table/create-table-zone`,
            {
                zone_id:data?.id,
                zone_name:data?.zone_name,
                hourly_charge:data?.hourly_charge,
                tablesArray:data?.tablesArray,
                type
            },
            {
                withCredentials:true
            }
        );
        toast.success(result?.data?.message||`Zone has been ${type=='create'?'created':'updated'}.`);
        successFunction(result?.data?.zone_data);

    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
} 


export const getTableZones = async(successFunction)=>{
    try {
        const result =await axios.get(
            `${backend_url}/table/get-table-zones`,
            {
                withCredentials:true
            }
        );
        successFunction(result?.data?.table_zones||[]);
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}

export const deleteZones = async(id,successFunction)=>{
    try {
        const result = await axios.post(
            `${backend_url}/table/remove-zone`,
            {
                zone_id:id
            },
            {
                withCredentials:true
            }
        );
        toast.success(result?.data?.message||'Zone has been removed.');
        successFunction();
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}