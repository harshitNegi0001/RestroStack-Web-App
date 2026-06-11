import { IoClose } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import SegmentOptions from "../components/SegmentOptions";
import { useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import TableRecentOrders from "./TableRecentOrders";
import TableOrderFood from "./TableOrderFood";
import { useOutsideClick } from "../utils/coustomHook/useOutsideClick";
import CustomizeDetailBox from "./CustomizeDetailBox";
import PendingCartView from "./PendingCartView";
import FullViewLineup from "./FullViewLineup";
import { sendKOT } from "../Apis/ordersApi";
import TablePayScreen from "./TablePayScreen";

const options = [
    {
        id: 1,
        icon: <FaHistory />,
        title: 'Recent Orders',
        page: 'recent-orders'
    },
    {
        id: 2,
        icon: <BiFoodMenu />,
        title: 'Menu',
        page: 'order-food'
    },
]
const tableStatusColor = {
    'available': 'bg-green-500',
    'reserved': 'bg-purple-500',
    'occupied': 'bg-red-500'
}
export default function FullTablePage({ onClose, tableData = {} }) {
    const [activeOption, setActiveOption] = useState(options[1]);
    const [openCustomize, setOpenCustomize] = useState(false);
    const [customizeData, setCustomizeData] = useState({})
    const [pendingOrder, setPendingOrder] = useState([]);
    const [openFullView, setOpenFullView] = useState(false);
    const [loadingKOTbtn, setLoadingKOTbtn] = useState(false);
    const [openPayScreen, setOpenPayScreen] = useState(false);
    const [generatedBillData, setGeneratedBillData] = useState(null);

    const handleAddToOrder = (item) => {
        setPendingOrder(prev => [...prev, item]);
        setOpenCustomize(false);
        setCustomizeData({});
    }

    const handleSendKOT = async () => {
        function successFunction() {
            setOpenFullView(false);
            setPendingOrder([]);
        }

        const orderData = {
            table_id: tableData?.id,
            items: pendingOrder
        }
        setLoadingKOTbtn(true);
        await sendKOT(orderData, successFunction);
        setLoadingKOTbtn(false);
    }
    return (
        <div
            className="w-[100dvw] h-[100dvh] sm:w-[500px] sm:h-[98dvh]   bg-card-bg sm:rounded-2xl
        flex flex-col gap-0 relative overflow-hidden">
            <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">

                <button onClick={onClose}
                    className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10">
                    <IoArrowBack />
                </button><div className="flex-1 flex flex-col ">
                    <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
                        {tableData?.table_name}
                    </h6>
                    <div className={`text-low-text/70 text-[10px] md:text-[11px] flex items-center gap-1 ${tableStatusColor?.[tableData?.status]}/10 w-fit h-fit px-2 py-0.5 rounded-2xl`}>
                        <span className={`w-2 h-2 rounded-full ${tableStatusColor?.[tableData?.status]}`}> </span>
                        <span className="capitalize" >{tableData?.status}</span>
                    </div>
                </div>

                <button onClick={onClose}
                    className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10">
                    <IoClose />
                </button>
            </div>
            <div className="flex flex-col gap-2  p-4 min-h-0 flex-1 overflow-y-auto show-custom-scrollbar">
                <SegmentOptions options={options} activeOption={activeOption} setActiveOption={setActiveOption} />
                {
                    activeOption?.page == 'recent-orders' && <TableRecentOrders generatedBillData={generatedBillData} setGeneratedBillData={setGeneratedBillData} tableId={tableData?.id} charges={tableData?.hourly_charge} openPayScreen={openPayScreen} setOpenPayScreen={setOpenPayScreen} />
                }
                {
                    activeOption?.page == 'order-food' && <TableOrderFood setOpenCustomize={setOpenCustomize} setCustomizeData={setCustomizeData} />
                }
            </div>
            <div onClick={() => {
                setOpenCustomize(false);
                setCustomizeData({});
            }} className={`absolute w-full h-full
                ${openCustomize ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} flex flex-col justify-end bg-main-text/10 `}>

                <CustomizeDetailBox onClose={() => {
                    setOpenCustomize(false);
                    setCustomizeData({});
                }} openCustomize={openCustomize} data={customizeData}
                    handleAddToOrder={handleAddToOrder} />



            </div>
            <div onClick={() => {
                setOpenFullView(false)
            }} className={`absolute w-full h-full
                ${openFullView ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} flex flex-col justify-end bg-main-text/10 `}>

                <FullViewLineup onClose={() => {
                    setOpenFullView(false)
                }}
                    pendingOrder={pendingOrder}
                    setPendingOrder={setPendingOrder}
                    openFullView={openFullView} handleSendKOT={handleSendKOT}
                    loadingKOTbtn={loadingKOTbtn} 
                    />



            </div>
            <div onClick={() => {
                setOpenPayScreen(false)
            }} className={`absolute w-full h-full
                ${openPayScreen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} flex flex-col justify-end bg-main-text/10 `}>

                <TablePayScreen
                    onClose={() => {
                        setOpenPayScreen(false)
                    }}
                    generatedBillData={generatedBillData}
                    openPayScreen={openPayScreen}
                    data={null}
                    closeTable={onClose}
                />



            </div>
            <div className={`${pendingOrder?.length > 0 ? 'flex' : 'hidden'} items-center p-2 border-t-1 border-divider`}>
                <PendingCartView pendingOrder={pendingOrder} setPendingOrder={setPendingOrder}
                    openFullView={openFullView} setOpenFullView={setOpenFullView}
                    loadingKOTbtn={loadingKOTbtn} handleSendKOT={handleSendKOT} />
            </div>
        </div>
    )
}