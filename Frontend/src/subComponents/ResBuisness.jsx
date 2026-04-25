import { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import { MdAssignment } from 'react-icons/md';
import { TbLicense } from 'react-icons/tb';
import { HiOutlineReceiptTax } from "react-icons/hi";
import { currencies } from "../utils/clientSideData/setupVariables";



export default function ResBuisness({ resData, setResData, isLoading }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [state, setInputState] = useState();
    const [inputError, setInputError] = useState({
        gstin: '',
        fssai_no: '',
        gst_tax: '',
        currency: '',
    });
    useEffect(() => {
        if (!resData) {
            return;
        }
        setInputState({ ...resData });

    }, [resData])
    return (
        <div className="w-full flex flex-col gap-2 md:gap-3 ">
            <div className="flex w-full justify-between gap-2 items-center h-[30px]">
                <span className="text-low-text font-[500] text-[12px] md:text-[14px]">Buisness & System Settings</span>
                {!isLoading && !openEdit &&
                    <div onClick={() => setOpenEdit(true)}
                        className="w-fit h-fit rounded-full p-2 flex items-center justify-center hover:bg-divider/30 active:bg-divider/50 text-low-text font-[500] text-[10px] md:text-[12px]">
                        <LuPencil />
                    </div>}
            </div>
            <div className="w-full flex flex-col gap-2">
                {
                    isLoading ?
                        <>
                            {[1, 2, 3, 4].map(i => <div key={i} className="flex flex-col w-full my-3  gap-2">
                                <span className="w-[70px] h-[14px] animate-wave rounded-2xl"></span>
                                <span className="w-full max-w-[320px] animate-wave h-[14px] rounded-2xl"></span>
                            </div>)}
                        </> :
                        openEdit ?
                            <>
                                <div className='w-full flex flex-col gap-0 relative pb-2'>

                                    <div
                                        className='w-[100%] flex flex-col gap-1 relative'>
                                        <label htmlFor="gstin-input"
                                            className='text-sec-text pl-1 text-[12px] md:text-[13px] '>GST Number (Tax Identification Number)</label>

                                        <label htmlFor='gstin-input'
                                            className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                size-[30px] text-[20px] '>
                                            <MdAssignment />
                                        </label>
                                        <input id='gstin-input' type="text"
                                            value={state?.gstin} onChange={(e) => setInputState(prev => ({ ...prev, gstin: e.target.value }))}
                                            placeholder='eg. 05AAAAA0000A1Z5' required
                                            onFocus={() => setInputError(prev => ({ ...prev, gstin: '' }))}
                                            className={`${inputError?.gstin ? 'outline-red-600' : 'outline-divider '}
                                                outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                                                rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                                    </div>
                                    <span className='text-red-500 text-[8px] w-full text-start md:text-[10px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.gstin}</span>
                                </div>
                                <div className='w-full flex flex-col gap-0 relative pb-2'>

                                    <div
                                        className='w-[100%] flex flex-col gap-1 relative'>
                                        <label htmlFor="fssaiLiNum-input"
                                            className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>FSSAI Number (Food License Number)</label>

                                        <label htmlFor='fssaiLiNum-input'
                                            className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                size-[30px] text-[20px]'>
                                            <TbLicense />
                                        </label>
                                        <input id='fssaiLiNum-input' type='text'
                                            autoComplete="fssaiLiNum-input"
                                            placeholder='eg. 12345678901234' required
                                            onFocus={() => setInputError(prev => ({ ...prev, fssai_no: '' }))}
                                            value={state.fssai_no} onChange={(e) => setInputState(prev => ({ ...prev, fssai_no: e.target.value }))}
                                            className={`${inputError.fssai_no ? 'outline-red-600' : 'outline-divider '}
                                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                                                rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                                    </div>
                                    <span className='text-red-500 text-[8px] w-full text-start md:text-[10px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.fssai_no}</span>
                                </div>
                                <div className="w-full flex items-center  gap-3 ">
                                    <div
                                        className='w-[45%] flex flex-col gap-1 relative'>
                                        <label htmlFor="currency-input"
                                            className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Currency</label>

                                        <label htmlFor='currency-input'
                                            className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                size-[30px] text-[20px]'>
                                            {currencies.find(c => c.key == state?.currency)?.sign}
                                        </label>
                                        <select id="currency-input"
                                            value={state.currency} onChange={(e) => setInputState(prev => ({ ...prev, currency: e.target.value }))}
                                            className='outline-1 outline-divider focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                                                rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]'>
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
                                                className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                size-[30px] text-[20px]'>
                                                <HiOutlineReceiptTax />
                                            </label>
                                            <label htmlFor='texPrecent-input'
                                                className='absolute bottom-0 right-1 md:right-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                size-[30px] text-[20px]'>
                                                %
                                            </label>
                                            <input id='texPrecent-input' type='text'
                                                placeholder='eg. 5' required
                                                onFocus={() => setInputError(prev => ({ ...prev, gst_tax: '' }))}
                                                value={state.gst_tax} onChange={(e) => setInputState(prev => ({ ...prev, gst_tax: e.target.value }))}
                                                className={`${inputError.gst_tax ? 'outline-red-600' : 'outline-divider '}
                                                    outline-1 focus:outline-2 px-9 focus:outline-active-border focus:border-active-border outline-0 
                                                rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                                        </div>
                                        <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.gst_tax}</span>

                                    </div>
                                </div>

                            </> :
                            <>
                                <div className="flex flex-1 min-w-0 flex-col items-start ">
                                    <span className="text-[10px] md:text-[12px] text-low-text/70">GST Number :</span>
                                    <span className="text-[12px] md:text-[14px] text-sec-text w-full truncate">{resData?.gstin}</span>
                                </div>
                                <div className="flex flex-1 min-w-0 flex-col items-start ">
                                    <span className="text-[10px] md:text-[12px] text-low-text/70">FSSAI Number :</span>
                                    <span className="text-[12px] md:text-[14px] text-sec-text w-full truncate">{resData?.fssai_no}</span>
                                </div>

                                <div className="flex flex-1 min-w-0 flex-col items-start ">
                                    <span className="text-[10px] md:text-[12px] text-low-text/70">Currency :</span>
                                    <span className=" flex items-center text-[12px] md:text-[14px] text-sec-text w-full truncate">{resData?.currency}({currencies.find(c => c.key == state?.currency)?.name})</span>
                                </div>
                                <div className="flex flex-1 min-w-0 flex-col items-start ">
                                    <span className="text-[10px] md:text-[12px] text-low-text/70">Tax Precentage :</span>
                                    <span className="text-[12px] md:text-[14px] text-sec-text w-full truncate">{resData?.gst_tax} %</span>
                                </div>
                            </>
                }
            </div>
        </div>
    )
}