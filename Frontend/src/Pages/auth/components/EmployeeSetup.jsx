import { useState } from "react";
import { useNavigate } from "react-router-dom"
import EmpInvite from "./EmpInvite";
import EmpSearchRes from "./EmpSearchRes";




export default function EmployeeSetup({ setActivePage }) {


    const [activeTab, setActiveTab] = useState('invite');
    const navigate = useNavigate();
    return (
        <div
            className="w-full max-w-[500px] flex flex-col gap-4 items-center c p-2 md:p-4">
            <div
                className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] bg-green-900/30 rounded-2xl flex justify-center items-center"
            >
                <img src={'https://res.cloudinary.com/dns5lxuvy/image/upload/v1773712565/dhd5mphtokjeobqrtafs.png'}
                    className='w-[45px] h-[45px] md:w-[50px] md:h-[50px] object-contain' alt="" />

            </div>
            <div
                className="w-full text-center flex flex-col items-center gap-1 ">
                <h6
                    className="text-main-text font-[600]
                            text-[22px] md:text-[24px] lg:text-[26px]">
                    Connect to Your Restaurant
                </h6>
                <span
                    className="text-sec-text/80
                            text-[12px] md:text-[13px] lg:text-[14px]
                            ">
                    Use an invite code or search your restaurant
                </span>
            </div>
            <div
                className="w-full my-3 flex justify-around border-b-1 border-divider text-[14px] md:text-[15px] lg:text-[16px]">
                <div onClick={() => setActiveTab('invite')}
                    className={` px-2  cursor-pointer
                ${activeTab == 'invite' ? 'border-b-3 border-active-border text-active-border' : `text-low-text border-0 hover:text-main-text`}`}>
                    Invite Code
                </div>
                <div onClick={() => setActiveTab('search')}
                    className={` px-2  cursor-pointer
                ${activeTab == 'search' ? 'border-b-3 border-active-border text-active-border' : `text-low-text border-0 hover:text-main-text`}`}>
                    Search Restaurant
                </div>
            </div>

            {activeTab=='invite'?<EmpInvite/>:<EmpSearchRes/>}

            <div
                className="w-full flex justify-between items-center">

                <button onClick={() => setActivePage('role-select')}
                    className='mt-3 py-2 px-6  rounded-lg border-1 
                border-low-text/80 hover:border-low-text hover:bg-low-text/10 active:border-sec-text active:bg-low-text/30
                text-low-text/80 hover:text-low-text active:text-sec-text
                 text-[12px] md:text-[13px] lg:text-[14px] font-[600]'
                >Back</button>

            </div>
        </div>
    )
}