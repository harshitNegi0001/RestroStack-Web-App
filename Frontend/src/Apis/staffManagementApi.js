import axios from "axios";
import toast from "react-hot-toast";

const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const backend_url = import.meta.env.VITE_BACKEND_URL
export const generateInviteToken = async (state, setInputError) => {

    const role_name = state.role;
    const res_id = state.res_id;
    const email = state.email?.trim();
    if(!email){
        setInputError("An email address is needed to send the invitation link.");
        return;
    }
    if(!checkEmail.test(email)){
        setInputError('Please enter a valid email address.');
        return;
    }
    try {
        const result = await axios.post(
            `${backend_url}/staff/generate-invite-token`,
            {
                role_name,
                res_id,
                email
            },
            {
                withCredentials: true
            }
        )
        toast.success('Invitation sent successfully to the candidate.');
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.error || 'Something Went Wrong!');
    }
}


export const verifyInviteToken = async(token,req_type,successFunction)=>{
    try {
        const result = await axios.post(
            `${backend_url}/staff/verify-invite-token`,
            {
                token,
                req_type   
            },
            {
                withCredentials:true
            }
        )
        
        if(req_type=='join'){
            const userInfo =result?.data?.userInfo;
            const role=result?.data?.role;
            const rolesList=result?.data?.rolesList;
            const permissions=result?.data?.permissions;

            successFunction({data:{userInfo,role,rolesList,permissions}});
        }
        else{
            successFunction({data:{res_name:result?.data?.res_name,role_name:result?.data?.role_name}});
        }
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.error || 'Something Went Wrong!');
    }
}

