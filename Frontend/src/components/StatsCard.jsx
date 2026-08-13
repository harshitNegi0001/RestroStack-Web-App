


export default function StatsCard({ color, icon, heading, subHeading, value, isLoading = false }) {
    return (
        <div className={`w-full p-4 bg-card-bg border-t-4  rounded-2xl shadow-black/30 shadow-lg
        flex items-center gap-2 ${isLoading ? 'animate-pulse border-divider' : color}`}>

            <div className="flex flex-col flex-1 gap-0.5 min-w-0">
                {<div className={`text-sec-text/80 ${isLoading?'animate-wave w-[80%] p-1 sm:p-1.5 rounded-2xl my-1':''} font-[600] text-[11px] sm:text-[13px] font-[Rubik] uppercase`}>
                    {!isLoading && heading}
                </div>}
                <div className={`text-main-text font-bold text-[23px] sm:text-2xl ${isLoading?'animate-wave w-[45px] p-2 sm:p-3 rounded-2xl my-1':''}`}>
                    {!isLoading && value}
                </div>
                <div className={` text-low-text/70 text-[9px] sm:text-[10px] ${isLoading?'animate-wave w-[60%] p-0.75 sm:p-1 rounded-2xl my-1':''}`}>
                    {!isLoading &&  subHeading}
                </div>
            </div>


            <div className={`bg-divider/50 rounded-2xl ${isLoading ? 'animate-wave p-4 sm:p-5' : 'p-3'}  w-fit h-fit flex justify-center items-center text-[16px] sm:text-[18px]`}>
                {!isLoading && icon}
            </div>
        </div>
    )
}