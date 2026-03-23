import { useMemo, useState } from "react";
import RestaurantSelectComponent from "./RestaurantSelect";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { getSidebarNavs } from "../../navigations/getSidebar";
import { useSelector } from 'react-redux'




export default function Sidebar({ openSidebar, setOpenSidebar }) {
    const { role, permissions,userInfo } = useSelector(state => state.auth);
    const sidebarNavs = useMemo(() => getSidebarNavs(role, permissions), [role, permissions]);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div
            className={`absolute top-0 lg:hidden bg-card-bg   z-100 h-[100dvh]  w-[260px] flex flex-col gap-2
        ${!openSidebar ? 'left-[-260px] lg:left-0 ' : 'left-0'} transition-all duration-[200ms]`}>

            <div
                className="h-[65px] w-full p-3 border-b-1 border-divider mb-3">
                <RestaurantSelectComponent openSidebar={openSidebar} />
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto show-custom-scrollbar ">
                {sidebarNavs.map(nav => <div key={`section-${nav.id}`}
                    className="flex flex-col gap-2 px-2 w-full ">
                    <span className={`w-full text-[14px] font-[500] font-[Rubik] flex-1 min-w-0 truncate  text-sec-text uppercase `}>
                        {nav.title}
                    </span>
                    {nav.options.map((o) => <div key={`option-${nav.id}-${o.id}`}
                        onClick={() => {navigate(o.path);setOpenSidebar(false);}}
                        className={`p-3 h-[45px] cursor-pointer rounded-2xl min-w-0 w-full 
                    ${o.path == pathname ? 'bg-divider/30 text-active-border' : 'hover:bg-sec-text/5 active:bg-sec-text/20 text-low-text/70 hover:text-low-text active:text-sec-text'} 
                    flex items-center gap-1 text-[16px] shrink-0`}>
                        <div className="size-[24px] flex items-center justify-center shrink-0">
                            {o.icon}
                        </div>
                        <span className="flex-1 min-w-0 truncate ">{o.title}</span>
                    </div>)}
                </div>)}
            </div>
            <div className="py-3 px-4 w-full border-t-1 border-divider flex items-center gap-2 overflow-hidden">
                <div className="size-[35px] flex justify-center rounded-[50%] items-center text-center bg-gray-600
                        text-white text-[35px]
                        ">
                    {
                        userInfo?.image ?
                            <img src={userInfo?.image} alt="" 
                            className="size-full object-cover rounded-[50%]"/> :
                            <FaUserCircle />

                    }
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                    <span className="w-full truncate text-sec-text text-[14px]/5">{userInfo?.name}</span>
                    <span className="w-full truncate text-low-text/70 text-[12px]/3">{role}</span>
                </div>
                <button type="button"
                    // onClick={() => setDropdownOpen(prev => !prev)}
                    className={` flex justify-center items-center text-center p-2 rounded-[50%] text-sec-text/80 
                                hover:bg-divider/30 active:bg-divider/50 hover:text-sec-text active:text-main-text`}>
                    <TbLogout />
                </button>
            </div>
        </div>
    )
}