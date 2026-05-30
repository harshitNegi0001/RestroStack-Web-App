import { useEffect } from "react"
import { getRecentOrders } from "../Apis/ordersApi"
import { useState } from "react"
import { FiClock } from "react-icons/fi";
import OrderHistCard from "./OrderHistCard";





export default function TableRecentOrders({tableId }){
    const [isLoading,setIsLoading] = useState(false);
    const [items_list,setItems_list ]= useState([]);
    useEffect(()=>{
        getInitialValues();
    },[])

    const getInitialValues =async()=>{
        function successFunction  (data){
            setItems_list(data);
        }

        setIsLoading(true);
        await getRecentOrders(tableId,successFunction); 
        setIsLoading(false);
    }
    return(
        <div className="w-full flex flex-col gap-2 ">
            <div className={`w-full flex-1 min-h-0 flex flex-col overflow-x-auto show-custom-scrollbar gap-2 pt-2`}>
                <div className="w-full flex items-center justify-between gap-2">
                    <div className="px-2 py-0.5 w-fit h-fit flex items-center rounded-2xl bg-green-600/10 text-green-600 text-[10px] sm:text-[11px] font-[500] gap-1"><span className="p-0.75 rounded-full bg-green-600"></span>Live</div>
                    <span className="text-low-text/70 text-[10px] sm:text-[11px]"><FiClock size={'14px'}/>{}</span>
                </div>
                <div className="w-full flex flex-col gap-2 mt-2 ">
                    {
                        items_list?.map(i=>
                            <OrderHistCard key={i.id} data={i} type="recent" />
                        )
                    }
                </div>
            </div>
        </div>
    )
}