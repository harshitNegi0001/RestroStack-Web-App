import { NonVegIcon, VegIcon } from "../utils/clientSideData/SvgVariable"




function OrderFoodCard({ data, isLoading }) {
    return (
        <div className={`${isLoading ? 'animate-pulse' : ''} 
        border-divider border-1 rounded-lg shadow-md shadow-black/30
        p-1 sm:p-2  flex flex-row items-start gap-1 sm:gap-2`}>
            <div className="size-[80px] sm:size-[100px]">
                <img src={data?.image} alt="" className="size-[80px] object-cover rounded-lg sm:size-[100px]" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="w-full flex items-center">
                    <div className="flex-1 min-w-0 truncate text-[12px] sm:text-[13px] xl:text-[14px] text-sec-text">
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
                {
                    data?.price_array?.map(r =>
                        <div key={r.id} className="flex flex-row items-center">
                            <div className="flex-1 min-w-0 truncate text-low-text text-[9px]/4 md:text-[10px]/4">
                                {r.variant_name}
                            </div>
                            {true?<button className="text-[9px] sm:text-[10px] font-[500] text-white px-1 py-0.5 rounded bg-linear-0
                            to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99">
                                Add
                            </button>:
                            <button className="text-[9px] sm:text-[10px] font-[500] text-white px-1 py-0.5 rounded bg-linear-0
                            to-red-500  hover:from-red-700 active:to-red-600 active:from-red-800 from-red-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99">
                                Remove
                            </button>}
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default OrderFoodCard