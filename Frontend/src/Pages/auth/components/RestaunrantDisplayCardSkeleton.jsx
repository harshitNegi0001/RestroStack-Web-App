
export default function RestaurantDisplayCardSkeleton() {

    return (
        <div
            className={`w-full rounded-2xl border-1 bg-divider/30 flex gap-2 p-2 border-divider bg-transparent hover:border-active-border/50 active:border-active-border/50 hover:bg-active-border/5 active:bg-active-border/5
            
        `}>
            <div
                className={`size-[50px]  lg:size-[60px]   rounded-2xl animate-wave `}>
                
            </div>
            <div
                className="flex-1 min-w-0 flex flex-col items-start text-start gap-1 ">

                <span className="w-[70%] rounded-2xl truncate h-[16px] md:h-[17px] lg:h-[18px] animate-wave">
                    
                </span>

                <div className=" w-full flex items-center gap-4 text-sec-text/80 w-full truncate h-[11px] md:h-[12px] lg:h-[13px] ">
                    <div className=" w-[50px] rounded-2xl h-full animate-wave">
                       
                    </div>
                    <div className=" w-[50px] rounded-2xl h-full animate-wave">
                       
                    </div>

                </div>
                <div className="w-[130px] rounded-2xl h-[11px] md:h-[12px] lg:h-[13px] animate-wave ">


                    <span className="truncate">
                    </span>
                </div>

            </div>
        </div>
    )
}