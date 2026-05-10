import { useEffect, useMemo, useState } from "react";
import RestaurantSelectComponent from "./RestaurantSelect";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { getSidebarNavs } from "../../navigations/getSidebar";
import {useDispatch, useSelector} from 'react-redux'
import BackdropPage from "../../components/BackdropPage";
import AlertBox from "../../subComponents/ConfirmBox";
import { logout } from "../../Apis/authApi";
import { clearState } from "../../Store/Auth/authReducer";


export default function DesktopSideabr({ openSidebar ,setOpenSidebar}) {
    
    const [openConfirm,setOpenConfirm] = useState(false);
    const [loadingBtn,setLoadingBtn] = useState(false);
    const {role,permissions,userInfo,isLoading} =useSelector(state=>state.auth);
    const sidebarNavs = useMemo(()=>getSidebarNavs(role,permissions),[role,permissions])
    const {pathname} =useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutBtnHandler = async()=>{
        function successFunction(){
            setOpenConfirm(false);
            navigate('/auth-window');
            dispatch(clearState());
        }

        setLoadingBtn(true);
        await logout(successFunction);
        setLoadingBtn(false);
    }

    
    return (
        <div
            className={`${openSidebar ? 'w-[280px]' : 'w-[73px]'} h-full hidden lg:flex flex-col bg-card-bg border-r-1 border-divider  z-10 gap-3
            transition-all duration-[500ms] `}>
                <BackdropPage isOpen={openConfirm} onClose={()=>setOpenConfirm(false)} >
                    <AlertBox onCancel={()=>setOpenConfirm(false)} confirmFunction={logoutBtnHandler} loadingBtn={loadingBtn}
                        title={'Logout'} desc={'Are you sure to log out?'} type={'error'}/>
                </BackdropPage>
            <div
                className="h-[65px] w-full p-3 border-b-1 border-divider mb-2">

                <RestaurantSelectComponent openSidebar={openSidebar} />
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto show-custom-scrollbar ">
                {sidebarNavs.map(nav => <div key={`section-${nav.id}`}
                    className="flex flex-col gap-2 px-2 w-full ">
                    {openSidebar && <span className={`${openSidebar ? 'opacity-100' : 'opacity-0'} w-full text-[14px] font-[500] font-[Rubik] flex-1 min-w-0 truncate  text-sec-text uppercase `}>
                        {nav.title}
                    </span>}
                    {nav.options.map((o) => <div title={o.title} key={`option-${nav.id}-${o.id}`}
                        onClick={() => navigate(o.path)}
                        className={`p-3 h-[45px] cursor-pointer rounded-2xl min-w-0 w-full 
                    ${o.path==pathname?'bg-divider/30 text-active-border':'hover:bg-sec-text/5 active:bg-sec-text/20 text-low-text/70 hover:text-low-text active:text-sec-text'} 
                    flex items-center gap-1 text-[16px] shrink-0`}>
                        <div className="size-[24px] flex items-center justify-center shrink-0">
                            {o.icon}
                        </div>
                        {openSidebar && <span className="flex-1 min-w-0 truncate ">{o.title}</span>}
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
                {openSidebar&&<div className="flex-1 flex flex-col min-w-0">
                    <span className="w-full truncate text-sec-text text-[14px]/5">{userInfo?.name}</span>
                    <span className="w-full truncate text-low-text/70 text-[12px]/3">{role}</span>
                </div>}
                {openSidebar&&<button type="button"
                    onClick={() => setOpenConfirm(prev => !prev)}
                    className={` flex justify-center items-center text-center p-2 rounded-[50%] text-sec-text/80 
                                hover:bg-divider/30 active:bg-divider/50 hover:text-sec-text active:text-main-text`}>
                    <TbLogout />
                </button>}
            </div>


        </div>
    )
}