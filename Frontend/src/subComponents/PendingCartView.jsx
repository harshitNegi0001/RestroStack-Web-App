import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { currencies } from '../utils/clientSideData/setupVariables';
import { useSelector } from 'react-redux';

const PendingCartView = ({ pendingOrder, setOpenFullView }) => {
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
                        {`${currency} ${totalPrice.toFixed(2)}`}
                    </span>
                </div>
            </div>
            <div className='w-fit'>
                <button className={`w-[140px] sm:w-[160px] py-1 bg-linear-0 text-white font-[500] text-[13px] sm:text-[15px] rounded-lg flex items-center justify-center gap-0.5
                to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99`}>
                    Send to Kitchen
                </button>
            </div>
        </div>
    )
}

export default PendingCartView
