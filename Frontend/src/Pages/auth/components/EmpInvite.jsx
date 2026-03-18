
import { useState } from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi';


export default function EmpInvite() {

    const [invitCode,setInviteCode]=useState('');
    const btnDisabled = Boolean(!invitCode.trim());
    return (
        <div className={`w-full flex flex-col gap-4 md:gap-6 items-center border-b-1 border-divider py-4`}>
            <div
                className='w-[100%] flex flex-col gap-1 relative'>
                <label htmlFor="invite-code-input"
                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Invite Code</label>

                <label htmlFor='invite-code-input'
                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                        size-[30px] md:size-[34px] 
                                                        text-[20px] md:text-[24px]'>
                    <HiOutlineLockClosed />
                </label>
                <input id='invite-code-input' type='text'
                    autoComplete="invite-code-input"
                    placeholder="Enter invite code" required
                    value={invitCode} onChange={(e) => setInviteCode(e.target.value)}
                    className={` border-divider  border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
            </div>
            <button disabled={btnDisabled}
                className={`  mt-3 py-2  w-[95px] md:w-[100px] flex justify-center text-center items-center rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600]
                         ${btnDisabled ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}
            >
                Connect
            </button>
        </div>
    )
}