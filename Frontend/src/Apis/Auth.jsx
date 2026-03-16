
import axios from "axios";
import toast from "react-hot-toast";


const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+={}[\]|\\:;"'<>,.?/_`~])(?=.{8,16})/
const passLen = /^.{8,16}$/
const passLower=/[a-z]/
const passUpper =/[A-Z]/
const passNum=/[0-9]/
const passSpecial=/[!@#$%^&*()\-+={}[\]|\\:;"'<>,.?/_`~]/

export const registerUser = async (e, state, setIsLoadingBtn, navigate, backend_url, setInputError) => {
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
        // toast.error('Confirm password must match the password.');
        setInputError(prev => ({ ...prev, confirmPass: 'Passwords do not match.' }))
        return;
        // Password is too weak \nPassword must contain at least 8 characters, a number, and a special character.
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
        )
        setIsLoadingBtn(false);
        toast.success(`Account created`);
        toast.success(`Otp sent`);
        navigate('/verify-email', { state: { email: state.email } });

    } catch (err) {
        setIsLoadingBtn(false);
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
}