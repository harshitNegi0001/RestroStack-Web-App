
import { LuBuilding2 } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../utils/coustomHook/useOutsideClick";
import { useSelector } from 'react-redux';
import { useEffect } from "react";

export default function RestaurantSelectComponent({ openSidebar }) {
    const { rolesList, userInfo } = useSelector(state => state.auth)

    const [activeRes, setActiveRes] = useState();
    const dropdownRef = useRef();
    const clickBtnRef = useRef();
    useOutsideClick(dropdownRef, () => setDropdownOpen(false), clickBtnRef)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (!rolesList || rolesList.length == 0) {
            return;
        }
        setActiveRes(rolesList.find(rl => rl.id == userInfo?.last_role_id));
    }, [rolesList])
    return (
        <div
            className="flex w-[250px] items-center gap-1 min-w-0 relative">
            <div className="size-[43px] flex justify-center rounded-lg items-center bg-active-border/20
                                text-active-border text-[22px]
                            ">
                                
                {
                    activeRes?.res_data?.res_logo ?
                        <img src={activeRes?.res_data?.res_logo} alt=""
                            className="size-[80%] object-contain" />
                        :
                        <LuBuilding2 />
                }
            </div>
            {openSidebar && <><span
                className="flex-1  truncate text-[16px] font-[600] text-main-text">
                {activeRes?.res_data?.res_name}
            </span>
                <button type="button"
                    ref={clickBtnRef}
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className={` flex justify-center items-center text-center p-3 rounded-[50%] text-sec-text/80 
                            hover:bg-divider/30 active:bg-divider/50 hover:text-sec-text active:text-main-text
                            ${dropdownOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-[200ms] `}>
                    <FaChevronDown />
                </button></>}

            <div ref={dropdownRef}
                className={`
                ${dropdownOpen ? 'top-[110%] opacity-100 pointer-events-auto' : 'top-[50%] opacity-0 pointer-events-none'} 
                p-2 bg-toast-bg w-full absolute z-4 transition-all duration-200 rounded-2xl flex flex-col
            `}>
                <div
                    className="p-2 border-b-1 mb-2 border-divider uppercase font-[Rubik] font-[500] text-[14px] text-low-text">
                    Your Restaurants
                </div>

                {rolesList.map(r => <div key={r.id} onClick={() => { setActiveRes(r); setDropdownOpen(false); }}
                    className={`${activeRes?.id == r.id ? 'bg-sec-text/20' : 'hover:bg-sec-text/5 active:bg-sec-text/20'}
                       p-2  flex gap-2  rounded-lg cursor-pointer w-full
                    `}
                >
                    <div className="size-[43px] flex justify-center rounded-lg items-center bg-active-border/20
                                text-active-border text-[22px]
                            ">
                        {
                            r?.res_data?.res_logo ?
                                <img src={r?.res_data?.res_logo} alt=""
                                    className="size-[80%] object-contain" />
                                :
                                <LuBuilding2 />
                        }
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">

                        <span
                            className=" truncate text-[16px] font-[600] text-main-text">
                            {r?.res_data?.res_name}
                        </span>
                        <span className=" truncate text-[10px] text-low-text/70">
                            {r?.res_data?.full_address}
                        </span>
                        <span className=" truncate text-[10px] font-[600] text-low-text">
                            {r?.role_name}
                        </span>
                    </div>
                </div>)}
            </div>
        </div>
    )
}