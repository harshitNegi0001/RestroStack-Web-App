import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { currencies } from '../utils/clientSideData/setupVariables';
import { BiTrash } from "react-icons/bi";
import BackdropPage from '../components/BackdropPage';
import AlertBox from './ConfirmBox';
import { cancelOrder } from '../Apis/ordersApi';



const OrderHistCard = ({ data, type = 'lineup', onClose, onCancel }) => {
  const { activeResData } = useSelector(state => state.auth);
  const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
  const price = data?.price || data?.activeVariation?.price || 0;
  const [loadingCancleBtn, setLoadingCancelBtn] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false);
  const cancelRunningOrder = async () => {
    
    setLoadingCancelBtn(true);
    await cancelOrder(data?.id, onCancel);
    setLoadingCancelBtn(false);
    setShowConfirm(false);

  }
  return (
    <div className='border-divider border-1 p-2 rounded-lg w-full flex flex-col gap-1'>
      <div className=' w-full flex items-center gap-2'>
        <div className='flex-1 min-w-0 flex flex-col'>
          <span className='text-[12px] w-full truncate font-[500] sm:text-[13px] text-sec-text'>{data?.item_name}</span>
          <span className='text-low-text/70 text-[8px] sm:text-[9px]'>{data?.activeVariation?.variant_name || data?.variant_name}</span>
          <span className='text-active-border text-[9px] sm:text-[10px] font-[500]'>{`${currency} ${price} * ${data?.quantity} = ${currency} ${price * data?.quantity}`}</span>
        </div>
        <div className='flex items-center justify-center'>
          {
            type == 'lineup' ?
              <div onClick={onClose} title='remove' className='hover:bg-red-600/10 active:bg-red-600/20 text-red-600 size-[40px] rounded-full flex justify-center items-center'>
                <BiTrash />
              </div> :
              data?.item_status == 'pending' ?
                <button title='Cancel Order' onClick={() => setShowConfirm(true)}
                  className='w-fit px-2 py-1 rounded-md text-red-600 hover:bg-red-600/10 active:bg-red-600/20 text-[10px] sm:text-[12px]'>
                  Cancel
                </button> :
                <div className={`capitalize w-fit px-2 py-0.5  rounded-xl text-[10px] sm:text-[12px]
              ${(data?.item_status == 'cancelled'|| data?.item_status =='rejected' )? 'border-red-600 bg-red-600/10 text-red-600' : data?.item_status == 'ready' ? 'border-green-600 bg-green-600/10 text-green-600' :(data?.item_status == 'pending' || data?.item_status == 'prepairing')? 'border-orange-600 bg-orange-600/10 text-orange-600':'border-blue-600 bg-blue-600/10 text-blue-600'}`}>
                  {data?.item_status}
                </div>
          }
        </div>
        <BackdropPage isOpen={showConfirm} onClose={() => setShowConfirm(false)} >
          <AlertBox type={'error'} title={'Cancel Order?'} onCancel={() => setShowConfirm(false)}
            loadingBtn={loadingCancleBtn} confirmFunction={cancelRunningOrder} desc={'Are you sure you want to cancel this order?\nThis action cannot be undone.'} />
        </BackdropPage>
      </div>
      {(data?.special_instruction || data?.extraDetail) && <><div className='w-full border-divider border-t-1 h-0'></div>
        <div className='w-full text-[9px] sm:text-[10px] text-low-text'>
          <span className='font-bold text-sec-text'>Special Instructions : </span>
          {data?.extraDetail || data?.special_instruction}
        </div></>}
    </div>
  )
}

export default OrderHistCard
