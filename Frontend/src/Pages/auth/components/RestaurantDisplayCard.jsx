
import { LuBuilding2 } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";



export default function RestaurantDisplayCard({ onClick, isActive = false, data }) {

    return (
        <div onClick={onClick}
            className={`w-full rounded-2xl border-1 flex gap-2 p-2
            ${isActive ? 'border-active-border bg-active-border/10' : 'border-divider bg-transparent hover:border-active-border/50 active:border-active-border hover:bg-active-border/5 active:bg-active-border/10'}
        `}>
            <div
                className={`size-[50px] text-green-500 bg-green-500/20 flex justify-center items-center  lg:size-[60px]   rounded-2xl 
                         text-[22px] md:text-[26px] lg:text-[28px] `}>
                {/* {} */}
                {data.logo ?
                    <img src={data.logo} alt=""
                        className="size-[65%] object-contain" />
                    : <LuBuilding2 />}
            </div>
            <div
                className="flex-1 min-w-0 flex flex-col items-start text-start gap-1 ">

                <span className="w-full text-sec-text truncate text-[16px] md:text-[17px] lg:text-[18px] font-[600]">
                    {data.name}
                </span>

                <div className="flex items-center gap-4 text-sec-text/80 w-full truncate text-[11px] md:text-[12px] lg:text-[13px] ">
                    <div className="flex items-center gap-1">
                        <FaUsers />
                        {data.total_emp} employees
                    </div>
                    <div className="flex items-center gap-1">
                        <IoRestaurant />
                        {data.type}
                    </div>

                </div>
                <div className="flex  items-center gap-1 text-sec-text/80 w-full truncate text-[11px] md:text-[12px] lg:text-[13px] ">

                    <IoLocationSharp className="shrink-0" />

                    <span className="truncate">
                        {data.location}
                    </span>
                </div>

            </div>
        </div>
    )
}