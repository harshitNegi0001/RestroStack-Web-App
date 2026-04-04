import { useState } from "react"
import ResIdentityCard from "../subComponents/ResIdentityCard";







export default function ResDetailPage(){
    const [openEditRes,setOpenEditRes] = useState(false);
    return(
        <div className="bg-card-bg p-2 md:p-3 rounded-2xl w-full shadow-md flex flex-col md:flex-row md:justify-evenly md:items-center ">
            <div 
            className="flex p-2 md:p-3 border-1 border-divider rounded-2xl w-full md:w-[48%]">
                <ResIdentityCard />
            </div>
            <div className="flex p-2 md:p-3 border-1 border-divider rounded-2xl w-full md:w-[48%]">

            </div>
        </div>
    )
}