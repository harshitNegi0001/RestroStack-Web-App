import { useState } from "react";
import FullTablePage from "./FullTablePage";
import { LuArmchair } from "react-icons/lu";
import BackdropPage from "../components/BackdropPage";


const tableStatusColor = {
    'available': 'bg-green-500/10 border-green-500/70 hover:bg-green-500/20 border-2 ',
    'reserved': 'bg-purple-500/10 border-purple-500/70 hover:bg-purple-500/20 border-2 ',
    'occupied': 'bg-red-500/10 border-red-500/70 hover:bg-red-500/20 border-2 '
}

export default function TableCard({ isLoading, data = {} }) {
    const [openfullTable, setOpenFullTable] = useState(false);

    return (
        <>
            <BackdropPage onClose={(e) => {
                e.stopPropagation();
                setOpenFullTable(false);
            }} isOpen={openfullTable} >
                <FullTablePage onClose={() => setOpenFullTable(false)} tableData={data} />
            </BackdropPage>
            <div onClick={() => setOpenFullTable(true)}
                className={`${isLoading ? 'animate-wave' : tableStatusColor?.[data?.status]} 
                    w-full p-2 rounded-md aspect-square flex flex-col cursor-pointer`}>
                <div className="w-full truncate text-sec-text text-[11px] sm:text-[12px] lg:text-[13px]">
                    {data?.table_name}
                </div>
                <div title="Seats" className="w-full flex gap-0.5 items-center text-low-text text-[10px] sm:text-[10px] lg:text-[11px]">
                    <LuArmchair />{data?.capacity}
                </div>
                <div className={`text-[10px] sm:text-[11px] capitalize text-sec-text flex gap-1 items-center w-full truncate`}>
                    <span className={`p-1 w-fit h-fit rounded-full ${data?.status=='available'?'bg-green-600':data?.status=='occupied'?'bg-red-600':data?.status=='reserved'?'bg-purple-600':'bg-sec-text'}`}></span>{data?.status}
                </div>
            </div>
        </>

    )
}