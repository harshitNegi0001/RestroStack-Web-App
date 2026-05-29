import { useState } from "react";
import { useSelector } from "react-redux"
import OrderFoodCard from "./OrderFoodCard";






export default function TableOrderFood({ setOpenCustomize,setCustomizeData}) {
    const { isLoading, menu } = useSelector(state => state.menu);
    const [activeCat, setActiveCat] = useState(menu?.[0]?.id);
    

    return (
        <div className="w-full flex flex-col gap-2">
            <div className={`w-full flex flex-row overflow-x-auto show-custom-scrollbar items-center gap-2 pt-2`}>
                {
                    isLoading ?
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                            <div key={i} className="p-2 md:p-3 border-1 border-divider rounded-2xl animate-wave w-[60px] md:w-[70px] lg:w-[90px]">
                            </div>) :
                        menu.map(c =>
                            <div key={c.id}
                                onClick={() => setActiveCat(c.id)}
                                className={`${activeCat != c.id ? 'border-divider text-low-text hover:text-sec-text' :
                                    'bg-active-border border-active-border text-white'}
                                px-2 py-1 flex text-nowrap text-[12px] border-1  md:text-[14px] rounded-2xl cursor-pointer`}>
                                {c.category_name}
                            </div>

                        )
                }
                
            </div>
            <div className={`w-full flex flex-col relative gap-1 ${isLoading?'mask-bottom-fade':''}`}>
                {
                    isLoading ?
                        [1,2,3,4,5].map(i=>
                            <OrderFoodCard key={i} isLoading={true} />
                        ) :
                        menu?.find(c => c.id == activeCat)?.items?.map(i =>
                            <OrderFoodCard key={i.id} data={i} isLoading={false} setOpenCustomize={setOpenCustomize} setCustomizeData={setCustomizeData} />
                        )
                }
            </div>
        </div>
    )
}