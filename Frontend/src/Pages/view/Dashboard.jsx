import { useDispatch, useSelector } from "react-redux";
import MainPagesHeader from "../../components/MainPagesHeader";
import StatsCard from "../../components/StatsCard";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { MdAccessTime } from "react-icons/md";
import { MdOutlineTableBar } from "react-icons/md";
import WaitersSvg from "../../utils/illustrations/WaitersSvg";
import { currencies } from "../../utils/clientSideData/setupVariables";
import { BiRupee } from "react-icons/bi";
import DailyRevenueChart from "../../subComponents/DailyRevenueChart";
import { useEffect } from "react";
import { getInitialDashboardData } from "../../Store/Dashboard/dashboard";


const sampleStatsData = {
    'staff': {
        'color': 'border-t-red-600/70',
        'icon': <HiOutlineUsers className="text-red-600" />,
        'bg-icon': 'bg-red-600/20',
    },
    'order': {
        'color': 'border-t-sky-600/70',
        'icon': <HiOutlineClipboardDocumentList className="text-sky-600" />,
        'bg-icon': 'bg-sky-600/20',
    },
    'time': {
        'color': 'border-t-yellow-600/70',
        'icon': <MdAccessTime className="text-yellow-600" />,
        'bg-icon': 'bg-yellow-600/20',
    },
    'table': {
        'color': 'border-t-purple-600/70',
        'icon': <MdOutlineTableBar className="text-purple-600" />,
        'bg-icon': 'bg-purple-600/20',
    }
}

