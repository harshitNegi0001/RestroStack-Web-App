import React, { useEffect } from 'react'
import OrderHistCard from './OrderHistCard';
import { IoClose } from 'react-icons/io5';

const FullViewLineup = ({pendingOrder,onClose,setPendingOrder,openFullView}) => {
    
    return (
        <div onClick={(e)=>e.stopPropagation()} className={`w-full flex flex-col p-2 gap-2 rounded-t-2xl bg-card-bg h-fit max-h-full 
        ${openFullView ? 'translate-y-0' : 'translate-y-full'} transition-all duration-300`}>
            <div className='w-full  flex justify-between items-center border-b-1 border-divider'>
                <span className='text-[14px] sm:text-[15px] font-[500] text-low-text/70'>Lineup Orders</span>
                <div onClick={onClose} className='size-[40px] hover:bg-divider/10 active:bg-divider/20 rounded-full flex justify-center items-center'>
                    <IoClose />
                </div>
            </div>
            <div className='flex-1 min-h-0 overflow-y-auto show-custom-scrollbar flex flex-col gap-1'>
                {
                pendingOrder?.map(i =>
                    <OrderHistCard key={i.id} data={i} type='lineup' onClose={()=>setPendingOrder(prev=>(prev.filter(item=>item.id!=i.id)))}/>
                )
            }
            </div>
            <div className='w-full flex justify-center border-t-1 border-divider p-2 items-center'>
                <button className={`w-[140px] sm:w-[160px] py-1 bg-linear-0 text-white font-[500] text-[13px] sm:text-[15px] rounded-lg flex items-center justify-center gap-0.5
                to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99`}>Send To Kitchen</button>
            </div>
            
        </div>
    )
}

export default FullViewLineup
