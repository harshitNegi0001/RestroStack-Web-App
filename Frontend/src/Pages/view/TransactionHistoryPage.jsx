import React, { useState } from 'react'
import MainPagesHeader from '../../components/MainPagesHeader';
import { MdCurrencyExchange } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import SubStatsCard from '../../components/SubStatsCard';
import { IoSearch } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../index.css';
import TransactionHistTableCard from '../../components/TransactionHistTableCard';
import { useEffect } from 'react';
import { getFilteredOrderHist } from '../../Apis/billsApi';
import { useSelector } from 'react-redux';
import { currencies } from '../../utils/clientSideData/setupVariables';
import MobileScreenBillHistView from '../../components/MobileScreenBillHistView';
import NoTransactions from '../../utils/illustrations/NoTransactions';


const filterTimeline = [
    {
        id: 1,
        title: 'Today',
        value: 'today'
    },
    {
        id: 2,
        title: 'Yesterday',
        value: 'yesterday'
    },
    {
        id: 3,
        title: 'This week',
        value: 'week'
    },
    {
        id: 4,
        title: 'This Month',
        value: 'month'
    },
    {
        id: 5,
        title: 'This Year',
        value: 'year'
    },
    {
        id: 6,
        title: 'Custom Timeline',
        value: 'custom'
    },
]
const TransactionHistoryPage = () => {

    const [searchValue, setSearchValue] = useState('');
    const [timeline, setTimeline] = useState('week');
    const [customTimeline, setCustomTimeline] = useState({
        from: null,
        to: null
    });
    const [perPage,setPerPage] = useState(5);
    const [activePage,setActivePage] = useState(1);
    const [subStatsData, setSubStatsData] = useState({
        'total_revenue': 0,
        'total_orders': 0
    });
    const [bounceSearch, setBounceSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const { activeResData } = useSelector(state => state.auth);
    const currency = currencies.find(c => c.key == activeResData?.currency)?.sign || '₹';
    const subCards = [
        {
            id: 1,
            title: 'Total Revenue',
            value: subStatsData?.total_revenue,
            icon: currency,
            color: 'green'
        },
        {
            id: 2,
            title: 'Total Order',
            value: subStatsData?.total_orders,
            icon: <MdOutlineShoppingCartCheckout />,
            color: 'blue'
        },
    ]

    useEffect(() => {
        const bouncingTimer = setTimeout(() => {
            setBounceSearch(searchValue);
        }, [2000])
        return () => {
            clearTimeout(bouncingTimer);
        }
    }, [searchValue]);
    useEffect(() => {
        if (timeline == 'custom' && (!customTimeline?.from || !customTimeline?.to)) {
            return;
        }
        getTableData();
    }, [bounceSearch, timeline, customTimeline])

    const getTableData = async () => {
        function successFunction(tableData, statsData) {
            setTableData(tableData);
            setSubStatsData(statsData)
        }

        setIsLoading(true);
        await getFilteredOrderHist({ timeline, customTimeline, searchQuery: bounceSearch }, successFunction);
        setIsLoading(false);
    }
    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center overflow-y-auto show-custom-scrollbar">
            <MainPagesHeader
                pageHeading={'Transaction History'} tagline={'View detailed sales and performance of items'}
                containBtn={false} btnData={null} />
            <div className='w-full container mt-5 grid grid-cols-2 md:grid-cols-4 gap-2'>
                {
                    subCards.map(s =>
                        <SubStatsCard data={s} key={s.id} isLoading={isLoading} />
                    )
                }
            </div>
            <div className='w-full p-2 sm:p-3 rounded-2xl border-1 border-divider/50 bg-card-bg/60 gap-3 flex flex-wrap items-center'>
                {/* Filter options */}
                <div
                    className='w-[100%] max-w-[350px] md:max-w-[450px]: flex flex-col gap-1 relative'>


                    <label htmlFor='search-input'
                        className='absolute bottom-1 left-1  text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[25px]  text-[20px] '>
                        <IoSearch />
                    </label>
                    <input id='search-input'
                        value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search by item or category name...'
                        autoComplete='input-item-name'
                        className='outline-divider bg-toast-bg/60
                                                     focus:outline-2 pl-9  focus:outline-active-border outline-1 border-0
                                                    rounded-lg p-1.5  text-main-text text-[13px] sm:text-[14px] ' />
                </div>
                <div className="flex flex-row flex-wrap gap-2 mr-4">
                    <div
                        className='w-[200px] flex flex-col gap-1 relative'>

                        <select id="role-input"
                            value={timeline} onChange={(e) => setTimeline(e.target.value)}
                            className='outline-divider bg-toast-bg/60
                                                border-0 focus:outline-2 focus:outline-active-border outline-1 
                                                rounded-lg p-1.5 text-main-text text-[16px] '>
                            {filterTimeline.map(t =>
                                <option key={t.id} value={t.value}
                                    className="bg-main-bg ">
                                    {t.title}
                                </option>
                            )}
                        </select>

                    </div>
                </div>
                {timeline == 'custom' && <div className='flex flex-row gap-2 items-center flex-wrap'>
                    <div className='sm:w-[160px] w-[120px]'>
                        {/* <input type="date" name="" id=""
                            value={formatDateForInput(customTimeline?.from)}
                            onChange={(e) => setCustomTimeline(prev => ({ ...prev, from: e.target.value }))}

                            className='w-full p-1 border-0 outline-1 outline-divider rounded-lg bg-toast-bg/60
                                focus:outline-2 focus:outline-active-border text-main-text text-[13px] sm:text-[14px]' /> */}
                        <DatePicker
                            selected={customTimeline?.from}
                            onChange={(date) => setCustomTimeline(prev => ({ ...prev, from: date }))}
                            // 1. Format jo user ko screen par dikhega
                            dateFormat="dd/MM/yyyy"
                            // 2. Placeholder text
                            placeholderText="DD/MM/YYYY"
                            calendarClassName="custom-datepicker-popover"
                            // 3. Tailwind CSS Classes Customization ke liye
                            className="sm:w-[160px] w-[120px] px-1 py-2 border-0 outline-1 outline-divider rounded-lg bg-toast-bg/60
                                focus:outline-2 focus:outline-active-border text-main-text text-[13px] sm:text-[14px] "
                        />
                    </div>
                    <span className='text-low-text text-[12px] sm:text-[13px]'>To</span>
                    <div className='sm:w-[160px] w-[120px]  '>

                        <DatePicker
                            selected={customTimeline?.to}
                            onChange={(date) => setCustomTimeline(prev => ({ ...prev, to: date }))}
                            // 1. Format jo user ko screen par dikhega
                            dateFormat="dd/MM/yyyy"
                            // 2. Placeholder text
                            placeholderText="DD/MM/YYYY"
                            calendarClassName="custom-datepicker-popover"
                            // 3. Tailwind CSS Classes Customization ke liye
                            className="sm:w-[160px] w-[120px]  px-1 py-2 border-0 outline-1 outline-divider rounded-lg bg-toast-bg/60
                                focus:outline-2 focus:outline-active-border text-main-text text-[13px] sm:text-[14px]"
                        />
                    </div>
                </div>}
            </div>

            {(!isLoading && tableData.length == 0) ?

                <div className='w-full flex flex-col items-center text-center gap-2 py-3'>
                    <div className="w-full max-w-[380px] px-3">
                        <NoTransactions className="w-full" />
                    </div>
                    <div className="text-center mt-0 flex flex-col gap-1.5">
                        <h3 className="text-[17px] sm:text-[19px] font-semibold text-main-text">
                            No Active Orders!
                        </h3>
                        <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                            The queue is currently clear. Any new updates will show up here automatically.
                        </p>
                    </div>
                </div>
                :
                <div className='w-full flex items-center justify-center'>
                    <TransactionHistTableCard isLoading={isLoading} tableData={tableData} type={'default'} />
                    <MobileScreenBillHistView isLoading={isLoading} tableData={tableData} type={'default'} />
                </div>}

        </div>
    )
}

export default TransactionHistoryPage
