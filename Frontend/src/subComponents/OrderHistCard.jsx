import React from 'react'
import { useSelector } from 'react-redux';
import { currencies } from '../utils/clientSideData/setupVariables';
import { BiTrash } from "react-icons/bi";



const OrderHistCard = ({ data, type = 'lineup',onClose }) => {
  const { activeResData } = useSelector(state => state.auth);
  const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
  return (
    <div className='border-divider border-1 p-2 rounded-lg w-full flex items-center gap-2'>
      <div className='flex-1 min-w-0 flex flex-col'>
        <span className='text-[12px] w-full truncate font-[500] sm:text-[13px] text-sec-text'>{data?.item_name}</span>
        <span className='text-low-text/70 text-[8px] sm:text-[9px]'>{data?.activeVariation?.variant_name}</span>
        <span className='text-active-border text-[9px] sm:text-[10px] font-[500]'>{`${currency} ${data?.activeVariation?.price} * ${data?.quantity} = ${currency} ${data?.activeVariation?.price * data?.quantity}`}</span>
      </div>
      <div>
        {
          type=='lineup'&&
          <div onClick={onClose} title='remove' className='hover:bg-red-600/10 active:bg-red-600/20 text-red-600 size-[40px] rounded-full flex justify-center items-center'>
            <BiTrash />
            </div>
        }
      </div>
    </div>
  )
}

export default OrderHistCard
