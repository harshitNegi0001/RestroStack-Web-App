import { TbLayoutSidebarInactive } from 'react-icons/tb';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector, } from 'react-redux';
import { setTheme } from '../../Store/Auth/authReducer';
import { FaRegBell } from "react-icons/fa";
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../utils/coustomHook/useOutsideClick';
import Notification from '../../components/Notification';

export default function Appbar({ setOpenSidebar }) {
    const [openNotification, setOpenNotification] = useState(false);
    const notifRef = useRef();
    const clickBtnRef=useRef();

    useOutsideClick(notifRef, () => setOpenNotification(false),clickBtnRef);
    const { theme } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    return (
        <div
            className="w-full flex justify-between h-[65px] bg-card-bg border-b-1 border-divider p-3 z-10 gap-2">
            <div onClick={() => setOpenSidebar(prev => !prev)}
                className="size-[43px] flex justify-center rounded-[50%] items-center hover:bg-main-text/20
               text-sec-text/80 hover:text-sec-text text-[22px]
                ">
                <TbLayoutSidebarInactive />
            </div>
            <div className='flex items-center gap-2 relative'>
                <button onClick={() => dispatch(setTheme(theme == 'dark' ? 'light' : 'dark'))}
                    className={`size-[43px] flex justify-center rounded-[50%] items-center hover:bg-main-text/20
               text-sec-text/80 hover:text-sec-text text-[22px]
                ${theme == 'dark' ? 'rotate-0' : 'rotate-360'} transition-all duration-500`}>
                    {theme == 'dark' ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
                </button>
                <button ref={clickBtnRef}
                    onClick={() => setOpenNotification(prev => !prev)}
                    className={`size-[43px] flex justify-center rounded-[50%] items-center hover:bg-main-text/10 active:bg-main-text/20
                text-sec-text/80 hover:text-sec-text text-[22px] `}>
                    <FaRegBell />
                </button>
                <Notification openNotification={openNotification} setOpenNotification={setOpenNotification} ref={notifRef} />

            </div>


        </div>
    )
}