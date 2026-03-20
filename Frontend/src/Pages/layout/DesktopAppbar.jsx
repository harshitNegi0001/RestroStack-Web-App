import { TbLayoutSidebarInactive } from 'react-icons/tb';



export default function Appbar({ setOpenSidebar }) {
    return (
        <div
            className="w-full h-[65px] bg-card-bg border-b-1 border-divider p-3 z-10">
            <div onClick={()=>setOpenSidebar(prev=>!prev)}
             className="size-[43px] flex justify-center rounded-[50%] items-center hover:bg-main-text/20
               text-sec-text/80 hover:text-sec-text text-[22px]
                ">
               
                    
                        <TbLayoutSidebarInactive />
                
            </div>
        </div>
    )
}