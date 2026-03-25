import axios from "axios";
import toast from "react-hot-toast";


const backend_url = import.meta.env.VTIE_BACKEND_URL;
export const generateInviteToken = async(state)=>{
    try {
        const role_name= state.role;
        const res_id = state.res_id;
        const result = await axios.post(
            `${backend_url}/staff/generate-invite-token`,
            {
                role_name,
                res_id
            },
            {
                withCredentials:true
            }
        )

        toast.success('Token generated.\nPlease check invite tokens tab.');
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.error || 'Something Went Wrong!');
    }
}