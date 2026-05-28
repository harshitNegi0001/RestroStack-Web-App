import { useSelector } from "react-redux"
import { NonVegIcon, VegIcon } from "../utils/clientSideData/SvgVariable"
import { currencies } from "../utils/clientSideData/setupVariables";
import { BiPlus } from "react-icons/bi";
import { useRef, useState } from "react";
import { useOutsideClick } from "../utils/coustomHook/useOutsideClick";




function OrderFoodCard({ data, isLoading, setOpenCustomize, setCustomizeData }) {
    const { activeResData } = useSelector(state => state.auth);
    const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
    
    let lowest
    let highest

    data?.price_array?.map(a => {
        lowest = (lowest && lowest < a.price) ? lowest : a.price;
        highest = (highest && highest > a.price) ? highest : a.price
    })
    return (
        <div className={`${isLoading ? 'animate-pulse' : ''} 
        border-divider border-1 rounded-lg shadow-md shadow-black/30
        p-1 sm:p-2  flex flex-row items-start gap-1 sm:gap-2`}>
            <div className={`size-[80px] sm:size-[100px] ${isLoading ? 'animate-wave rounded-lg' : ''}`}>
                {!isLoading && <img src={data?.image} alt="" className="size-[80px] object-cover rounded-lg sm:size-[100px]" />}
            </div>
            {isLoading ?
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="w-[80%] p-1.5 animate-wave rounded-2xl">

                    </div>
                    <div className="w-[100%] p-1 animate-wave rounded-2xl">
                    </div>
                    <div className="w-[100%] p-1 animate-wave rounded-2xl">
                    </div>
                    <div className="w-[60%] p-1 animate-wave rounded-2xl">
                    </div>
                </div> :
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="w-full flex items-center">
                        <div className="flex-1 min-w-0 truncate text-[12px] sm:text-[13px] xl:text-[14px] text-main-text font-[500]">
                            {data?.item_name}
                        </div>
                        <div className="w-fit h-fit" title={`${data?.is_veg ? 'Veg' : 'Non-Veg'}`}>
                            {data?.is_veg ?
                                <VegIcon className="size-[12px] md:size-[14px] xl:size-[16px]" /> :
                                <NonVegIcon className="size-[12px] md:size-[14px] xl:size-[16px]" />}
                        </div>
                    </div>
                    <div className="w-full line-clamp-3 text-[9px]/3 sm:text-[10px]/3 text-low-text/70">
                        {data?.description}
                    </div>
                    <div className="w-full flex items-center gap-1">
                        <div className="w-full truncate text-[14px] sm:text-[15px] font-[500] text-sec-text ">
                            {(lowest<highest)?`${currency}${lowest || 0}-${currency}${highest || 0}`:`${currency}${lowest || 0}`}
                        </div>

                    </div>
                    <div className="w-full flex justify-center">
                        <button  onClick={() => {
                            setOpenCustomize(true);
                            setCustomizeData(data);
                        }}
                            className="w-[120px] py-1 bg-linear-0 text-white font-[500] text-[13px] sm:text-[15px] rounded-lg flex items-center justify-center gap-0.5
                to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99">
                            Add <BiPlus color="white" />
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}

export default OrderFoodCard