import React, { useState } from 'react'
import BackdropPage from '../components/BackdropPage';
import AlertBox from './ConfirmBox';
import { dangerEmpAction } from '../Apis/staffManagementApi';

function EmpDangerZone({ isLoading, empId , dangerEmpFunction, role_status='active'}) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    is_open: false,
    title: '',
    desc: '',
    type: ''
  });
  const handleDangerAction = async () => {
    const actionType = showConfirm?.title == 'Suspend Employee' ? 'suspend' :showConfirm?.title == 'Remove Employee'? 'remove':'active';
    function successFunction() {
      setShowConfirm({ is_open: false, title: '', desc: '', type: '' });
      dangerEmpFunction(actionType);
    }
    setLoadingBtn(true);
    await dangerEmpAction(empId, actionType, successFunction);
    setLoadingBtn(false);
  }
  return (
    <div className='w-full flex flex-col gap-1 p-2'>
      <BackdropPage isOpen={showConfirm?.is_open} onClose={() => setShowConfirm({ is_open: false, title: '', desc: '', type: '' })} >
        <AlertBox type={showConfirm?.type} title={showConfirm?.title} onCancel={() => setShowConfirm({ is_open: false, title: '', desc: '', type: '' })}
          loadingBtn={loadingBtn} confirmFunction={handleDangerAction} desc={showConfirm?.desc} />
      </BackdropPage>
      <div className={`${isLoading ? 'animate-wave h-3 rounded-2xl w-[170px] mb-1' : ''} text-red-500 text-[13px] md:text-[15px] font-[500]`}>{!isLoading ? 'Danger Zone' : ''}</div>
      <div className={` w-full border-1 border-red-600/30 rounded-2xl p-2 flex flex-col gap-0.5 text-[11px] md:text-[13px] text-low-text`}>
        {role_status=='active'&&<div className='w-full flex flex-row justify-between gap-0.5 items-center border-b-1 border-divider'>
          <div className='min-w-0 flex flex-col flex-1'>
            <div className='text-[12px] md:text-[14px] font-[500] min-w-0 truncate'>Suspend Employee</div>
            <div className='text-[10px] md:text-[12px] text-wrap'>This will temporarily disable the employee's access to the system.</div>
          </div>
          <button onClick={() => setShowConfirm({ is_open: true, title: 'Suspend Employee', desc: 'Are you sure you want to suspend this employee?', type: 'error' })}
            className='w-fit px-2 py-1 rounded-md font-[500] cursor-pointer
          hover:bg-red-600/10 active:bg-red-600/20 border-1 border-red-600/70 active:red-600
          text-red-600 text-[12px] md:text-[14px] active:scale-97 shadow-black/30 shadow:sm hover:shadow-md active:shadow-sm'> Suspend</button>
        </div>}
        {role_status === 'suspend' && <div className='w-full flex flex-row justify-between gap-0.5 items-center border-b-1 border-divider'>
          <div className='min-w-0 flex flex-col flex-1'>
            <div className='text-[12px] md:text-[14px] font-[500] min-w-0 truncate'>Reactivate Employee</div>
            <div className='text-[10px] md:text-[12px] text-wrap'>This will restore the employee's access to the system.</div>
          </div>
          <button onClick={() => setShowConfirm({ is_open: true, title: 'Reactivate Employee', desc: 'Are you sure you want to reactivate this employee?', type: 'success' })}
            className='w-fit px-2 py-1 rounded-md font-[500] cursor-pointer
          hover:bg-green-600/10 active:bg-green-600/20 border-1 border-green-600/70 
          text-green-600 text-[12px] md:text-[14px] active:scale-97 shadow-black/30 shadow:sm hover:shadow-md active:shadow-sm'> Reactivate</button>
        </div>}
        <div className='w-full flex flex-row justify-between gap-0.5 items-center '>
          <div className='min-w-0 flex flex-col flex-1'>
            <div className='text-[12px] md:text-[14px] font-[500] min-w-0 truncate'>Remove Employee</div>
            <div className='text-[10px] md:text-[12px] text-wrap'>This will permanently remove the employee from the system.</div>
          </div>
          <button onClick={() => setShowConfirm({ is_open: true, title: 'Remove Employee', desc: 'Are you sure you want to remove this employee?', type: 'error' })}
            className='w-fit px-2 py-1 rounded-md font-[500] cursor-pointer
          bg-linear-0 to-red-500 from-red-600 hover:from-red-700 active:to-red-700 
          text-white text-[12px] md:text-[14px] active:scale-97 shadow-black/30 shadow:md hover:shadow-lg active:shadow-sm'> Remove</button>
        </div>
      </div>
    </div>
  )
}

export default EmpDangerZone
