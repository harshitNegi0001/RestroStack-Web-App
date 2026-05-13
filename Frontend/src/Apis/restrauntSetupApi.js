import axios from "axios";
import toast from "react-hot-toast";



const backend_url = import.meta.env.VITE_BACKEND_URL;


export const submitRestrauntData = async (state, setIsLoadingBtn, successFunction) => {

    const res_name = state?.res_name?.trim();
    // const logo = state?.logo?.trim();
    const full_location = state?.full_location?.trim();
    const address = state?.address;
    const phone_no = state?.phone_no?.trim();
    const email = state?.email?.trim();
    const gstin = state?.gstin?.trim();
    const fssai_no = state?.fssai_no?.trim();
    const currency = state?.currency;
    const res_type = state?.res_type;
    const tax_prec = state?.tax_prec;
    const opening_timeing = state?.opening_timeing;
    if (!full_location || !res_name || !phone_no || !email || !gstin || !fssai_no) {
        toast.error('All fields are required.');
        return;
    }
    try {
        setIsLoadingBtn(true);
        const result = await axios.post(
            `${backend_url}/res/create-new-restaurant`,
            {
                res_name,
                full_location,
                address,
                phone_no,
                email,
                gstin,
                fssai_no,
                currency,
                res_type,
                tax_prec,
                opening_timeing
            },
            {
                withCredentials: true
            }
        );
        const userInfo = result?.data?.userInfo;
        const role = result?.data?.role;
        const rolesList = result?.data?.rolesList;
        const permissions = result?.data?.permissions;

        successFunction({ userInfo, role, permissions, rolesList });

    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
    finally {
        setIsLoadingBtn(false);
    }
}

export const getCurrentRestaurant = async (successFunction) => {
    try {
        const result = await axios.get(
            `${backend_url}/res/get-curr-restaurant`,
            {
                withCredentials:true
            }
        );
        const resData = result?.data?.resData;
        successFunction({ resData });
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}

export const editRestaurantDetails= async(formData,successFunction)=>{
    try {
        
        const result =await axios.post(
            `${backend_url}/res/edit-res`,
            formData,
            {
                withCredentials:true
            }
        );
        if(result?.data?.resData){
            successFunction(result.data.resData);
        }
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}


export const searchRestaurants = async (search_query,successFunction)=>{
    try {
        const result = await axios.get(
            `${backend_url}/res/search-res?search_query=${search_query}`,
            {
                withCredentials:true
            }
        )

        successFunction(result?.data?.restaurantsList||[]);
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}