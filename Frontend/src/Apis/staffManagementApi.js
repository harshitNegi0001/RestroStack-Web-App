import axios from "axios";
import toast from "react-hot-toast";

const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const backend_url = import.meta.env.VITE_BACKEND_URL;

const restrictionMap = {
    'INTERNAL_SERVER_ERROR': {
        title: 'Something Went Wrong',
        image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1774678519/d56waceogm6fhcckdiao.png',
        subtitle: 'Oops! Sorry, We are facing some error!',
        buttonData: {
            isButton: false
        }
    },
    'INVALID_TOKEN': {
        title: 'Invalid Token',
        image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1773223629/qrhxbalx1f52bsbarbgk.png',
        subtitle: 'This invitation link is invalid or has been removed.',
        buttonData: {
            isButton: false
        }
    },
    'ALREADY_OWNER': {
        title: "You're Owner",
        image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1774679520/xoxemuhgib9awje8eksv.png',
        subtitle: 'You are the owner of this restaurant. You cannot join your own restaurant as staff.',
        buttonData: {
            isButton: false
        }
    },
    'TOKEN_EXPIRED': {
        title: 'Link Expired',
        image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1774674071/cyffm7bjtic14n4efots.png',
        subtitle: 'This invitation has expired. \nPlease ask the owner for a new link.',
        buttonData: {
            isButton: false
        }
    },
    'TOKEN_USED': {
        title: 'Used Link',
        image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1774680952/xqtorjupdhgioswslh0z.png',
        subtitle: 'This invitation has been used. \nPlease ask the owner for a new link.',
        buttonData: {
            isButton: false
        }
    }
}
export const generateInviteToken = async (state, setInputError) => {

    const role_name = state.role;
    const res_id = state.res_id;
    const email = state.email?.trim();
    if (!email) {
        setInputError("An email address is needed to send the invitation link.");
        return;
    }
    if (!checkEmail.test(email)) {
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
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}


export const verifyInviteToken = async (token, req_type, successFunction, restrictionFunction) => {
    try {
        const result = await axios.post(
            `${backend_url}/staff/verify-invite-token`,
            {
                token,
                req_type
            },
            {
                withCredentials: true
            }
        )

        if (req_type == 'join') {
            const userInfo = result?.data?.userInfo;
            const role = result?.data?.role;
            const rolesList = result?.data?.rolesList;
            const permissions = result?.data?.permissions;

            successFunction({ data: { userInfo, role, rolesList, permissions } });
        }
        else {
            successFunction({ data: { res_name: result?.data?.res_name, role_name: result?.data?.role_name } });
        }
    } catch (err) {
        console.log(err);
        const error = err?.response?.data?.error;
        const restrictionData = restrictionMap[error] || {
            title: 'Something Went Wrong',
            image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1774678519/d56waceogm6fhcckdiao.png',
            subtitle: 'Oops! Sorry, We are facing some error!',
            buttonData: {
                isButton: false
            }
        }
        console.log('faileedASFather')
        restrictionFunction(restrictionData);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}

