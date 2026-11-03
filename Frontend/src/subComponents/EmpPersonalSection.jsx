import React from 'react'

function EmpPersonalSection({ empDetails, isLoading = false }) {
    return (
        <div className='w-full flex flex-col p-2 gap-1'>
            <div className={`${isLoading?'animate-wave h-3 rounded-2xl w-[120px] mb-1':''} text-sec-text text-[13px] md:text-[15px] font-[500]`}>{!isLoading?'Personal Details':''}</div>
            <div className={` w-full border-1 border-low-text/30 rounded-2xl p-2 flex flex-col gap-0.5 text-[11px] md:text-[13px] text-low-text`}>
                {!isLoading ? <>
                    <div className='flex flex-row justify-between w-full items-center min-w-0 gap-2'>
                        <span className=''>Email:</span>
                        <span className='min-w-0 truncate '>{empDetails?.email ?? 'N/A'}</span>
                    </div>
                    <div className='flex flex-row justify-between w-full items-center min-w-0 gap-2'>
                        <span className=''>Contact No.:</span>
                        <span className='min-w-0 truncate '>{empDetails?.contact ?? 'N/A'}</span>
                    </div>
                    <div className='flex flex-row justify-between w-full items-center min-w-0 gap-2'>
                        <span className=''>Joined On:</span>
                        <span className='min-w-0 truncate '>{empDetails?.join_date ?? 'N/A'}</span>
                    </div>
                    </> :
                    <>
                    <div className='flex flex-row justify-between w-full items-center min-w-0 gap-2 py-2'>
                            <span className='w-[60px] h-2 animate-wave rounded-2xl'></span>
                            <span className='w-[100px] h-2 animate-wave rounded-2xl'></span>
                        </div>
                        <div className='flex flex-row justify-between w-full items-center min-w-0 gap-2 py-2'>
                            <span className='w-[80px] h-2 animate-wave rounded-2xl'></span>
                            <span className='w-[120px] h-2 animate-wave rounded-2xl'></span>
                        </div>
                        <div className='flex flex-row justify-between w-full items-center min-w-0 gap-2 py-2'>
                            <span className='w-[60px] h-2 animate-wave rounded-2xl'></span>
                            <span className='w-[80px] h-2 animate-wave rounded-2xl'></span>
                        </div>
                        <div className='flex flex-row justify-between w-full items-center min-w-0 gap-2 py-2'>
                            <span className='w-[40px] h-2 animate-wave rounded-2xl'></span>
                            <span className='w-[100px] h-2 animate-wave rounded-2xl'></span>
                        </div>
                        <div className='flex flex-row justify-between w-full items-center min-w-0 gap-2 py-2'>
                            <span className='w-[80px] h-2 animate-wave rounded-2xl'></span>
                            <span className='w-[120px] h-2 animate-wave rounded-2xl'></span>
                        </div>
                    </>}

            </div>
        </div>
    )
}

export default EmpPersonalSection
