import { LuLayoutDashboard } from "react-icons/lu";
import { BsShop } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";
import { useState } from "react";
import RestaurantSelectComponent from "./RestaurantSelect";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const sidebarOtions = {
    navigations_options: [
        {
            id: 1,
            title: 'Operations',
            options: [
                {
                    path: '/',
                    icon: <LuLayoutDashboard />,
                    name: 'Dashboard'
                },
                {
                    path: '#',
                    icon: <BsShop />,
                    name: 'Restaurant Setup'
                }
            ]
        },
        {
            id: 2,
            title: 'People',
            options: [
                {
                    path: '#',
                    icon: <HiOutlineUsers />,
                    name: 'Employees'
                },
                {
                    path: '#',
                    icon: <HiOutlineBriefcase />,
                    name: 'Job Postings'
                },

            ]
        },
        {
            id: 3,
            title: 'Business',
            options: [
                {
                    path: '#',
                    icon: <HiOutlineCreditCard />,
                    name: 'Billings'
                },
                {
                    path: '#',
                    icon: <LuSettings />,
                    name: 'Settings'
                },

            ]
        }
    ]
}


export default function Sidebar({ openSidebar, setOpenSidebar }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div
            className={`absolute top-0 lg:hidden bg-card-bg   z-100 h-[100dvh]  w-fit flex flex-col gap-2
        ${!openSidebar ? 'left-[-280px] lg:left-0 ' : 'left-0'} transition-all duration-[200ms]`}>

            <div
                className="h-[65px] w-full p-3 border-b-1 border-divider mb-3">
                <RestaurantSelectComponent openSidebar={openSidebar} />
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto show-custom-scrollbar">
                {sidebarOtions.navigations_options.map(nav => <div key={nav.id}

                    className="flex flex-col gap-2 px-3 w-full ">
                    <span className={`${openSidebar ? 'opacity-100' : 'opacity-0'} w-full text-[14px] font-[500] font-[Rubik] flex-1 min-w-0 truncate  text-sec-text uppercase`}>
                        {nav.title}
                    </span>
                    {nav.options.map((o, i) => <div key={i}
                        onClick={() => { navigate(o.path); setOpenSidebar(false) }}
                        className={`p-3 h-[45px] cursor-pointer rounded-2xl min-w-0 w-full
                    ${o.path == pathname ? 'bg-active-border/30 text-active-border' : 'hover:bg-sec-text/5 active:bg-sec-text/20 text-low-text/70 hover:text-low-text active:text-sec-text'} 
                    flex items-center gap-1 text-[16px] shrink-0`}>
                        <div className="size-[24px] flex items-center justify-center shrink-0">
                            {o.icon}
                        </div>
                        {openSidebar && <span className="flex-1 min-w-0 truncate ">{o.name}</span>}
                    </div>)}
                </div>)}
            </div>
            <div className="py-3 px-2 w-full border-t-1 border-divider flex items-center gap-2">
                <div className="size-[35px] flex justify-center rounded-[50%] items-center text-center bg-gray-600
                        text-white text-[35px]">
                    {
                        false ?
                            <img src="" alt="" /> :
                            <FaUserCircle />

                    }
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                    <span className="w-full truncate text-sec-text text-[14px]">Harshit Singh Negi</span>
                    <span className="w-full truncate text-low-text/70 text-[12px]">Owner</span>
                </div>
                <button type="button"
                    // onClick={() => setDropdownOpen(prev => !prev)}
                    className={` flex justify-center items-center text-center p-3 rounded-[50%] text-sec-text/80 
                                            hover:bg-divider/30 active:bg-divider/50 hover:text-sec-text active:text-main-text`}>
                    <TbLogout />
                </button>
            </div>
        </div>
    )
}