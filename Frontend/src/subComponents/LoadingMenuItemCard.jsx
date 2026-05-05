





export default function LoadingMenuItemCard() {
    return (
        <div className="w-full bg-card-bg animate-pulse rounded-lg p-2 md:p-3 xl:p-4
        flex flex-col items-center gap-0.5 md:gap-1">
            <div className="w-full aspect-square rounded-lg animate-wave mb-2 md:mb-3">

            </div>
            <div className="w-full flex items-center gap-0.5">
                <span className="flex-1 min-w-0 h-[12px] md:h-[13px] rounded-lg animate-wave">
                </span>
                <div className="size-[16px] md:size-[18px] animate-wave rounded" >
                </div>
            </div>
            <div className="w-full flex flex-col gap-0.5">
                <span className="w-full h-[10px] md:h-[11px] rounded-lg animate-wave"></span>
                <span className="w-full h-[10px] md:h-[11px] rounded-lg animate-wave"></span>
                <span className="w-[50%] h-[10px] md:h-[11px] rounded-lg animate-wave"></span>
            </div>
            <div className="mt-2"></div>
            {
                [1,2,3].map(i=>
                    <div className="w-full flex justify-between items-center gap-1">
                        <span className="w-[50%] rounded-lg animate-wave h-[10px] "></span>
                        <span className="w-[20%] rounded-lg animate-wave h-[10px] "></span>
                    </div>
                )
            }
        </div>
    )
}