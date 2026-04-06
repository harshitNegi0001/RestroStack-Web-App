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
            image:'https://res.cloudinary.com/dns5lxuvy/image/upload/q_auto/f_auto/v1774678509/dlavfvrj493hxruq90qy.png'
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

    const [perPage,setPerPage] = useState(10);
    const [activeType,setActiveType] =useState('all');
    return(
        <div className="w-full rounded-2xl bg-card-bg flex flex-col shadow-md shadow-black/30 ">
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
            <div className="flex w-full border-t-1 border-divider p-2 md:p-3 items-center justify-between">
                <div className="w-[55px] ">
                    <select  id="" value={perPage} onChange={(e)=>setPerPage(e.target.value)}
                        className="outline-1 text-sec-text w-full outline-divider p-1 rounded-lg focus:outline-2 focus:outline-active-border">
                        {
                            [1,2,3,4,5].map(i=>
                                <option value={5*i} className="bg-main-bg ">{5*i}</option>
                            )
                        }
                    </select>
                </div>
                <div className="flex items-center gap-1">
                    
                </div>
            </div>
        </div>
    )
}