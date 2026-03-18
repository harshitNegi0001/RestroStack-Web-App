import { useState } from "react";
import { useSelector } from "react-redux";
import { PiBuildingOfficeThin } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { RiUser3Line } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import { MdSearch } from "react-icons/md";

const rolesOtptions = [
    {
        id: 1,
        icon: <PiBuildingOfficeThin />,
        title: 'Restaurant Owner',
        desc: 'Setup your outlet, manage billing & inventory.',
        clrClass: 'text-green-500 bg-green-500/20',
        key: 'owner'
    },
    {
        id: 2,
        icon: <TbUsers />,
        title: 'Employee',
        desc: 'Join an existing team using an invite code.',
        clrClass: 'text-orange-500 bg-orange-500/20',
        key: 'employee'
    },
    {
        id: 3,
        icon: <MdSearch />,
        title: 'Job Searcher',
        desc: 'Find work opportunities in top restaurants near you.',
        clrClass: 'text-blue-500 bg-blue-500/20',
        key: 'search'
    },

]

export default function SelectRole({ selectedRole, setSelectedRole, setActivePage }) {


    // const { userInfo } = useSelector(state => state.auth);
    const btnDisabled = !selectedRole;

    const handleNextBtn = () => {
        if (btnDisabled) {
            return;
        }
        if (selectedRole == 'owner') {
            setActivePage('restaurant-setup');
        }
        else if (selectedRole == 'employee') {
            setActivePage('employee-setup');
        }
        else {
            setActivePage('job-search');
        }
    }
    return (

        <div
            className="w-full max-w-[500px] flex flex-col gap-4 items-center c p-2 md:p-4">
            <div
                className="w-full text-center flex flex-col items-center gap-1 ">
                <h6
                    className="text-main-text font-[600]
                    text-[22px] md:text-[24px] lg:text-[26px]">
                    Select Your Role
                </h6>
                <span
                    className="text-sec-text/80
                    text-[12px] md:text-[13px] lg:text-[14px]
                    ">
                    Choose how you want to use RestoStack
                </span>
            </div>

            <div
                className="w-full  text-center flex flex-col items-center gap-2">
                {rolesOtptions.map(r => <div key={r.id}
                    onClick={() => setSelectedRole(r.key)}
                    className={`w-full p-2 flex items-center border-1  rounded-2xl gap-2 cursor-pointer 
                    ${selectedRole == r.key ? 'bg-active-border/20 border-active-border' : 'border-divider hover:border-active-border/60 hover:bg-active-border/5 active:bg-active-border/20 active:border-active-border'}  `}>
                    <div
                        className={`w-[50px] ${r.clrClass} flex justify-center items-center  lg:w-[60px] aspect-square  rounded-2xl 
                         text-[22px] md:text-[26px] lg:text-[28px] `}>
                        {r.icon}
                    </div>
                    <div
                        className="w-full min-w-0 flex flex-col items-start text-start ">

                        <span className="text-sec-text text-[16px] md:text-[17px] lg:text-[18px] ">
                            {r.title}
                        </span>

                        <span className="text-sec-text w-full truncate text-[11px] md:text-[12px] lg:text-[13px] ">
                            {r.desc}
                        </span>

                    </div>

                </div>)}

            </div>
            <div
                className="w-full flex justify-end">


                <button disabled={btnDisabled} onClick={handleNextBtn}
                    className={`  mt-3 py-2 px-6  rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600]
                         ${btnDisabled ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}
                >
                    Next
                </button>
            </div>
        </div>


    )
}