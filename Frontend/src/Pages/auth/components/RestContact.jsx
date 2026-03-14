import { useEffect } from "react"
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineMail } from 'react-icons/hi';




export default function RestContact({ setBtnDisabled, state, setState }) {



    useEffect(() => {
        setBtnDisabled(true);
    }, [])

    useEffect(() => {
        if (state?.phoneNum?.trim() && state?.busiEmail?.trim()) {
            setBtnDisabled(false);
        }
        else {
            setBtnDisabled(true);

        }
    }, [state])

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
                    value={state.phoneNum} onChange={(e) => setState(prev => ({ ...prev, phoneNum: e.target.value }))}
                    placeholder='eg. +91XXXXXXXXXX' required
                    className='border-divider 
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />
            </div>
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
                    placeholder='eg. re*******@gmail.com' required
                    value={state.busiEmail} onChange={(e) => setState(prev => ({ ...prev, busiEmail: e.target.value }))}
                    className='border-divider 
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />
            </div>
        </div>
    )
}