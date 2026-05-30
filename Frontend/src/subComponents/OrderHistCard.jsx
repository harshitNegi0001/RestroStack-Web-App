import React from 'react'
import { useSelector } from 'react-redux';
import { currencies } from '../utils/clientSideData/setupVariables';
import { BiTrash } from "react-icons/bi";



const OrderHistCard = ({ data, type = 'lineup', onClose }) => {
  const { activeResData } = useSelector(state => state.auth);
  const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
  const price = data?.price ||data?.activeVariation?.price||0;
  return (
    <div className='border-divider border-1 p-2 rounded-lg w-full flex flex-col gap-1'>
      <div className=' w-full flex items-center gap-2'>
        <div className='flex-1 min-w-0 flex flex-col'>
          <span className='text-[12px] w-full truncate font-[500] sm:text-[13px] text-sec-text'>{data?.item_name}</span>
          <span className='text-low-text/70 text-[8px] sm:text-[9px]'>{data?.activeVariation?.variant_name || data?.variant_name}</span>
          <span className='text-active-border text-[9px] sm:text-[10px] font-[500]'>{`${currency} ${price} * ${data?.quantity} = ${currency} ${price * data?.quantity}`}</span>
        </div>
        <div>
          {
            type == 'lineup' &&
            <div onClick={onClose} title='remove' className='hover:bg-red-600/10 active:bg-red-600/20 text-red-600 size-[40px] rounded-full flex justify-center items-center'>
              <BiTrash />
            </div>
          }
        </div>
      </div>
      {(data?.special_instruction|| data?.extraDetail) &&<><div className='w-full border-divider border-t-1 h-0'></div>
        <div className='w-full text-[9px] sm:text-[10px] text-low-text'>
          <span className='font-bold text-sec-text'>Special Instructions : </span> 
          {data?.extraDetail || data?.special_instruction}
        </div></>}
    </div>
  )
}

export default OrderHistCard
