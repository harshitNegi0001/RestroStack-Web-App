import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { currencies } from '../utils/clientSideData/setupVariables';
import { useSelector } from 'react-redux';

const PendingCartView = ({ pendingOrder, setOpenFullView,loadingKOTbtn,handleSendKOT }) => {
    const { activeResData } = useSelector(state => state.auth);

    const totalPrice = pendingOrder.reduce((sum, item) => sum + item?.activeVariation?.price, 0);
    const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';

    return (
        <div className={`w-full flex items-center justify-between gap-2 `}>
            <div className={`flex items-center gap-2`}>
                <div onClick={() => setOpenFullView(true)} title='view cart'
                    className='size-[40px] rounded-full flex justify-center items-center text-sec-text
                hover:bg-divider/30 active:bg-divider/50 cursor-pointer'>
                    <HiOutlineShoppingCart />
                </div>
                <div className='flex flex-col items-center '>
                    <span className='text-low-text/70 text-[8px] sm:text-[9px] '>
                        {pendingOrder?.length} Items | Subtotal
                    </span>
                    <span className='text-[16px] sm:text-[18px] font-[600] text-sec-text '>
                        {`${currency} ${totalPrice?.toFixed(2)}`}
                    </span>
                    <span className='text-low-text/70 text-[8px] sm:text-[9px] '>
                        +tax +Table Charge
                    </span>
                </div>
            </div>
            <div className='w-fit'>
                <button disabled={loadingKOTbtn} onClick={handleSendKOT}
                className={`w-[140px] sm:w-[160px] py-1 bg-linear-0 text-white font-[500] text-[13px] sm:text-[15px] rounded-lg flex items-center justify-center gap-0.5
                ${loadingKOTbtn ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    
                    {loadingKOTbtn ? <svg className="animate-spin -ml-1  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : null}
                    {
                        loadingKOTbtn ? <span className='text-white/80'>Sending...</span> : <>Send KOT</>
                    }
                </button>
                
            </div>
        </div>
    )
}

export default PendingCartView
