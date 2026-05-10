import { GrUserManager } from "react-icons/gr";
import { LuHandPlatter } from "react-icons/lu";
import { PiChefHatBold } from "react-icons/pi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { FiLogIn,FiLogOut } from "react-icons/fi";


const roles_icon = {
    'manager': <GrUserManager />,
    'waiter': <LuHandPlatter />,
    'chef': <PiChefHatBold />,
    'cashier': <HiOutlineBanknotes />
}
const active_color = {
    'active': {
        'chip': 'bg-green-600/20 text-green-600 border-green-600',
        'dot': 'bg-green-600',
    },
    'on break': {
        'chip': 'bg-yellow-600/20 text-yellow-600 border-yellow-600',
        'dot': 'bg-yellow-600',
    },
    'late': {
        'chip': 'bg-orange-600/20 text-orange-600 border-orange-600',
        'dot': 'bg-orange-600',
    },
    'off shift': {
        'chip': 'bg-gray-600/20 text-gray-600 border-gray-600',
        'dot': 'bg-gray-600',
    },
    'absent': {
        'chip': 'bg-red-600/20 text-red-600 border-red-600',
        'dot': 'bg-red-600',
    }
}
const roles_color = {
    'manager': 'text-blue-600 bg-blue-600/20 border-blue-600/60',
    'chef': 'text-orange-600 bg-orange-600/20 border-orange-600/60',
    'waiter': 'text-violet-600 bg-violet-600/20 border-violet-600/60',
    'cashier': 'text-green-600 bg-green-600/20 border-green-600/60'
}

export default function EmployeeCard({ data}) {
    return (
        <div className="w-full rounded-2xl shadow-black/30 shadow-md p-2 bg-card-bg hover:bg-toast-bg/40 hover:scale-102 flex flex-col gap-3">
            <div className="w-full flex flex-row justify-between gap-1">
                <div className="flex gap-1 items-center flex-1 min-w-0">
                    <div className={`${roles_color[data.role_name]} size-[30px] text-[18px] rounded-[50%] flex justify-center items-center text-center`}>
                        {
                            data.user_data?.image ?
                                <img src={data.user_data?.image} className="size-[30px] rounded-[50%] object-cover" alt="" /> :
                                roles_icon[data.role_name]
                        }
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 ">
                        <span className="w-full min-w-0 truncate text-[12px] text-main-text">
                            {data?.user_data?.name}
                        </span>
                        <span className={`${roles_color[data.role_name]} w-fit px-2 font-[Rubik] rounded-2xl text-[9px] font-[500] capitalize`}>{data.role_name}</span>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <span className={`p-1.25 ${active_color[data.active_status || 'off shift']?.dot} rounded-2xl`}></span>
                    <span className={`${active_color[data.active_status || 'off shift']?.chip} w-fit px-2 font-[Rubik] rounded-2xl text-[9px] font-[500] capitalize border-1`}>{data.active_status || 'off shift'}</span>
                </div>
            </div>
            <div className="w-full p-1  grid grid-cols-3 gap-2 ">
                <div className="p-1 bg-toast-bg rounded-lg text-[10px] flex flex-col px-3 items-center">
                    <span className="font-[500] text-sec-text">7</span>
                    <span className="text-low-text/70">shift/w</span>
                </div>
                <div className="p-1 bg-toast-bg rounded-lg text-[10px] flex flex-col px-3 items-center">
                    <span className="font-[500] text-sec-text">6.7h</span>
                    <span className="text-low-text/70">Today</span>
                </div>
                <div className="p-1 bg-toast-bg rounded-lg text-[10px] flex flex-col px-3 items-center">
                    <span className="font-[500] text-sec-text">98%</span>
                    <span className="text-low-text/70">Attendace</span>
                </div>
            </div>
            <div className="w-full border-b-1 border-divider/50"></div>
            <div className="w-full flex justify-between py-1 px-3">
                <div className="flex flex-col text-center">
                    <div className="flex gap-0.75 items-center text-[12px]">
                        <FiLogIn color="green" />
                        <span className="text-[10px] text-low-text">{data.shift_start}</span>
                        
                    </div>
                    <span className="text-[10px] text-low-text/70">Shift start</span>
                </div>
                
                <div className="flex flex-col text-center">
                    <div className="flex gap-0.75 items-center text-[12px]">
                        <FiLogOut color="orange" />
                        <span className="text-[10px] text-low-text">{data.shift_end}</span>
                        
                    </div>
                    <span className="text-[10px] text-low-text/70">Shift end</span>
                </div>
                
                
            </div>
        </div>
    )
}