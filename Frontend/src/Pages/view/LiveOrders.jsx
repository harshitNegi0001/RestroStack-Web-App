import React, { useEffect, useState } from 'react';
import MainPagesHeader from '../../components/MainPagesHeader';
import BackdropPage from '../../components/BackdropPage';
import NoRecentOrders from '../../utils/illustrations/NoRecentOrders';
import NoOrders from '../../utils/illustrations/NoOrders';
import { getKOT } from '../../Apis/ordersApi';
import KitchenOrderCard from '../../components/KitchenOrderCard';

const LiveOrders = () => {
    const [activeOrderType, setActiveOrderType] = useState('all');
    const [allOrders, setAllOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const ordersList = (activeOrderType == 'all') ? allOrders : allOrders.filter(o => o.status == activeOrderType);
    useEffect(() => {
        getInitialData();
    }, []);
    const getInitialData = async () => {
        function successFunction(list) {
            setAllOrders(list);
        }
        setIsLoading(true);
        await getKOT(successFunction);
        setIsLoading(false);
    }
    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center overflow-y-auto show-custom-scrollbar">
            <MainPagesHeader
                pageHeading={'Live Orders'} tagline={'Monitor incoming tickets and update kitchen preparation status.'}
                containBtn={false} btnData={null} />
            {/* <BackdropPage isOpen={openAddTable} onClose={() => setOpenAddTable(false)} >
                <AddNewTable onClose={() => setOpenAddTable(false)} />
            </BackdropPage> */}
            {isLoading ?
                <div className='w-full flex flex-row flex-wrap items-center gap-2 mt-3'>
                    {[1, 2, 3, 4, 5].map(i =>
                        <div key={i}
                            className='w-[65px] py-2.5 sm:w-[95px] sm:py-3 animate-wave rounded-2xl'>

                        </div>)}
                </div> :
                <div className='w-full flex flex-row flex-wrap items-center gap-2 mt-3'>
                    <div onClick={() => setActiveOrderType('all')} className={`${activeOrderType == 'all' ? 'bg-active-border text-white border-0' :
                        'border-1 border-sec-text/80 text-sec-text/80 hover:border-sec-text hover:text-sec-text'}
                    px-3 py-1 rounded-2xl cursor-pointer text-[12px] sm:text-[14px] font-[500]`}>
                        All
                    </div>
                    <div onClick={() => setActiveOrderType('pending')} className={`${activeOrderType == 'pending' ? 'bg-active-border text-white border-0' :
                        'border-1 border-sec-text/80 text-sec-text/80 hover:border-sec-text hover:text-sec-text'}
                    px-3 py-1 rounded-2xl cursor-pointer text-[12px] sm:text-[14px] font-[500] flex items-center gap-1`}>
                        <span className='p-1 sm:p-1.5 rounded-full bg-orange-600'></span>Pending ({allOrders?.reduce((count, o) => (o.status == 'pending') ? count + 1 : count, 0) || 0})
                    </div>
                    <div onClick={() => setActiveOrderType('preparing')} className={`${activeOrderType == 'preparing' ? 'bg-active-border text-white border-0' :
                        'border-1 border-sec-text/80 text-sec-text/80 hover:border-sec-text hover:text-sec-text'}
                    px-3 py-1 rounded-2xl cursor-pointer text-[12px] sm:text-[14px] font-[500] flex items-center gap-1`}>
                        <span className='p-1 sm:p-1.5 rounded-full bg-yellow-600'></span>Preparing ({allOrders?.reduce((count, o) => (o.status == 'preparing') ? count + 1 : count, 0) || 0})
                    </div>
                    <div onClick={() => setActiveOrderType('ready')} className={`${activeOrderType == 'ready' ? 'bg-active-border text-white border-0' :
                        'border-1 border-sec-text/80 text-sec-text/80 hover:border-sec-text hover:text-sec-text'}
                    px-3 py-1 rounded-2xl cursor-pointer text-[12px] sm:text-[14px] font-[500] flex items-center gap-1`}>
                        <span className='p-1 sm:p-1.5 rounded-full bg-green-600'></span>Ready ({allOrders?.reduce((count, o) => (o.status == 'ready') ? count + 1 : count, 0) || 0})
                    </div>
                    <div onClick={() => setActiveOrderType('served')} className={`${activeOrderType == 'served' ? 'bg-active-border text-white border-0' :
                        'border-1 border-sec-text/80 text-sec-text/80 hover:border-sec-text hover:text-sec-text'}
                    px-3 py-1 rounded-2xl cursor-pointer text-[12px] sm:text-[14px] font-[500] flex items-center gap-1`}>
                        <span className='p-1 sm:p-1.5 rounded-full bg-blue-600'></span>Served ({allOrders?.reduce((count, o) => (o.status == 'served') ? count + 1 : count, 0) || 0})
                    </div>
                    <div onClick={()=>setActiveOrderType('rejected')} className={`${activeOrderType=='rejected'?'bg-active-border text-white border-0':
                    'border-1 border-sec-text/80 text-sec-text/80 hover:border-sec-text hover:text-sec-text'}
                    px-3 py-1 rounded-2xl cursor-pointer text-[12px] sm:text-[14px] font-[500] flex items-center gap-1`}>
                    <span className='p-1 sm:p-1.5 rounded-full bg-red-600'></span>Rejected ({allOrders?.reduce((count, o) => (o.status == 'rejected') ? count + 1 : count, 0) || 0})
                </div>
                </div>
            }
            {isLoading ?
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3'>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                            <KitchenOrderCard key={i} isLoading={true} />
                        )
                    }
                </div> :
                ordersList?.length == 0 ?
                    <div className='w-full flex flex-col items-center text-center gap-2 py-3'>
                        <div className="w-full max-w-[380px] px-3">
                            <NoOrders className="w-full" />
                        </div>
                        <div className="text-center mt-0 flex flex-col gap-1.5">
                            <h3 className="text-[17px] sm:text-[19px] font-semibold text-main-text">
                                No Active Orders!
                            </h3>
                            <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                                The queue is currently clear. Any new updates will show up here automatically.
                            </p>
                        </div>
                    </div> :
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                        {
                            ordersList.map(o =>
                                <KitchenOrderCard key={o.id} data={o} setAllOrders={setAllOrders} isLoading={false} />
                            )
                        }
                    </div>
            }

        </div>
    )
}

export default LiveOrders