export default function Dashboard() {
    const { userInfo,activeResData } = useSelector(state => state.auth);
    const {isLoading, active_staff_stats,active_orders_stats,avg_prep_time, table_occupied_stats, most_sold_items,revenue_chart_data} = useSelector(state=>state.dashboard)
    const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
    const currency_icon =currencies.find(c => c.key == activeResData?.currency)?.sign || <BiRupee />;
    const dispatch =useDispatch();
    const total_revenue = revenue_chart_data?.reduce((sum,curr)=>parseFloat(curr.revenue)+sum,0)
    useEffect(()=>{
        dispatch(getInitialDashboardData());
    },[])
    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center overflow-y-auto show-custom-scrollbar">
            <MainPagesHeader
                pageHeading={'Dashboard'}
                tagline={`Welcome back, ${userInfo?.name || 'User'}!`}
                containBtn={false} btnData={null}
            />
            <div className="w-full container mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">

                <StatsCard color={sampleStatsData?.['staff']?.color || 'border-t-divider'}
                    heading={'Active Staff'} subHeading={`${active_staff_stats?.absent_staff||0} Absent`} isLoading={isLoading}
                    icon={sampleStatsData?.['staff']?.icon || <HiOutlineUsers />}
                    value={`${active_staff_stats?.active_staff || 0}/${active_staff_stats?.total_staff||0}`} />
                <StatsCard color={sampleStatsData?.['order']?.color || 'border-t-divider'}
                    heading={'Active Orders'} subHeading={`${active_orders_stats?.completed || 0} completed today`}  isLoading={isLoading}
                    icon={sampleStatsData?.['order']?.icon || <HiOutlineClipboardDocumentList />}
                    value={active_orders_stats?.running || 0} />
                <StatsCard color={sampleStatsData?.['time']?.color || 'border-t-divider'}
                    heading={'Average prep Time'} subHeading={`in Minutes`} isLoading={isLoading}
                    icon={sampleStatsData?.['time']?.icon || <MdAccessTime />}
                    value={'18.2 '} />
                <StatsCard color={sampleStatsData?.['table']?.color || 'border-t-divider'}
                    heading={'Table Occupancy'} subHeading={`${table_occupied_stats?.available||0} free ${table_occupied_stats?.reserved||0} reserved`} isLoading={isLoading}
                    icon={sampleStatsData?.['table']?.icon || <MdAccessTime />}
                    value={`${table_occupied_stats?.occupied||0}/${table_occupied_stats?.total_tables||0}`} />
            </div>
            <div className="w-full flex items-start flex-col md:flex-row gap-3 mt-3">
                <div className={`w-full h-fit md:w-[60%] bg-card-bg shadow-black/30 shadow-lg  rounded-2xl`}>
                    {/* today vs average everyday revenue */}
                    <div className={`w-full rounded-2xl p-3 sm:p-4 flex flex-col gap-2 ${true ? 'bg-green-600/10' : 'bg-red-600/10'}`}>
                        <div className="w-full flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                <span className="font-[Rubik] font-[500] text-sec-text/80 text-[13px] sm:text-[14px] uppercase">
                                    Today's Revenue
                                </span>
                                <div className="font-bold text-[26px] sm:text-[30px] text-main-text">
                                    {currency} {total_revenue??0}
                                </div>
                            </div>
                            <div className="w-fit h-fit p-3 rounded-2xl border-1 border-green-600 bg-green-600/10 text-green-500 text-[16px] sm:text-[18px]">
                               {currency_icon}
                            </div>
                        </div>
                        <div className="w-full mt-2">
                            <DailyRevenueChart currency={currency}/>
                        </div>
                    </div>
                </div>
                <div className={`w-full md:w-[40%] bg-card-bg p-3 sm:p-4 rounded-2xl flex flex-col shadow-black/30 shadow-lg gap-2`}>
                    {/* top sold items 1,2,3 */}
                    <div className="w-full uppercase font-[Rubik] text-sec-text/80 font-[600] text-[11px] sm:text-[13px]">
                        today's top sold
                    </div>
                    {most_sold_items.length>0 ? 
                    <div className="flex w-full p-2 flex-col bg-toast-bg rounded-lg gap-4">
                        <div className="flex items-center gap-1.5 ">
                            <span className="text-[16px] sm:text-[18px]">🥇</span>
                            <div className="size-[35px] md:size-[45px] ">
                                <img src={most_sold_items[0]?.image} alt=""
                                    className="size-full rounded-lg object-cover" />
                            </div>
                            <span className="flex-1 min-w-0 truncate text-[13px] sm:text-[14px] font-[500] text-main-text">{most_sold_items[0]?.name}</span>
                            <span className="text-[10px] md:text-[11px] font-[600] text-low-text/70">+{most_sold_items?.[0]?.total_sold||0} orders</span>
                        </div>
                        {most_sold_items.length>1&&<div className="flex items-center gap-1.5 ">
                            <span className="text-[16px] sm:text-[18px]">🥈</span>
                            <div className="size-[35px] md:size-[45px] ">
                                <img src={most_sold_items[1]?.image} alt="" className="size-full rounded-lg object-cover" />
                            </div>
                            <span className="flex-1 min-w-0 truncate text-[13px] sm:text-[14px] font-[500] text-main-text">{most_sold_items[1]?.name}</span>
                            <span className="text-[10px] md:text-[11px] font-[600] text-low-text/70">+{most_sold_items?.[1]?.total_sold||0} orders</span>
                        </div>}
                        {most_sold_items.length>2&&<div className="flex items-center gap-1.5 ">
                            <span className="text-[16px] sm:text-[18px]">🥉</span>
                            <div className="size-[35px] md:size-[45px] ">
                                <img src={most_sold_items[2]?.image} alt="" className="size-full rounded-lg object-cover" />
                            </div>
                            <span className="flex-1 min-w-0 truncate text-[13px] sm:text-[14px] font-[500] text-main-text">{most_sold_items[2]?.name}</span>
                            <span className="text-[10px] md:text-[11px] font-[600] text-low-text/70">+{most_sold_items?.[2]?.total_sold||0} orders</span>
                        </div>}
                    </div> :
                        <div className='w-full flex flex-col items-center text-center gap-2 py-3'>
                    <div className="w-[70%] max-w-[380px] px-3">
                        <WaitersSvg className="w-full" />
                    </div>
                    <div className="text-center mt-0 flex flex-col gap-1.5">
                        <h3 className="text-[14px] sm:text-[16px] font-semibold text-main-text">
                            Waiting for the First Order!
                        </h3>
                        <p className="text-[10px] sm:text-[11px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                            Waiting for the first order to generate today's top sales data.
                        </p>
                    </div>
                </div>
                    }
                </div>
            </div>
        </div>
    )
}