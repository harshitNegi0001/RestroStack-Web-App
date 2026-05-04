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

export const AddMenuItem = async(successFunction)=>{
    try {
        const result = await axios.post(
            `${backend_url}/menu/add-item`,
            {

            },
            {
                withCredentials:false
            }
        );

        toast.success(result?.data?.message || 'Item Added')
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}
export const editCatName = async(cat_id,category_name,successFunction)=>{
    try {
        const result = await axios.post(
            `${backend_url}/menu/edit-cat-name`,
            {
                cat_id,
                category_name
            },
            {
                withCredentials:true
            }
        )
        successFunction();
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}   
export const deleteCategory = async(cat_id,successFunction)=>{
    try {
        const result = await axios.post(
            `${backend_url}/menu/del-category`,
            {
                cat_id
            },
            {
                withCredentials:true
            }
        )

        successFunction();
        toast.success(result?.data?.message);
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}
