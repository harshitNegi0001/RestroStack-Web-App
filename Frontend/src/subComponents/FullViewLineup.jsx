import React, { useEffect } from 'react'
import OrderHistCard from './OrderHistCard';
import { IoClose } from 'react-icons/io5';

const FullViewLineup = ({ pendingOrder, onClose, setPendingOrder, openFullView, loadingKOTbtn, handleSendKOT }) => {

    return (
        <div onClick={(e) => e.stopPropagation()} className={`w-full flex flex-col p-2 gap-2 rounded-t-2xl bg-card-bg h-fit max-h-full 
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
                        <OrderHistCard key={i.id} data={i} type='lineup' onClose={() => setPendingOrder(prev => (prev.filter(item => item.id != i.id)))} />
                    )
                }
            </div>
            <div className='w-full flex justify-center border-t-1 border-divider p-2 items-center'>
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

export default FullViewLineup
