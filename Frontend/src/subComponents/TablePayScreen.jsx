import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { payMethodOptions } from '../utils/clientSideData/paymentMethods';
import { useSelector } from 'react-redux';
import { currencies } from '../utils/clientSideData/setupVariables';
import { FaCheck } from "react-icons/fa6";
import { confirmCashPayment } from '../Apis/ordersApi';

const inputCheck = /^[0-9]+(\.[0-9]{1,2})?$/; 
const TablePayScreen = ({ onClose, openPayScreen, generatedBillData,closeTable }) => {
    const { activeResData } = useSelector(state => state.auth);
    const [payMethod, setPayMethod] = useState('cash');
    const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
    const [received, setReceived] = useState({
        exact: true,
        got_cash: ''
    });
    const inputError = inputCheck.test(received.got_cash) || received.exact ? '' : 'Please enter a valid amount';
    const [loadingBtn, setLoadingBtn] = useState(false);
    const returnPayCheck = parseFloat(received?.got_cash) >= parseFloat(generatedBillData?.grand_total);
    const handleCashPayment = async()=>{
        function successFunction(){
            closeTable();
        }
        
        setLoadingBtn(true);
        await confirmCashPayment(generatedBillData?.id,successFunction);
        setLoadingBtn(false);
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className={`w-full flex flex-col items-center p-2 gap-2 rounded-t-2xl bg-card-bg h-fit max-h-full 
        ${openPayScreen ? 'translate-y-0' : 'translate-y-full'} transition-all duration-300`}>
            <div className='w-full  flex justify-between items-center border-b-1 border-divider'>
                <span className='text-[14px] sm:text-[15px] font-semibold text-low-text/70'>Collect Payment</span>
                <div onClick={onClose} className='size-[40px] hover:bg-divider/10 active:bg-divider/20 rounded-full flex justify-center text-sec-text items-center'>
                    <IoClose />
                </div>
            </div>
            <div className='w-[80%] relative mt-3 border-dashed border-divider border-1 rounded-xl p-5 flex flex-col gap-2 items-center justify-center'>
                <span className='capitalize absolute border-dashed top-[-15px] font-[600] text-[12px] sm:text-[13px] text-sec-text/80 bg-toast-bg rounded-2xl px-3 py-1 border-1 border-divider'>Amount to pay</span>
                <span className='text-main-text font-[600] text-[24px] sm:text-[28px]'>{currency} {generatedBillData?.grand_total}</span>
            </div>

            <div className='w-full p-2 flex flex-col mt-3 gap-2'>
                <span className='text-sec-text/80 text-[14px] sm:text-[15px] font-semibold'>Select Method</span>
                <div className='w-full flex flex-row flex-wrap gap-2'>
                    {
                        payMethodOptions.map((option) =>
                            <div onClick={() => setPayMethod(option?.value)} title={option.label}
                               key={option.id}
                                className={`${payMethod == option.value ? 'border-active-border bg-active-border/20 text-active-border'
                                    : 'bg-divider/20 hover:bg-active-border/10 text-low-text/70 border-divider hover:text-active-border/70 hover:border-active-border/40'}
                                px-2 py-2 sm:py-3 flex flex-col items-center border-1 rounded-lg w-[120px] sm:w-[150px] sm:text-[18px] cursor-pointer gap-0.5`}>
                                {option.icon}
                                <span className={`${payMethod == option.value ? 'text-sec-text' : 'text-low-text/70'}
                                        text-[12px] sm:text-[13px] font-semibold`}>{option.label}</span>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* <div className='w-full h-0 border-t-1 border-divider '></div> */}
            <div className='p-2 w-full '>
                {payMethod == 'cash' &&
                    <><div className='w-full mt-4 bg-toast-bg border-1 border-dashed items-center border-divider rounded-2xl relative flex flex-col gap-3 p-3 '>
                        <span className='capitalize absolute border-dashed top-[-15px] font-[600] text-[12px] sm:text-[13px] text-sec-text/80 bg-card-bg rounded-2xl px-3 py-1 border-1 border-divider'>
                            payment details
                        </span>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-[12px] sm:text-[13px] font-[600] text-sec-text/80 '>Cash received</span>
                            <div className='w-full flex gap-2 items-center'>
                                <div onClick={() => setReceived(prev => ({ ...prev, exact: true }))} className={`w-fit px-3 py-1.5 cursor-pointer bg-card-bg font-[600] rounded-md text-[12px] sm:text-[13px] 
                                    ${received?.exact ? 'text-active-border outline-1 outline-active-border' : 'text-low-text/70 hover:text-active-border/60 hover:outline-1 outline-active-border/20'}`}>
                                    Exact ({currency}{generatedBillData?.grand_total})
                                </div>
                                <div onClick={() => setReceived(prev => ({ ...prev, exact: false }))} className={`w-fit px-3 py-1.5 cursor-pointer bg-card-bg font-[600] rounded-md text-[12px] sm:text-[13px] 
                                    ${!received?.exact ? 'text-active-border outline-1 outline-active-border' : 'text-low-text/70 hover:text-active-border/60 hover:outline-1 outline-active-border/20'}`}>
                                    Enter Amount
                                </div>
                            </div>
                            {
                                !received?.exact &&
                                <div className='w-full flex flex-col gap-0 relative my-2'>

                                    <div
                                        className='w-[100%] flex flex-col gap-1 relative'>


                                        <label htmlFor='cash-input'
                                            className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                size-[30px] text-[20px] '>
                                            {currencies.find(c => c.key == activeResData?.currency)?.sign}
                                        </label>
                                        <input id='cash-input' type="text"
                                            value={received?.got_cash} onChange={(e) => setReceived(prev => ({ ...prev, got_cash: e.target.value }))}
                                            placeholder='Enter Cash Amount' required
                                            className={`${inputError ? 'outline-red-600' : 'outline-divider focus:outline-active-border'}
                                                outline-1 focus:outline-2 pl-9 focus:border-active-border
                                                rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                                    </div>
                                    <span className='text-red-500 text-[8px] w-full text-start md:text-[10px] pl-1 whitespace-pre-line absolute top-[102%]' >{inputError}</span>
                                </div>
                            }
                            {
                                !received?.exact && !inputError &&
                                <div className={`${!returnPayCheck ?
                                    'border-red-600 bg-red-600/20 text-red-600' : 'border-green-600 bg-green-600/20 text-green-600'}
                                        border-1 p-2 rounded-lg text-[12px] sm:text-[13px] font-[600]`}>
                                    {
                                        !returnPayCheck ? 'Received amount is less than total amount' : `Change to return: ${currency} ${(parseFloat(received?.got_cash) - parseFloat(generatedBillData?.grand_total)).toFixed(2)}`
                                    }
                                </div>
                            }
                        </div>

                    </div><div className='w-full flex justify-center'>
                            <button disabled={loadingBtn}
                            onClick={handleCashPayment}
                                className={`w-fit mt-3 px-3 py-2 rounded-lg bg-linear-0 text-white text-[11px] sm:text-[13px] font-[500] flex items-center justify-center  gap-2                   
                                    ${loadingBtn ? 'bg-disabled-btn/60 cursor-not-allowed' :
                                        'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}
                            >
                                {loadingBtn ? <svg className="animate-spin -ml-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> : <FaCheck />}
                                {
                                    loadingBtn ? <span className='text-white/80'>Processing...</span> : 'Confirm Payment'
                                }
                                
                            </button>
                        </div>
                    </>}
            </div>

        </div>
    )
}

export default TablePayScreen
