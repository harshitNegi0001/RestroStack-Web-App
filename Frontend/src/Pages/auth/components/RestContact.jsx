import { useEffect, useState } from "react"
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineMail } from 'react-icons/hi';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNoCheck = /^(\+?\d{1,4}|\d{0,4})?\d{7,12}$/;

export default function RestContact({ state, setState, setActiveTab }) {

    const [localState, setLocalState] = useState({
        phone_no: state.phone_no || '',
        email: state.email || ''
    });
    const [inputError, setInputError] = useState({
        phone_no: '',
        email: ''
    });

    const handleNext = () => {
        if (!checkEmail.test(localState.email)) {
            setInputError(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
            return;
        }

        if (!phoneNoCheck.test(localState.phone_no)) {
            setInputError(prev => ({ ...prev, phone_no: "Please enter a valid phone number (eg. +919876543210 or 9876543210)." }))
            return;
        }

        setState(prev => ({ ...prev, ...localState }));

        setActiveTab('details');
    }
    
    const btnDisabled = Boolean(!localState.phone_no.trim() || !localState.email.trim());

    return (
        <div
            className="w-full p-2 flex flex-col gap-2">
            <div
                className="flex flex-col gap-1 pb-4">
                <div
                    className="flex items-center gap-1 text-[20px] md:text-[22px] lg:text-[24px] text-active-border">

                    <IoCallOutline />
                    <span
                        className="text-sec-text text-[15px] md:text-[17px] lg:text-[19px] font-[600]">
                        Contact Details
                    </span>
                </div>
                <span
                    className="text-sec-text/80
                    text-[12px] md:text-[13px] lg:text-[14px]">
                    How can customers reach you?
                </span>
            </div>
            <div className='w-full flex flex-col gap-0 relative pb-2'>

                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor="phoneNum-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Phone Number</label>

                    <label htmlFor='phoneNum-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                        <IoCallOutline />
                    </label>
                    <input id='phoneNum-input' type="text"
                        autoComplete="phoneNum-input"
                        onFocus={() => setInputError(prev => ({ ...prev, phone_no: '' }))}
                        value={localState.phone_no} onChange={(e) => setLocalState(prev => ({ ...prev, phone_no: e.target.value }))}
                        placeholder='eg. +91XXXXXXXXXX' required
                        className={`${inputError.phone_no ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.phone_no}</span>
            </div>
            <div className='w-full flex flex-col gap-0 relative pb-2'>

                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor="busiEmail-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Business Email</label>

                    <label htmlFor='busiEmail-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                        <HiOutlineMail />
                    </label>
                    <input id='busiEmail-input' type='text'
                        autoComplete="busiEmail-input"
                        placeholder='eg. re*******@gmail.com' required
                        onFocus={() => setInputError(prev => ({ ...prev, email: '' }))}
                        value={localState.email} onChange={(e) => setLocalState(prev => ({ ...prev, email: e.target.value }))}
                        className={`${inputError.email ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.email}</span>

            </div>

            <div
                className="w-full flex justify-between items-center">
                <button onClick={() => setActiveTab('basic-info')}
                    className='mt-3 w-[75px] md:w-[80px] py-2  rounded-lg  border-1 flex items-center text-center justify-center
                border-low-text/80 hover:border-low-text hover:bg-low-text/10 active:border-sec-text active:bg-low-text/30
                text-low-text/80 hover:text-low-text active:text-sec-text
                 text-[12px] md:text-[13px] lg:text-[14px] font-[600]'
                ><MdNavigateBefore /> Back </button>
                <button onClick={handleNext}
                    disabled={btnDisabled}
                    className={` mt-3 w-[75px] md:w-[80px] py-2  rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600] flex items-center text-center justify-center
                                     ${btnDisabled ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    Next <MdNavigateNext />
                </button>
            </div>
        </div>
    )
}