import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { LuHandPlatter } from "react-icons/lu";
import { PiChefHatBold } from "react-icons/pi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { GrUserManager } from "react-icons/gr";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LuBuilding2 } from "react-icons/lu";
import { IoKey } from "react-icons/io5";
import { generateInviteToken } from "../Apis/staffManagementApi";
import { HiOutlineMail } from 'react-icons/hi';


const roles = [
    {
        id: 1,
        label: 'Manager',
        icon: <GrUserManager />,
        value: 'manager'
    },
    {
        id: 2,
        label: 'Waiter',
        icon: <LuHandPlatter />,
        value: 'waiter'
    },
    {
        id: 3,
        label: 'Chef',
        icon: <PiChefHatBold />,
        value: 'chef'
    },
    {
        id: 4,
        label: 'Cashier',
        icon: <HiOutlineBanknotes />,
        value: 'cashier'
    },
]
export default function GenerateInviteToken({ onClose }) {
    const [role, setRole] = useState('manager');
    const { rolesList, userInfo } = useSelector(state => state.auth);
    const [activeRes, setActiveRes] = useState();
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [email, setEmail] = useState('');
    const [inputError, setInputError] = useState('');
    useEffect(() => {
        if (!rolesList || rolesList.length === 0) return;

        const defaultRes = rolesList.find(rl => rl.id == userInfo?.last_role_id);
        setActiveRes(defaultRes || rolesList[0]);
    }, [rolesList, userInfo]);

    const handleGenerate = async () => {

        setIsLoadingBtn(true);
        await generateInviteToken({ role: role, res_id: activeRes?.res_data?.id, email }, setInputError);
        setIsLoadingBtn(false);
    }
    return (
        <div
            className="w-full h-[100dvh] sm:w-[450px] sm:h-fit  bg-card-bg sm:rounded-2xl
        flex flex-col gap-2">
            <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">

                <button onClick={onClose}
                    className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10">
                    <IoArrowBack />
                </button><div className="flex-1 flex flex-col ">
                    <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
                        Generate Invite Token
                    </h6>
                    <span className="text-low-text/70 text-[10px] md:text-[11px] ">
                        Generate one-time tokens for staff to join your restaurant.
                    </span>
                </div>

                <button onClick={onClose}
                    className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10">
                    <IoClose />
                </button>
            </div>
            <div className="flex flex-col gap-2  border-b-1 border-divider p-5">
                <div
                    className='w-full flex flex-col gap-1 relative'>
                    <label htmlFor="role-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Role</label>

                    <label htmlFor='role-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500 flex justify-center items-center rounded-lg
                                        size-[30px] md:size-[34px] 
                                        text-[20px] md:text-[24px]'>
                        {roles.find(c => c.value == role).icon}
                    </label>
                    <select id="role-input"
                        value={role} onChange={(e) => setRole(e.target.value)}
                        className='border-divider 
                                        border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                        rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]'>
                        {roles.map(r => <option key={r.id} value={r.value}
                            className="bg-main-bg ">
                            {r.label}
                        </option>
                        )}
                    </select>

                </div>
                <div
                    className='w-full flex flex-col gap-1 relative'>
                    <label htmlFor="res-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Restaurant</label>
                    <label htmlFor='res-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500 flex justify-center items-center rounded-lg
                                        size-[30px] md:size-[34px] 
                                        text-[20px] md:text-[24px]'>

                        <LuBuilding2 />

                    </label>
                    <select
                        id="res-input"
                        value={activeRes?.id || ""}
                        onChange={(e) => {
                            const selected = rolesList.find(r => r.id == e.target.value);
                            setActiveRes(selected);
                        }}
                        className="border-divider border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                        rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]"
                    >
                        {rolesList.map(r => (
                            <option key={r.id} value={r.id} className="bg-main-bg">
                                {r?.res_data?.res_name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className='w-full flex flex-col gap-0 relative pb-2'>

                    <div
                        className='w-[100%] flex flex-col gap-1 relative'>
                        <label htmlFor="email-input"
                            className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Email</label>

                        <label htmlFor='email-input'
                            className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                            <HiOutlineMail />
                        </label>
                        <input id='email-input' type="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Candidate's email" required
                            onFocus={() => setInputError('')}
                            className={`
                                    ${inputError ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                    </div>
                    <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError}</span>
                </div>
                <div className="bg-toast-bg rounded-2xl p-4 text-[10px] md:text-[11px] flex flex-col text-low-text">
                    <span>
                        <b>Note : </b>This token expires in <b >24 hours</b>. One-time use only.
                    </span>
                    <span>
                        The invited person will be able to join as <b className="capitalize">{role}</b> at <b className="capitalize">{activeRes?.res_data?.res_name}</b>
                    </span>
                    <span>
                        A unique invitation token and a one-click join link will be delivered to their email instantly.
                    </span>
                </div>
            </div>
            <div className="w-full p-4 flex justify-end">

                <button
                    disabled={isLoadingBtn}
                    onClick={handleGenerate}
                    className={`w-fit px-3 py-2 h-fit gap-1 rounded-lg bg-linear-0 text-white text-[12px] md:text-[13px] lg:text-[14px] font-[500] flex items-center justify-center                         
                        ${isLoadingBtn ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    {isLoadingBtn ? <svg className="animate-spin -ml-1  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : <IoKey />}
                    {
                        isLoadingBtn ? <span className='text-white/80'>Generating...</span> : 'Generate & Send Invite'
                    }
                </button>
            </div>
        </div>
    )
}