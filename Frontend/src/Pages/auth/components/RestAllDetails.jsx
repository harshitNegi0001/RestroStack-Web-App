import { useEffect } from "react"
import { LuChefHat } from "react-icons/lu";
import { MdAssignment } from 'react-icons/md';
import { TbLicense } from 'react-icons/tb';
import { BiRupee, BiDollar, BiEuro, BiYen, BiPound } from "react-icons/bi";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { PiForkKnife } from "react-icons/pi";
import { IoMdTime } from 'react-icons/io';
const currencies = [
    {
        id: 1,
        sign: <BiRupee />,
        name: 'Indian Rupee',
        key: 'INR',
        symbol: '₹'
    },
    {
        id: 2,
        sign: <BiDollar />,
        name: 'US Dollar',
        key: 'USD',
        symbol: '$'
    },
    {
        id: 3,
        sign: <BiEuro />,
        name: 'Euro',
        key: 'EUR',
        symbol: '€'
    },
    {
        id: 4,
        sign: <BiPound />,
        name: 'Pound',
        key: 'GBP',
        symbol: '£'
    },
    {
        id: 5,
        sign: <BiYen />,
        name: 'Japanese Yen',
        key: 'JPY',
        symbol: '¥'
    },
]

const cuissineTypes = [
    {
        id: 1,
        label: 'Cafe/Coffee Shop',
        value: 'cafe',
    },
    {
        id: 2,
        label: 'Fast Food Restaurant',
        value: 'fast_food',
    },
    {
        id: 3,
        label: 'Fine Dining Restaurant',
        value: 'fine_dining',
    },
    {
        id: 4,
        label: 'Casual Dining Restaurant',
        value: 'casual_dining',
    },
    {
        id: 5,
        label: 'Bakery',
        value: 'bakery',
    },
    {
        id: 6,
        label: 'Bar/Pub',
        value: 'bar',
    },
    {
        id: 7,
        label: 'Pop-up Restaurant',
        value: 'pop_up',
    },
    {
        id: 8,
        label: 'Family Restaurant',
        value: 'family',
    },
    {
        id: 9,
        label: 'Theme Restaurant',
        value: 'theme_based',
    },
    {
        id: 10,
        label: 'Fast Casual',
        value: 'fast_casual',
    },
    {
        id: 11,
        label: 'Buffet Restaurant',
        value: 'buffet',
    },

]

