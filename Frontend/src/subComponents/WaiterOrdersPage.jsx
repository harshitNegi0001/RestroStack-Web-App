import React, { useState } from 'react'
import { IoArrowBack, IoClose } from 'react-icons/io5';
import NoOrders from '../utils/illustrations/NoOrders';
import { useEffect } from 'react';
import { changeOrderStatus, getWaiterOrders } from '../Apis/ordersApi';


const statusColors = {
  'pending': 'bg-orange-600/20 text-orange-600',
  'preparing': 'bg-yellow-600/20 text-yellow-600',
  'ready': 'bg-green-600/20 text-green-600',
  'served': 'bg-blue-600/20 text-blue-600',
  'rejected': 'bg-red-600/20 text-red-600',
  'cancelled': 'bg-red-600/20 text-red-600',
}
const WaiterOrdersPage = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ordersList, setOrdersList] = useState([]);
  const [loadingBtn,setLoadingBtn] = useState(null);
  useEffect(() => {
    getInitialValue();
  }, [])

  const getInitialValue = async () => {
    function successFunction(data) {
      setOrdersList(data);
    }
    setIsLoading(true);
    await getWaiterOrders(successFunction);
    setIsLoading(false);
  }
  const handleChangeStatus =async(orderId,oldStatus)=>{
    if(oldStatus!='ready'&&oldStatus!='pending'){
      return;
    }
    const newStatus = oldStatus =='ready'?'served':'cancelled';
    function successFunction(){
      setOrdersList(prev=>prev.map(o=>o.id==orderId?{...o,status:newStatus}:o))
    }
    setLoadingBtn(orderId);
    await changeOrderStatus(orderId,newStatus,successFunction);
    setIsLoading(null);
  }
  return (
    <div className="w-[100dvw] h-[100dvh] sm:w-[500px] sm:h-[98dvh]   bg-card-bg sm:rounded-2xl
        flex flex-col gap-0 relative overflow-hidden ">
      <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">
        <button onClick={onClose}
          className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10">
          <IoArrowBack />
        </button><div className="flex-1 flex flex-col ">
          <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
            My Orders
          </h6>
          <div className='text-low-text/70 text-[10px] sm:text-[12px]'>
            Manage your today's orders.
          </div>

        </div>

        <button onClick={onClose}
          className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10">
          <IoClose />
        </button>
      </div>
      <div className='w-full p-3 flex-1 min-h-0 flex flex-col items-center gap-2 overflow-y-auto show-custom-scrollbar'>
        {
          isLoading ?
            [1, 2, 3, 4, 5].map(i =>
              <div key={i} className='w-full p-2 rounded-2xl border-1 border-divider flex flex-col gap-2 items-center animate-pulse'>
                <div className='w-full flex flex-col gap-1'>
                  <div className='w-[70%] sm:w-[50%] py-1.5 animate-wave rounded-2xl'></div>
                  <div className='w-[50px] rounded-2xl p-2 animate-wave'></div>
                  <div className='w-[50%] sm:w-[40%] py-1 animate-wave rounded-2xl'></div>
                  <div className='w-[50%] sm:w-[40%] py-1 animate-wave rounded-2xl'></div>

                </div>
                <div className='w-full border-t-1 h-0 border-divider'></div>
                <div className='w-[130px] h-[30px] animate-wave rounded-lg'>

                </div>
              </div>
            ) :
            ordersList?.length == 0 ?
              <div className='w-full flex flex-col items-center text-center gap-2 py-3'>
                <div className="w-full max-w-[380px] px-3">
                  <NoOrders className="w-full" />
                </div>
                <div className="text-center mt-0 flex flex-col gap-1.5">
                  <h3 className="text-[17px] sm:text-[19px] font-semibold text-main-text">
                    No running orders
                  </h3>
                  <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                    Currently you're not surving any table.
                  </p>
                </div>
              </div> :
              ordersList.map(o =>
                <div key={o.id} className='w-full p-2 rounded-2xl border-1 border-divider flex flex-col gap-0.5'>
                  <div className='w-full flex items-center gap-2'>
                    <div className="flex-1 min-w-0 text-[13px]/3.5 sm:text-[15px]/3.5 text-main-text truncate  font-[500]">
                      {o?.item_name}
                    </div>
                    <div className={`w-fit capitalize px-2 py-0.5 rounded-2xl ${statusColors[o.status]} text-[10px] sm:text-[11px]`}>
                      {o?.status}
                    </div>
                  </div>
                  <div className="w-full text-[11px] sm:text-[13px] text-low-text font-[500]">
                    {o?.variant_name}
                  </div>
                  <div className="w-full flex items-center justify-between gap-1 text-[11px] sm:text-[12px]">
                    <span className="text-low-text/70">Quantity :</span>
                    <span className="flex-1 min-w-0 truncate text-low-text font-[500]">{o?.quantity}</span>
                  </div>
                  <div className="w-full flex items-center justify-between gap-1 text-[11px] sm:text-[12px]">
                    <span className="text-low-text/70">Table :</span>
                    <span className="flex-1 min-w-0 truncate text-low-text font-[500]">{o?.table_name}</span>
                  </div>
                  {
                    (o.status == 'pending' || o.status == 'ready') &&
                    <>
                      <div className='w-full border-t-1 h-0 border-divider'></div>
                      <div className='w-full flex justify-center items-center py-2'>
                        <button onClick={()=>handleChangeStatus(o.id,o.status)} className={`capitalize ${o?.status=='pending'?'bg-red-600/10 text-red-600 hover:bg-red-600/20':'bg-blue-600/10 text-blue-600 hover:bg-blue-600/20'} w-[150px] font-[600] flex justify-center items-center text-center px-3 py-2 rounded-lg text-[12px] sm:text-[14px]`}>
                          {loadingBtn == o.id ?
                            <svg className="animate-spin -ml-1 mr-1 h-4 w-4 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> :
                            o?.status == 'pending' ? 'Cancel the Order' : 'Mark as Served'}
                        </button>
                      </div>
                    </>
                  }

                </div>
              )
        }
      </div>
    </div>
  )
}

export default WaiterOrdersPage;
