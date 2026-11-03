import React from 'react'

function EmpDangerZone({ isLoading }) {
  return (
    <div className='w-full flex flex-col gap-1 p-2'>
      <div className={`${isLoading ? 'animate-wave h-3 rounded-2xl w-[170px] mb-1' : ''} text-red-500 text-[13px] md:text-[15px] font-[500]`}>{!isLoading ? 'Danger Zone' : ''}</div>
      <div className={` w-full border-1 border-low-text/30 rounded-2xl p-2 flex flex-col gap-0.5 text-[11px] md:text-[13px] text-low-text`}>
      </div>
    </div>
  )
}

export default EmpDangerZone
