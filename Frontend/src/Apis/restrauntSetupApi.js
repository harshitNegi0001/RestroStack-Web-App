import axios from "axios";
import toast from "react-hot-toast";


const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNoCheck = /^(\+?\d{1,4}|\d{0,4})?\d{7,12}$/;
const gstNoCheck = /^[a-zA-Z0-9-]{5,20}$/;
const FssaiLiNoCheck = /^[a-zA-Z0-9\s/-]{5,30}$/;



const backend_url = import.meta.env.VITE_BACKEND_URL;


export const submitRestrauntData = async ( state, setActiveTab,setInputError,setIsLoadingBtn) => {

    const restaurantName = state?.restaurantName?.trim();
    const oneLineAddress = state?.oneLineAddress?.trim();
    const phoneNum = state?.phoneNum?.trim();
    const busiEmail = state?.busiEmail?.trim();
    const gstNum = state?.gstNum?.trim();
    const fssaiLiNum = state?.fssaiLiNum?.trim();
    const currency = state?.currency?.trim();
    const restType = state?.restType?.trim();
    const texPrecent = state?.texPrecent?.trim();
    const openingTimimgs = state?.openingTimimgs;

    if (!restaurantName || !oneLineAddress || !phoneNum || !busiEmail || !gstNum || !fssaiLiNum) {
        toast.error('All fields are required.');
        return;
    }
    
    if (!addressCheck.test(oneLineAddress)) {
        setInputError(prev => ({ ...prev, oneLineAddress: "Please enter a valid address (10-255 characters)" }))
        setActiveTab('basic-info');
        return;
    }
    if (!checkEmail.test(busiEmail)) {
        setInputError(prev => ({ ...prev, busiEmail: 'Please enter a valid email address.' }));
        setActiveTab('contact');
        return;
    }

    if (!phoneNoCheck.test(phoneNum)) {
        setInputError(prev => ({ ...prev, phoneNum: "Please enter a valid phone number (eg. +919876543210 or 9876543210)." }))
        setActiveTab('contact');

        return;
    }
    if (!gstNoCheck.test(gstNum)) {
        setInputError(prev => ({ ...prev, gstNum: 'Please enter a valid Tax ID or VAT number (5-20 characters).' }));
        setActiveTab('details');
        
        return;
    }
    if (!FssaiLiNoCheck.test(fssaiLiNum)) {
        setInputError(prev => ({ ...prev, fssaiLiNum: 'Please enter a valid Food Safety License or Health Permit number.' }));
        setActiveTab('details');

        return;
    }
    try {
        console.log('userCame')
        setIsLoadingBtn(true);

    } catch (err) {
        // setIsLoadingBtn(false);
        console.log(err);
        toast.error(err?.response?.data?.message || 'Something Went Wrong!');
    }
}