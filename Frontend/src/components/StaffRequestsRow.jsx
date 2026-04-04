import { useState } from "react"
import { BsCheck } from "react-icons/bs";
import { FaChevronDown, FaUser } from "react-icons/fa6"
import { MdCancel } from "react-icons/md";




export default function StaffRequestRow({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col ">


            <div onClick={() => setIsOpen(prev => !prev)}
                className="p-2 w-full border-t-1 border-divider flex flex-row justify-between gap-2 hover:bg-divider/20 active:bg-divider20">
                <div className="flex flex-1 min-w-0 gap-2 items-center ">
                    {data?.user_data?.image?
                    <img src={data?.user_data?.image} alt="" 
                    className="size-[40px] rounded-full object-cover"/>
                    :<div className="size-[40px] rounded-full bg-active-border/20 flex items-center justify-center text-gray-500 text-[18px]">
                        <FaUser />
                    </div>}
                    <div className="flex flex-col flex-1 min-w-0 text-sec-text text-[14px] md:text-[15px]">
                        <div className="min-w-0 w-full truncate">{data?.user_data?.name}</div>
                        <div className=" flex gap-1 items-center text-[11px] md:text-[12px] text-low-text/70">
                            <span>01-Apr-2026 ,</span>
                            <span>10:07 AM</span>
                        </div>
                    </div>
                </div>

                <div className={`flex justify-center items-center text-[14px] text-low-text/70 p-2 rounded-full
            hover:bg-divider/20 active:bg-divider/30 hover:text-sec-text active:text-sec-text ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <FaChevronDown />
                </div>
            </div>
            <div className={`overflow-hidden ${isOpen ? 'h-[260px] md:h-[230px]' : 'h-0'}
                transition-all duration-300 flex flex-col gap-2 `}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 md:p-3">
                    <div className="w-full border-1 border-divider rounded-2xl p-2 flex flex-col text-[12px] md:text-[13px]">
                        <span className="text-low-text/70">Email</span>
                        <span className="text-sec-text w-full min-w-0 truncate">{data?.user_data?.email || 'N/A'}</span>
                    </div>
                    <div className="w-full border-1 border-divider rounded-2xl p-2 flex flex-col text-[12px] md:text-[13px]">
                        <span className="text-low-text/70">Phone</span>
                        <span className="text-sec-text w-full min-w-0 truncate">{data?.user_data?.phone_no || 'N/A'}</span>
                    </div>
                    <div className="w-full border-1 border-divider rounded-2xl p-2 flex flex-col text-[12px] md:text-[13px]">
                        <span className="text-low-text/70">Phone</span>
                        <span className="text-sec-text w-full min-w-0 truncate">{data?.user_data?.phone_no || 'N/A'}</span>
                    </div>
                    <div className="w-full border-1 border-divider rounded-2xl p-2 flex flex-col text-[12px] md:text-[13px]">
                        <span className="text-low-text/70">Phone</span>
                        <span className="text-sec-text w-full min-w-0 truncate">{data?.user_data?.phone_no || 'N/A'}</span>
                    </div>
                    <div className="w-full border-1 border-divider rounded-2xl p-2 flex flex-col text-[12px] md:text-[13px]">
                        <span className="text-low-text/70">Phone</span>
                        <span className="text-sec-text w-full min-w-0 truncate">{data?.user_data?.phone_no || 'N/A'}</span>
                    </div>
                    <div className="w-full border-1 border-divider rounded-2xl p-2 flex flex-col text-[12px] md:text-[13px]">
                        <span className="text-low-text/70">Phone</span>
                        <span className="text-sec-text w-full min-w-0 truncate">{data?.user_data?.phone_no || 'N/A'}</span>
                    </div>
                </div>
                {
                    data?.status == 'pending' ?
                        <div className="flex w-full gap-2 items-center p-2 md:p-3">

                        </div> :
                        <div className={`${data?.status == 'approved' ? 'text-green-600/80' : 'text-red-500/80'} text-[11px] md:text-[13px] flex items-center gap-1 p-2 md:p-3`}>
                            {data.status == 'approved' ? <BsCheck /> : <MdCancel />}
                            {data?.status == 'approved' ? 'Request approved - staff member can now access the dashboard.' : 'Request was rejected.'}
                        </div>
                }
            </div>
        </div>
    )
}