
import axios from "axios";
import toast from "react-hot-toast";


const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+={}[\]|\\:;"'<>,.?/_`~])(?=.{8,16})/
const passLen = /^.{8,16}$/
const passLower = /[a-z]/
const passUpper = /[A-Z]/
const passNum = /[0-9]/
const passSpecial = /[!@#$%^&*()\-+={}[\]|\\:;"'<>,.?/_`~]/

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const registerUser = async (e, state, setIsLoadingBtn, setInputError, successFunction) => {
    e.preventDefault();
    const name = state?.name?.trim();
    const email = state?.email?.trim();
    const pass = state?.pass?.trim();
    const confirmPass = state?.confirmPass?.trim();
    // form validation here...
    if (!name || !email || !pass || !confirmPass) {
        toast.error('All fields are required.');
        return;
    }
    if (!checkEmail.test(email)) {
        setInputError(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
        return;
    }
    if (name.length < 3) {
        // toast.error('Name should contain at least 3 characters.');
        setInputError(prev => ({ ...prev, name: 'Name should contain at least 3 characters.' }))

        return;
    }
    if (!passStrength.test(pass)) {
        if (!passLen.test(pass)) {
            setInputError(prev => ({ ...prev, pass: 'Password must be between 8 and 16 characters.' }))
        }
        else if (!passLower.test(pass)) {
            setInputError(prev => ({ ...prev, pass: 'Password must include at least one lowercase letter.' }))
        }
        else if (!passUpper.test(pass)) {
            setInputError(prev => ({ ...prev, pass: 'Password must include at least one uppercase letter.' }))
        }
        else if (!passNum.test(pass)) {
            setInputError(prev => ({ ...prev, pass: 'Password must include at least one number.' }))
        }
        else if (!passSpecial.test(pass)) {
            setInputError(prev => ({ ...prev, pass: 'Password must include at least one special character.' }))
        }

        return;
    }
    if (pass != confirmPass) {
        setInputError(prev => ({ ...prev, confirmPass: 'Passwords do not match.' }))
        return;
    }


    try {
        setIsLoadingBtn(true);
        const result = await axios.post(
            `${backend_url}/auth/register`,
            {
                name,
                email,
                pass
            },
            {
                withCredentials: true
            }
        );
        setIsLoadingBtn(false);
        toast.success(`Account created`);
        toast.success(`Otp sent`);
        successFunction(result?.data?.userInfo);

    } catch (err) {
        setIsLoadingBtn(false);
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}
export const loginUser = async (e, state, setIsLoadingBtn, successFunction) => {
    e.preventDefault();
    const email = state?.email?.trim();
    const pass = state?.pass?.trim();

    try {
        setIsLoadingBtn(true);
        const result = await axios.post(
            `${backend_url}/auth/login`,
            {
                email,
                pass
            },
            {
                withCredentials: true
            }
        );
        setIsLoadingBtn(false);
        if (result?.data?.isVerified) {
            toast.success(result?.data?.message);
        }
        else{
            toast(result?.data?.message);
        }
        const userInfo =result?.data?.userInfo;
        const rolesList =result?.data?.rolesList;
        const permissions =result?.data?.permissions;
        const role =result?.data?.role;
        const navigateTo =result?.data?.redirectTo;

        successFunction({
            userInfo,
            rolesList,
            permissions,
            role
        },navigateTo);
    } catch (err) {
        setIsLoadingBtn(false);
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}

export const verifyOtp = async (e, email, otp, setIsLoadingBtn, successFunction) => {
    e.preventDefault();

    try {
        setIsLoadingBtn(true);
        const result = await axios.post(
            `${backend_url}/auth/verify-otp`,
            {
                email,
                otp
            },
            {
                withCredentials: true
            }
        );
        setIsLoadingBtn(false);
        toast.success(result?.data?.message);
        successFunction(result?.data?.userInfo);

    } catch (err) {
        setIsLoadingBtn(false);
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}

export const askForOtp = async (data = {}, setIsLoadingBtn, successFunction) => {
    try {
        setIsLoadingBtn(true);
        const result = await axios.post(
            `${backend_url}/auth/resend-otp`,
            {
                ...data
            },
            {
                withCredentials: true
            }
        );
        setIsLoadingBtn(false);
        toast.success(result?.data?.message);
        successFunction();

    } catch (err) {
        setIsLoadingBtn(false);
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}