import { useState } from "react"


export default function SegmentOptions({ options = [],activeOption,setActiveOption,searchValue,setSearchValue}) {
    

    return (
        <div className="w-full flex mt-5">
            {/* page selection options */}
            <div
                className="flex flex-row bg-toast-bg/60 p-1.5 gap-1.5 rounded-4xl text-[11px] md:text-[13px] [*>&]:cursor-pointer max-w-full overflow-x-auto show-custom-scrollbar">
                {options.map(o => <div key={o.id} onClick={() => setActiveOption(o)}
                    className={` ${activeOption.id == o.id ? 'bg-card-bg text-low-text' : 'text-low-text/70 hover:text-low-text'} p-1.5 text-nowrap rounded-2xl flex items-center   gap-1`}>
                    {o.icon} {o.title}
                </div>)}

            </div>

        </div>
    )
}