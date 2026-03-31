import { LuInbox } from "react-icons/lu";
import ChipComponent from "./ChipComponent";
import { useState } from "react";
import StaffRequestRow from "./StaffRequestsRow";

const staffRequests = [
    {
        id:1,
        user_data:{
            name:'Harshit Singh Negi',
            email:'negiharshitsingh919@gmail.com',
            image:''
        },
        status:'pending',
        created_at:''
    },
    {
        id:2,
        user_data:{
            name:'Roop Singh',
            email:'dhamiroop@gmail.com',
            image:''
        },
        status:'rejected',
        created_at:''
    },
    {
        id:3,
        user_data:{
            name:'Harshit Singh Negi',
            email:'negiharshitsingh919@gmail.com',
            image:''
        },
        status:'approved',
        created_at:''
    },
    {
        id:4,
        user_data:{
            name:'Ayush Singh',
            email:'ayushsingh534@gmail.com',
            image:''
        },
        status:'rejected',
        created_at:''
    },
]

const filterTypes = [
    'all',
    'pending',
    'approved',
    'rejected'
]

export default function StaffReqBox(){

    const [activeType,setActiveType] =useState('all');
    return(
        <div className="w-full rounded-2xl bg-card-bg flex flex-col shadow-md shadow-black/30 overflow-hidden">
            <div className="p-2 flex flex-col gap-2 md:flex-row md:justify-between w-full ">
                <div className="flex gap-2 items-center text-[14px] md:text-[16px] text-active-border ">
                    <LuInbox />
                    <span className="text-sec-text">Request Inbox</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    {
                        filterTypes.map((f,i)=>
                            <ChipComponent key={i} title={f} isActive={f==activeType} onClick={()=>setActiveType(f )} />
                        )
                    }
                </div>
            </div>
            <div className="w-full flex flex-col">
                {
                    staffRequests.map(r=>
                        <StaffRequestRow key={r.id} data={r} />
                    )
                }
            </div>
        </div>
    )
}