import { useEffect } from "react"
import { generateBill, getRecentOrders } from "../Apis/ordersApi"
import { useState } from "react"
import { FiClock } from "react-icons/fi";
import OrderHistCard from "./OrderHistCard";
import { count_minutes, timeCount } from "../utils/clientSideData/timeFunctions";
import NoRecentOrders from "../utils/illustrations/NoRecentOrders";
import { useSelector } from "react-redux";
import { currencies } from "../utils/clientSideData/setupVariables";
import { IoReceiptOutline } from "react-icons/io5";
import BillReceiptModal from "./BillReceiptModal";
import { MdOutlinePayments } from "react-icons/md";


export default function TableRecentOrders({ tableId, charges,openPayScreen,setOpenPayScreen,setGeneratedBillData,generatedBillData }) {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [items_list, setItems_list] = useState([]);
    const [openBill, setOpenBill] = useState(false);
    const { activeResData } = useSelector(state => state.auth);
    const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
    const subtotal = items_list?.reduce((sum, i) => (i.item_status != 'cancelled') ? sum + parseFloat(i.price) * parseFloat(i.quantity) : sum, 0);
    const tax = activeResData?.tax || 0;
    const total_tax = parseFloat(subtotal) * tax / 100;
    const min_count = count_minutes(items_list[0]?.occupied_since);
    const table_charges = (charges / 60) * min_count;
    useEffect(() => {
        getInitialValues();
    }, []);

    const getInitialValues = async () => {

        function successFunction(data) {
            setItems_list(data);
        }

        setIsLoading(true);
        await getRecentOrders(tableId, successFunction);
        setIsLoading(false);
    }
    const handlePrintBill = async () => {
        if (generatedBillData) {
            setOpenBill(true);
            return;
        }
        function successFunction(data) {
            // Backend se aayi hui bill details state me save karo
            setGeneratedBillData(data);
            setOpenBill(true);

        }

        setLoadingBtn(true);
        await generateBill(tableId, successFunction);
        setLoadingBtn(false);
    }
    
    return (
        <div className="w-full h-full flex flex-col items-center gap-2 ">
            {isLoading ?
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex justify-between mb-3">
                        <span className="p-2 rounded-2xl w-[45px] animate-wave"></span>
                        <span className="p-2 rounded-2xl w-[45px] animate-wave"></span>

                    </div>
                    {[1, 2, 3, 4].map(i => <div className="w-full h-[45px] rounded-lg animate-wave" key={i}>

                    </div>)}

                    <div className="w-full flex justify-between mt-3">
                        <span className="p-2 rounded-2xl w-[120px] animate-wave"></span>
                        <span className="p-2 rounded-2xl w-[45px] animate-wave"></span>
                    </div>
                    <div className="w-full flex justify-between mt-3">
                        <span className="p-2 rounded-2xl w-[120px] animate-wave"></span>
                        <span className="p-2 rounded-2xl w-[45px] animate-wave"></span>
                    </div>
                    <div className="w-full flex justify-between mt-3">
                        <span className="p-2 rounded-2xl w-[120px] animate-wave"></span>
                        <span className="p-2 rounded-2xl w-[45px] animate-wave"></span>
                    </div>
                    <div className="w-full h-0 border-t-1 border-divider"></div>
                    <div className="w-full flex justify-between mt-3">
                        <span className="p-2.5 rounded-2xl w-[120px] animate-wave"></span>
                        <span className="p-2.5 rounded-2xl w-[45px] animate-wave"></span>
                    </div>
                </div> :
                items_list?.length == 0 ?
                    <div className="w-full flex flex-col gap-1 items-center">
                        <div className="w-full max-w-[380px] px-3">

                            <NoRecentOrders className="w-full" />
                        </div>
                        <div className="text-center mt-0 flex flex-col gap-1.5">
                            <h3 className="text-[17px] sm:text-[19px] font-semibold text-main-text">
                                Nothing to show here!
                            </h3>
                            <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                                Guests at this table haven't placed an order yet. Let's get them started from the Menu.
                            </p>
                        </div>
                    </div> :
                    <div className={`w-full  flex flex-col items-center  gap-2 pt-2`}>
                        <div className="w-full flex items-center justify-between gap-2">
                            <div className="px-2 py-0.5 w-fit h-fit flex items-center rounded-2xl bg-green-600/10 text-green-600 text-[10px] sm:text-[11px] font-[500] gap-1"><span className="p-0.75 rounded-full bg-green-600"></span>Live</div>
                            <span className="flex items-center gap-1 text-low-text/70 bg-toast-bg rounded-2xl px-2 py-0.5 text-[10px] sm:text-[11px]"><FiClock size={'14px'} />{timeCount(items_list[0]?.occupied_since)}</span>
                        </div>
                        <div className="w-full flex flex-col gap-2 mt-2 ">
                            {
                                items_list?.map(i =>
                                    <OrderHistCard key={i.id} data={i} type="recent" onCancel={() => {
                                        setItems_list(prev => (prev.map(item => item.id == i.id ? { ...item, item_status: 'cancelled' } : item)))
                                    }} />
                                )
                            }
                        </div>
                        <div className="flex w-full flex-col items-center gap-1 p-2">
                            <div className="w-full flex justify-between items-center text-[13px] sm:text-[14px] ">
                                <span className="text-low-text">Subtotal</span>
                                <span className="text-sec-text font-[500]"> {currency} {subtotal}</span>
                            </div>
                            <div className="w-full flex justify-between items-center text-[13px] sm:text-[14px] ">
                                <span className="text-low-text">Tax ({tax}%)</span>
                                <span className="text-sec-text font-[500]"> {currency} {total_tax}</span>
                            </div>
                            <div className="w-full flex justify-between items-center text-[13px] sm:text-[14px] ">
                                <span className="text-low-text">Table Charge ({currency}{charges}/h)</span>
                                <span className="text-sec-text font-[500]"> {currency} {table_charges}</span>
                            </div>
                            <div className="w-full h-0 border-t-1 border-divider"></div>
                            <div className="w-full flex justify-between items-center text-[14px] sm:text-[15px] ">
                                <span className="text-low-text">Grand Total </span>
                                <span className="text-sec-text font-[500]"> {currency} {parseFloat(subtotal) + parseFloat(table_charges) + parseFloat(total_tax)}</span>
                            </div>
                        </div>
                        <div className="w-full border-t-1 border-divider h-0"></div>
                        <div className="w-full flex justify-end gap-2">
                            {
                                generatedBillData ?
                                    <>
                                        <button onClick={handlePrintBill} className="w-fit mt-3 px-3 py-2 rounded-lg bg-linear-0 text-white font-[500] text-[12px] sm:text-[13px] flex items-center justify-center gap-1
                                            to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99">
                                            <IoReceiptOutline /> Print Bill
                                        </button>
                                         <button onClick={()=>setOpenPayScreen(true)} className="w-fit mt-3 px-3 py-2 rounded-lg bg-linear-0 text-white font-[500] text-[12px] sm:text-[13px]  flex items-center justify-center gap-1
                                            to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99">
                                            <MdOutlinePayments /> Handle Payment
                                        </button>
                                    </> :
                                    <button disabled={loadingBtn}
                                    onClick={handlePrintBill}
                                        className={`w-fit mt-3 px-3 py-2 rounded-lg bg-linear-0 text-white text-[11px] sm:text-[13px] font-[500] flex items-center justify-center                        
                                            ${loadingBtn ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}
                                    >
                                        {loadingBtn ? <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg> : null}
                                        {
                                            loadingBtn ? <span className='text-white/80'>Processing...</span> : 'Generate Bill'
                                        }

                                    </button>
                            }


                        </div>
                    </div>}
                    {
                        openPayScreen
                    }
            {generatedBillData && openBill && (
                <BillReceiptModal
                    billData={generatedBillData}
                    currency={currency}
                    onClose={() => setOpenBill(false)}
                />
            )}

        </div>
    )
}