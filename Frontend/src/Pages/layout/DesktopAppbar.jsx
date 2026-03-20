import { TbLayoutSidebarInactive } from 'react-icons/tb';
import { MdOutlineLightMode,MdOutlineDarkMode  } from "react-icons/md";
import {useDispatch, useSelector, } from 'react-redux';
import { setState } from '../../Store/Auth/authReducer';

export default function Appbar({ setOpenSidebar }) {

    const {theme} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    return (
        <div
            className="w-full flex justify-between h-[65px] bg-card-bg border-b-1 border-divider p-3 z-10 gap-2">
            <div onClick={()=>setOpenSidebar(prev=>!prev)}
             className="size-[43px] flex justify-center rounded-[50%] items-center hover:bg-main-text/20
               text-sec-text/80 hover:text-sec-text text-[22px]
                ">
               
                    
                        <TbLayoutSidebarInactive />
                
            </div>
            <div onClick={()=>dispatch(setState({theme:theme=='dark'?'light':'dark'}))}
             className={`size-[43px] flex justify-center rounded-[50%] items-center hover:bg-main-text/20
               text-sec-text/80 hover:text-sec-text text-[22px]
                ${theme=='dark'?'rotate-0':'rotate-360'} transition-all duration-500`}>
               
                    
                        {theme=='dark'?<MdOutlineLightMode />:<MdOutlineDarkMode  />}
                
            </div>

        </div>
    )
}