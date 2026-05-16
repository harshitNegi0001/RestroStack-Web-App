
import { LuBuilding2 } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";



export default function RestaurantDisplayCard({ onClick, isActive = false, data }) {

    return (
        <div onClick={onClick}
            className={`w-full rounded-2xl border-1 flex gap-2 p-2 cursor-pointer
            ${isActive ? 'border-active-border bg-active-border/10' : 'border-divider bg-transparent hover:border-active-border/50 active:border-active-border hover:bg-active-border/5 active:bg-active-border/10'}
        `}>
            <div
                className={` text-active-border bg-active-border/10 flex justify-center items-center  size-[45px] md:size-[55px]  rounded-2xl 
                         text-[22px] md:text-[26px] lg:text-[28px] `}>
                {data.res_logo ?
                    <img src={data.res_logo} alt=""
                        className="size-[40px] md:size-[50px] rounded-2xl object-center object-contain" />
                    : <LuBuilding2 />}
            </div>
            <div
                className="flex-1 min-w-0 flex flex-col items-start text-start gap-1 ">

                <span className="w-full text-sec-text truncate text-[16px] md:text-[17px] lg:text-[18px] font-[600]">
                    {data.res_name}
                </span>

                <div className="flex items-center gap-4 text-sec-text/80 w-full truncate text-[11px] md:text-[12px] lg:text-[13px] ">
                    <div className="flex items-center gap-1">
                        <FaUsers />
                        {data.emp_count} employees
                    </div>
                    <div className="flex items-center gap-1">
                        <IoRestaurant />
                        {data.res_type}
                    </div>

                </div>
                <div className="flex  items-center gap-1 text-sec-text/80 w-full truncate text-[11px] md:text-[12px] lg:text-[13px] ">

                    <IoLocationSharp className="shrink-0" />

                    <span className="truncate">
                        {data.full_address}
                    </span>
                </div>

            </div>
        </div>
    )
}