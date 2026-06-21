import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { changeOrderStatus } from "../Apis/ordersApi";
import BackdropPage from "./BackdropPage";
import ConfirmCancel from "./ConfirmCancel";

const statusColor = {
  'pending': 'bg-yellow-600/10 hover:bg-yellow-600/20 active:bg-yellow-600/30 text-yellow-600/70 hover:text-yellow-600/80 active:text-yellow-600',
  'preparing': 'bg-green-600/10 hover:bg-green-600/20 active:bg-green-600/30 text-green-600/70 hover:text-green-600/80 active:text-green-600',
}
const borderTagColor = {
  'pending': 'border-orange-600',
  'preparing': 'border-yellow-600',
  'ready': 'border-green-600',
  'served': 'border-blue-600',
  'rejected': 'border-red-600'
}

const KitchenOrderCard = ({ data, setAllOrders, isLoading }) => {

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [openRejectReason, setOpenRejectReason] = useState(false)
  const handleStatusChange = async () => {
    const newStatus = data?.status == 'pending' ? 'preparing' : 'ready';
    function successFunction() {
      setAllOrders(prev => (prev.map(o => o.id == data?.id ? { ...o, status: newStatus } : o)));
    }
    setLoadingBtn(true);
    await changeOrderStatus(data?.id, newStatus, successFunction);
    setLoadingBtn(false);

  }
  const handleRejectItem = async(reason,customReason)=>{
    function successFunction(){
      setAllOrders(prev => (prev.map(o => o.id == data?.id ? { ...o, status: 'rejected' } : o)));
      setOpenRejectReason(false);
    }
    await changeOrderStatus(data?.id, 'rejected', successFunction,reason,customReason);
  }
  return (
    <div className={`${isLoading ? 'animate-pulse h-[120px] bg-toast-bg' : 'bg-card-bg '} 
    w-full rounded-xl shadow-black/30 shadow-md p-3 flex flex-col gap-1 items-center justify-between border-t-4  ${borderTagColor[data?.status]}`}>
      <BackdropPage isOpen={openRejectReason} onClose={() => setOpenRejectReason(false)}>
        <ConfirmCancel onClose={()=>setOpenRejectReason(false)} handleRejectItem={handleRejectItem}/>
      </BackdropPage>
      {!isLoading&&<div className="w-full flex flex-col ">
        <div className="w-full text-[13px]/3.5 sm:text-[15px]/3.5 text-main-text  font-[500]">
          {data?.item_name}
        </div>
        <div className="w-full text-[11px] sm:text-[13px] text-low-text font-[500]">
          {data?.variant_name}
        </div>

        <div className="w-full flex items-center justify-between gap-1 text-[11px] sm:text-[12px]">
          <span className="text-low-text/70">Quantity :</span>
          <span className="flex-1 min-w-0 truncate text-low-text font-[500]">{data?.quantity}</span>
        </div>
        <div className="w-full flex items-center justify-between gap-1 text-[11px] sm:text-[12px]">
          <span className="text-low-text/70">Table :</span>
          <span className="flex-1 min-w-0 truncate text-low-text font-[500]">{data?.table_name}</span>
        </div>

        {data?.instruction && <div className="w-full mt-1 flex flex-col text-[11px] sm:text-[12px] text-low-text/70">
          Customer Demand :
          <div className="w-full line-clamp-3 bg-divider/40 px-2 py-1 rounded-md  text-sec-text font-[500]">
            {data?.instruction}
          </div></div>
        }
      </div>}

      {
        (data?.status == 'pending' || data?.status == 'preparing') &&
        <div className='w-full flex items-center gap-2 mt-3'>
          <button onClick={handleStatusChange} className={`capitalize ${statusColor?.[data?.status]} flex-1 font-[600] flex justify-center items-center text-center px-3 py-2 rounded-lg text-[12px] sm:text-[14px]`}>
            {loadingBtn ?
              <svg className="animate-spin -ml-1 mr-1 h-4 w-4 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> :
              data?.status == 'pending' ? 'Mark as preparing' : 'Mark as Ready'}
          </button>
          <button onClick={() => setOpenRejectReason(true)} title="Reject" className="w-fit h-fit p-2 rounded-full text-[14px] sm:text-[16px]
           text-red-600/60 hover:text-red-600/70 active:text-red-600 bg-red-600/10 hover:bg-red-600/20 active:bg-red-600/30">
            <IoClose />
          </button>
        </div>
      }



    </div>
  )
}

export default KitchenOrderCard
