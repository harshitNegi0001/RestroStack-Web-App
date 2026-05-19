import { useState } from "react";






export default function TableTypeSelector({ zonesList=[], activeZone, setActiveZone, isLoading }) {
    const maxShow = 10;
    const [showMore,setShowMore] = useState(false);
    const wrapedZoneList = (showMore)?zonesList:zonesList.slice(0,maxShow);
    return (
        <div className="w-full flex flex-row flex-wrap items-center gap-2 pt-2">
            {
                isLoading ?
                    [1,2,3,4,5,6,7,8,9,10].map(i=>
                    <div key={i} className="p-2 md:p-3 border-1 border-divider rounded-2xl animate-wave w-[60px] md:w-[70px] lg:w-[90px]">
                    </div>) :
                    wrapedZoneList.map(z=>
                    <div key={z.id} onClick={()=>setActiveZone(z.id)}
                    className={`${activeZone!=z.id?'border-divider text-low-text hover:text-sec-text':
                    'bg-active-border border-active-border text-white'}
                    px-2 py-1 text-[12px] border-1  md:text-[14px] rounded-2xl cursor-pointer`}>
                        {z.zone_name}
                    </div>)
            }
            {   zonesList?.length>maxShow &&
                    <button onClick={()=>setShowMore(prev=>!prev)} className="px-2 py-1 rounded-lg text-[10px] md:text-[11px]
                        hover:bg-divider/5 active:border-divider/10
                    text-active-border/70 hover:text-active-border/80 active:text-active-border capitalize">{showMore?'see less':'show more'}</button>
            }
        </div>
    )
}