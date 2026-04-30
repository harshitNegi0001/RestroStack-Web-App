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

export const createCategory =async(category_name,successFunction)=>{
    try {
        const result = await axios.post(
            `${backend_url}/menu/create-category`,
            {
                category_name
            },
            {
                withCredentials:true
            }
        );

        successFunction(result.data?.category_id);
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}

export const deleteCategory = async(id,successFunction)=>{
    try {
        // const result = await axios.post(
        //     `${backend_url}/menu/del-category`,
        //     {
        //         category_id : id
        //     },
        //     {
        //         withCredentials:true
        //     }
        // )

        successFunction();
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}
