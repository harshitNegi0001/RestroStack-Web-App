import React, { useState } from 'react'
import { IoArrowBack, IoClose } from 'react-icons/io5'
import { rejectionOption } from '../utils/clientSideData/rejectionReasons';
import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
const ConfirmCancel = ({ onClose,handleRejectItem}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [loadingBtn,setLoadingBtn] = useState(false);
  const [customReason, setCustomReason] = useState('');
  const openCustomReason = rejectionReason == 'other';
  const disableBtn = !rejectionReason ||(rejectionReason=='other' && !customReason)
  const handleConfirm =async()=>{
      setLoadingBtn(true);
      await handleRejectItem(rejectionReason,customReason);
      setLoadingBtn(false);
  }
  return (
    <div className="w-[100dvw] h-[100dvh] sm:w-[500px] sm:h-fit max-h-[100dvh]  bg-card-bg sm:rounded-2xl
        flex flex-col">
      <div className='p-3 flex w-full justify-start gap-2 sm:justify-between items-center p-3 border-b-1 border-divider'>
        <button onClick={onClose}
          className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                        hover:bg-main-text/5 active:bg-main-text/10">
          <IoArrowBack />
        </button>
        <h6 className="flex-1 text-main-text text-[14px] md:text-[16px] font-[500] capitalize">
          {`Reject Order`}
        </h6>

        <button onClick={onClose}
          className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                        hover:bg-main-text/5 active:bg-main-text/10">
          <IoClose />
        </button>
      </div>
      <div className='flex-1 w-full p-4 flex flex-col gap-2 overflow-y-auto show-custom-scrollbar'>
        <div className='w-full  text-[10px] sm:text-[11px] text-low-text/70'>
          Select a reason to reject or cancel order
        </div>
        {
          rejectionOption.map(r =>
            <div onClick={() => setRejectionReason(r.value)} key={r.id}
              className={`w-full rounded-lg ${rejectionReason == r.value ? 'border-red-600 bg-red-600/30 text-red-600'
                : 'border-divider bg-sec-text/10 text-sec-text hover:bg-red-600/10 hover:border-red-600/30'} 
              p-2 capitalize border-1 flex items-center gap-2 cursor-pointer text-[12px] sm:text-[13px]`}>
              {
                r.value != rejectionReason ?
                  <FaRegCircle /> :
                  <FaRegDotCircle />
              }
              {r.label}
            </div>
          )
        }

        {
          openCustomReason &&
          <div className='w-full pt-2 flex flex-col gap-0 relative mb-2'>

            <div
              className='w-[100%] flex flex-col gap-1 relative'>
              
              <input id='reason-input' type="text"
                value={customReason} onChange={(e) => setCustomReason(e.target.value)}
                placeholder='Reason here' required
                className={`${!customReason?.trim() ? 'outline-red-600' : 'outline-divider '}
                  outline-1 focus:outline-2 focus:outline-active-border focus:border-active-border outline-0 
                  rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
            </div>
            { !customReason?.trim()&&
              <span className='text-red-500 text-[8px] w-full text-start md:text-[10px] pl-1 whitespace-pre-line absolute top-[102%]' >Reason can not be blank</span>}
          </div>
        }
      </div>
      <div className='p-3 flex w-full border-t-1 border-divider items-center justify-evenly'>
        <button onClick={onClose} className='w-[45%] rounded-lg text-sec-text hover:bg-main-text/10 active:bg-main-text/20 py-1.25 sm:py-1.5 font-[500] text-[14px] sm:text-[15px]'>
          Cancel
        </button>
        <button disabled={disableBtn} onClick={handleConfirm}
        className={`${(disableBtn || loadingBtn) ?'bg-divider text-low-text/70 cursor-not-allowed':
          'bg-linear-0 from-red-600 to-red-500 shadow-black/30 shadow-md hover:shadow-lg hover:from-red-700 active:to-red-600 hover:scale-101 active:scale-99 active:shadow-sm text-white'}
        w-[45%]  rounded-lg py-1.25 sm:py-1.5 font-[500] text-[14px] sm:text-[15px]`}>
          Confirm Reject
        </button>
      </div>
    </div>
  )
}

export default ConfirmCancel
