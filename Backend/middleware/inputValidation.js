import { returnRes } from "../utils/returnRes.js";



export const validateRegisteration = (req, res, next) => {
    const { email, name, pass } = req.body;
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+={}[\]|\\:;"'<>,.?/_`~])(?=.{8,16})/
    const passLen = /^.{8,16}$/
    const passLower = /[a-z]/
    const passUpper = /[A-Z]/
    const passNum = /[0-9]/
    const passSpecial = /[!@#$%^&*()\-+={}[\]|\\:;"'<>,.?/_`~]/

    if (!name?.trim() || !email?.trim() || !pass?.trim()) {
        return returnRes(res, 400, { success: false, error: true, message: 'All fields (Email, Password & Name) are required.', error: 'Missing required fields' });

    }
    if (!checkEmail.test(email)) {
        return returnRes(res, 400, { success: false, error: true, message: 'Please enter a valid email address.', error: 'Invalid email' });

    }
    if (name.length < 3) {
        return returnRes(res, 400, { success: false, error: true, message: 'Name should contain at least 3 characters.', error: 'Invalid name' });

    }
    if (!passStrength.test(pass)) {
        let passError = ''
        if (!passLen.test(pass)) {
            passError = 'Password must be between 8 and 16 characters.';
        }
        else if (!passLower.test(pass)) {
            passError = 'Password must include at least one lowercase letter.';
        }
        else if (!passUpper.test(pass)) {
            passError = 'Password must include at least one uppercase letter.';
        }
        else if (!passNum.test(pass)) {
            passError = 'Password must include at least one number.';
        }
        else if (!passSpecial.test(pass)) {
            passError = 'Password must include at least one special character.';
        }

        return returnRes(res, 400, { success: false, error: true, message: passError, error: 'Password is too weak. Please choose a stronger password.' });


    }
    next();

}