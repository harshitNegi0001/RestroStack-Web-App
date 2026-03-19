import { useEffect, useState } from "react"
import { LuChefHat } from "react-icons/lu";
import { MdAssignment } from 'react-icons/md';
import { TbLicense } from 'react-icons/tb';
import { HiOutlineReceiptTax } from "react-icons/hi";
import { PiForkKnife } from "react-icons/pi";
import { currencies, cuissineTypes, weekDays } from "../../../utils/clientSideData/setupVariables.jsx";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import ResOpenningTime from "./ResOpenningTime.jsx";



export default function RestAllDetails({ state, setState, setActiveTab }) {

    const [localState, setLocalState] = useState({
        res_type: state.res_type || 'family',
        fssai_no: state.fssai_no || '',
        gstin: state.gstin || '',
        currency: state.currency || 'INR',
        tax_prec: state.tax_prec || '0',
        opening_timeing: state.opening_timeing || [
            ...weekDays.map(w=>{
                return{
                    isClosed:false,
                    opening:'08:00',
                    closing:'20:00'
                }
            })
        ]
    });

    const [inputError, setInputError] = useState({
        fssai_no: '',
        gstin: '',
        opening_timeing: '',
        tax_prec: ''
    });

    const handleNext = () => {


        // setState(prev => ({ ...prev, ...localState }));

        // setActiveTab('details');
    }
    const btnDisabled = Boolean(!localState.fssai_no.trim() || !localState.gstin.trim() || !localState.tax_prec.trim());

    return (
        <div
            className="w-full p-2 flex flex-col gap-2 overflow-x-hidden">
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
            <div className='w-full flex flex-col gap-0 relative pb-2'>

                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor="fssaiLiNum-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>FSSAI Number (Food License Number)</label>

                    <label htmlFor='fssaiLiNum-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                        <TbLicense />
                    </label>
                    <input id='fssaiLiNum-input' type='text'
                        autoComplete="fssaiLiNum-input"
                        placeholder='eg. 12345678901234' required
                        onFocus={() => setInputError(prev => ({ ...prev, fssai_no: '' }))}
                        value={localState.fssai_no} onChange={(e) => setLocalState(prev => ({ ...prev, fssai_no: e.target.value }))}
                        className={`${inputError.fssai_no ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.fssai_no}</span>

            </div>
            <div className='w-full flex flex-col gap-0 relative pb-2'>

                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor="gstNum-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>GST Number (Tax Identification Number)</label>

                    <label htmlFor='gstNum-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                        <MdAssignment />
                    </label>
                    <input id='gstNum-input' type='text'
                        autoComplete="gstNum-input"
                        placeholder='eg. 05AAAAA0000A1Z5' required
                        onFocus={() => setInputError(prev => ({ ...prev, gstin: '' }))}
                        value={localState.gstin} onChange={(e) => setLocalState(prev => ({ ...prev, gstin: e.target.value }))}
                        className={`${inputError.gstin ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.gstin}</span>

            </div>
            <div className="w-full flex items-center  gap-3 ">
                <div
                    className='w-[45%] flex flex-col gap-1 relative'>
                    <label htmlFor="currency-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Currency</label>

                    <label htmlFor='currency-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                        {currencies.find(c => c.key == localState?.currency).sign}
                    </label>
                    <select id="currency-input"
                        value={localState.currency} onChange={(e) => setLocalState(prev => ({ ...prev, currency: e.target.value }))}
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
                <div className='w-[45%] flex flex-col gap-0 relative'>

                    <div
                        className='w-full flex flex-col gap-1 relative'>
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
                            onFocus={() => setInputError(prev => ({ ...prev, tax_prec: '' }))}
                            value={localState.tax_prec} onChange={(e) => setLocalState(prev => ({ ...prev, tax_prec: e.target.value }))}
                            className={`${inputError.tax_prec ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                    </div>
                    <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.tax_prec}</span>

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
                    value={localState.res_type} onChange={(e) => setLocalState(prev => ({ ...prev, res_type: e.target.value }))}
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
            <ResOpenningTime localState={localState} setLocalState={setLocalState}/>
            <div
                className="w-full flex justify-between items-center">
                <button onClick={() => setActiveTab('contact')}
                    className='mt-3 w-[75px] md:w-[80px] py-2  rounded-lg  border-1 flex items-center text-center justify-center
                            border-low-text/80 hover:border-low-text hover:bg-low-text/10 active:border-sec-text active:bg-low-text/30
                            text-low-text/80 hover:text-low-text active:text-sec-text
                             text-[12px] md:text-[13px] lg:text-[14px] font-[600]'
                ><MdNavigateBefore /> Back </button>
                <button
                    onClick={handleNext}
                    disabled={btnDisabled}
                    className={` mt-3 w-[75px] md:w-[80px] py-2  rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600] flex items-center text-center justify-center
                                                 ${btnDisabled ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    Next <MdNavigateNext />
                </button>
            </div>
        </div>
    )
}