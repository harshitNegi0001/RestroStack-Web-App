import React, { useEffect, useState } from 'react'
import { IoArrowBack, IoClose } from 'react-icons/io5'
import { GrUserManager } from "react-icons/gr";
import { LuHandPlatter } from "react-icons/lu";
import { PiChefHatBold } from "react-icons/pi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { getEmployeeFullData } from '../Apis/staffManagementApi';
import { FaUserCircle } from 'react-icons/fa';
import EmpPersonalSection from '../subComponents/EmpPersonalSection';
import EmpCustomizePermission from '../subComponents/EmpCustomizePermission';
import EmpDangerZone from '../subComponents/EmpDangerZone';

const roles_icon = {
    'manager': <GrUserManager />,
    'waiter': <LuHandPlatter />,
    'chef': <PiChefHatBold />,
    'cashier': <HiOutlineBanknotes />
}
const active_color = {
    'active': {
        'chip': 'bg-green-600/20 text-green-600 border-green-600',
        'dot': 'bg-green-600',
    },
    'on break': {
        'chip': 'bg-yellow-600/20 text-yellow-600 border-yellow-600',
        'dot': 'bg-yellow-600',
    },
    'late': {
        'chip': 'bg-orange-600/20 text-orange-600 border-orange-600',
        'dot': 'bg-orange-600',
    },
    'off shift': {
        'chip': 'bg-gray-600/20 text-gray-600 border-gray-600',
        'dot': 'bg-gray-600',
    },
    'absent': {
        'chip': 'bg-red-600/20 text-red-600 border-red-600',
        'dot': 'bg-red-600',
    }
}
const roles_color = {
    'manager': 'text-blue-600 bg-blue-600/20 border-blue-600/60',
    'chef': 'text-orange-600 bg-orange-600/20 border-orange-600/60',
    'waiter': 'text-violet-600 bg-violet-600/20 border-violet-600/60',
    'cashier': 'text-green-600 bg-green-600/20 border-green-600/60'
}

function FullEmpWindow({ empId, onClose }) {

    const [isLoading, setIsLoading] = useState(false);
    const [empDetails, setEmpDetails] = useState({});
    useEffect(() => {
        getEmpData();
    }, [empId]);

    const getEmpData = async () => {
        function successFunction(data){
            
            setEmpDetails(data);
        }
        setIsLoading(true);
        await getEmployeeFullData(empId,successFunction);
        setIsLoading(false);
    }

    return (
        <div className="w-[100dvw] h-[100dvh] sm:w-[500px] sm:h-[98dvh]   bg-card-bg sm:rounded-2xl
        flex flex-col gap-0 relative overflow-hidden ">
            <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">
                <button onClick={onClose}
                    className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                            hover:bg-main-text/5 active:bg-main-text/10">
                    <IoArrowBack />
                </button>
                <div className={`flex-1 flex flex-col gap-1`}>
                    <h6 className={`${isLoading ? 'h-4 animate-wave rounded-md w-[150px]' : 'text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize'} `}>
                        {empDetails?.name}
                    </h6>
                    {/* <div className={`${isLoading ? 'h-2 w-[60px] animate-wave rounded-2xl' : 'text-low-text/70 text-[10px] sm:text-[12px]'}`}>
                        {empDetails} */}
                    <span className={`${roles_color[empDetails?.role_name]} w-fit px-2 font-[Rubik] rounded-2xl text-[9px] font-[500] capitalize`}>{empDetails?.role_name}</span>
                    {/* </div> */}

                </div>

                <button onClick={onClose}
                    className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                            hover:bg-main-text/5 active:bg-main-text/10">
                    <IoClose />
                </button>
            </div>
            <div className='w-full p-3 flex-1 min-h-0 flex flex-col items-center gap-2 overflow-y-auto show-custom-scrollbar'>
                <div className='w-full flex justify-center'>
                    {isLoading?
                    <div className='w-[100px] md:w-[150px] h-[100px] md:h-[150px] rounded-full animate-wave'>

                    </div>:
                    <div className='w-[100px] md:w-[150px] h-[100px] md:h-[150px] rounded-full'>
                        {
                            empDetails?.image ?
                                <img className='w-full h-full object-cover rounded-full' src={empDetails?.image} alt="Employee Profile" /> :
                                <div className='w-full h-full text-divider'>
                                    <FaUserCircle className='text-[100px] md:text-[150px]' />
                                </div>
                        }
                    </div>}
                </div>
                <EmpPersonalSection empDetails={empDetails} isLoading={isLoading}/>
                <EmpCustomizePermission permissions={empDetails?.permissions} isLoading={isLoading} />
                <EmpDangerZone isLoading={isLoading} />
            </div>
        </div>
    )
}

export default FullEmpWindow