const weekDays = [
    {
        id: 1,
        label: 'Monday',

    },
    {
        id: 2,
        label: 'Tuesday',

    },
    {
        id: 3,
        label: 'Wednesday',

    },
    {
        id: 4,
        label: 'Thursday',

    },
    {
        id: 5,
        label: 'Friday',

    },
    {
        id: 6,
        label: 'Saturday',

    },
    {
        id: 7,
        label: 'Sunday',

    },

]
export default function RestAllDetails({ setBtnDisabled, state, setState }) {



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

                    <LuChefHat />
                    <span
                        className="text-sec-text text-[15px] md:text-[17px] lg:text-[19px] font-[600]">
                        Restaurant Details
                    </span>
                </div>
                <span
                    className="text-sec-text/80
                    text-[12px] md:text-[13px] lg:text-[14px]">
                    All details about your establishment
                </span>
            </div>

            <div
                className='w-[100%] flex flex-col gap-1 relative'>
                <label htmlFor="fssaiLiNum-input"
                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>GST Number</label>

                <label htmlFor='fssaiLiNum-input'
                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                    <TbLicense />
                </label>
                <input id='fssaiLiNum-input' type='text'
                    placeholder='eg. 12345678901234' required
                    value={state.fssaiLiNum} onChange={(e) => setState(prev => ({ ...prev, fssaiLiNum: e.target.value }))}
                    className='border-divider 
                        border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                        rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />
            </div>
            <div
                className='w-[100%] flex flex-col gap-1 relative'>
                <label htmlFor="gstNum-input"
                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>GST Number</label>

                <label htmlFor='gstNum-input'
                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                    <MdAssignment />
                </label>
                <input id='gstNum-input' type='text'
                    placeholder='eg. 05AAAAA0000A1Z5' required
                    value={state.gstNum} onChange={(e) => setState(prev => ({ ...prev, gstNum: e.target.value }))}
                    className='border-divider 
                        border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                        rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />
            </div>
            <div className="flex flex-row items-center gap-3 ">
                <div
                    className='w-[45%] flex flex-col gap-1 relative'>
                    <label htmlFor="currency-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Currency</label>

                    <label htmlFor='currency-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                        {currencies.find(c => c.key == state?.currency).sign}
                    </label>
                    <select id="currency-input"
                        value={state.currency} onChange={(e) => setState(prev => ({ ...prev, currency: e.target.value }))}
                        className='border-divider 
                        border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                        rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]'>
                        {currencies.map(c => <option key={c.id} value={c.key}
                            className="bg-main-bg ">
                            {c.name}
                        </option>
                        )}
                    </select>

                </div>
                <div
                    className='w-[45%] flex flex-col gap-1 relative'>
                    <label htmlFor="texPrecent-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Tax Precentage</label>

                    <label htmlFor='texPrecent-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                        <HiOutlineReceiptTax />
                    </label>
                    <label htmlFor='texPrecent-input'
                        className='absolute bottom-1 md:bottom-1.5 right-1 md:right-1.5 text-sec-text flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                        %
                    </label>
                    <input id='texPrecent-input' type='text'
                        placeholder='eg. 5' required
                        value={state.texPrecent} onChange={(e) => setState(prev => ({ ...prev, texPrecent: e.target.value }))}
                        className='border-divider 
                        border-1 focus:outline-1 px-9 md:px-11 focus:outline-active-border focus:border-active-border outline-0 
                        rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />
                </div>
            </div>
            <div
                className='w-[100%] flex flex-col gap-1 relative'>
                <label htmlFor="restType-input"
                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Restaurant Type</label>

                <label htmlFor='restType-input'
                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                    <PiForkKnife />
                </label>
                <select id="restType-input"
                    value={state.restType} onChange={(e) => setState(prev => ({ ...prev, restType: e.target.value }))}
                    className='border-divider 
                        border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                        rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]'>
                    {cuissineTypes.map(c => <option key={c.id} value={c.value}
                        className="bg-main-bg ">
                        {c.label}
                    </option>
                    )}
                </select>

            </div>
            <div
                className="border-1 border-divider rounded-2xl p-2
            flex flex-col gap-3 w-full mt-5">
                <div
                    className="flex gap-1 items-center text-main-text text-[16px] md:text-[18px]">
                    <IoMdTime color="orange" />
                    <span>
                        Opening Hours
                    </span>
                </div>
                {weekDays.map(d => <div key={d.id}
                    className="w-full flex flex-col gap-1.5 items-start">
                    <div className=" flex gap-1 items-center">
                        <input type="checkbox" id={`day-check-${d.id}`}
                        checked={state.openingTimimgs[d.label].selected}
                        onChange={(e)=>setState(prev=>({
                            ...prev,openingTimimgs: {
                                        ...prev.openingTimimgs,
                                        [d.label]: {
                                            ...prev.openingTimimgs[d.label],
                                            selected: e.target.checked
                                        }
                                    }
                        }))}
                            className="accent-active-border cursor-pointer" />
                        <label htmlFor={`day-check-${d.id}`}
                            className="text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px] cursor-pointer">{d.label}</label>
                    </div>
                    <div
                        className="flex gap-2 items-center">
                        <div>
                            <input type="time" name="" id=""
                            
                                value={state.openingTimimgs[d.label].opening}
                                onChange={(e) => setState(prev => ({
                                    ...prev,
                                    openingTimimgs: {
                                        ...prev.openingTimimgs,
                                        [d.label]: {
                                            ...prev.openingTimimgs[d.label],
                                            opening: e.target.value
                                        }
                                    }
                                }))}
                                className="border-divider 
                        border-1 focus:outline-1  w-[120px] md:w-[180px] focus:outline-active-border focus:border-active-border outline-0 
                        rounded-lg p-1.5  text-main-text text-[14px] md:text-[16px]"/>
                        </div>
                        <span className="text-[14px] md:text-[16px] text-sec-text/80">to</span>
                        <div>

                            <input type="time" name="" id=""
                                value={state.openingTimimgs[d.label].closing}
                                onChange={(e) => setState(prev => ({
                                    ...prev,
                                    openingTimimgs: {
                                        ...prev.openingTimimgs,
                                        [d.label]: {
                                            ...prev.openingTimimgs[d.label],
                                            closing: e.target.value
                                        }
                                    }
                                }))}
                                disabled={!state.openingTimimgs[d.label].selected}
                                className="border-divider 
                        border-1 focus:outline-1  w-[120px] md:w-[180px] focus:outline-active-border focus:border-active-border outline-0 
                        rounded-lg p-1.5  text-main-text text-[14px] md:text-[16px] [&::-webkit-time-picker-indicator]:hidden"/>
                        </div>
                    </div>

                </div>)}

            </div>
        </div>
    )
}