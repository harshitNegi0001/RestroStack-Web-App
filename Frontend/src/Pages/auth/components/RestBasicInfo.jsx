import { useEffect, useState } from "react"
import { IoRestaurantOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";




export default function RestBasicInfo({ setBtnDisabled }) {

    const [state, setState] = useState({
        restrauntName: '',
        oneLineAddress: ''
    })

    useEffect(() => {
        setBtnDisabled(true);
    }, [])

    useEffect(() => {
        if (state?.restrauntName?.trim() && state?.oneLineAddress?.trim()) {
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

                    <LuBuilding2 />
                    <span
                        className="text-sec-text text-[15px] md:text-[17px] lg:text-[19px] font-[600]">Basic Information</span>
                </div>
                <span
                className="text-sec-text/80
                    text-[12px] md:text-[13px] lg:text-[14px]">
                    Tell us about your restaurant
                </span>
            </div>
            <div
                className='w-[100%] flex flex-col gap-1 relative'>
                <label htmlFor="restrauntName-input"
                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Restaurant Name</label>

                <label htmlFor='restrauntName-input'
                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                    <IoRestaurantOutline />
                </label>
                <input id='restrauntName-input' type="text"
                    value={state.restrauntName} onChange={(e) => setState(prev => ({ ...prev, restrauntName: e.target.value }))}
                    placeholder='Enter your restraunName' required
                    className='border-divider 
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />
            </div>
            <div
                className='w-[100%] flex flex-col gap-1 relative'>
                <label htmlFor="oneLineAddress-input"
                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Full Address</label>

                <label htmlFor='oneLineAddress-input'
                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                    <IoLocationOutline />
                </label>
                <input id='oneLineAddress-input' type='text'
                    placeholder='Enter your password' required
                    value={state.oneLineAddress} onChange={(e) => setState(prev => ({ ...prev, oneLineAddress: e.target.value }))}
                    className='border-divider 
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />
            </div>
        </div>
    )
}