import { useEffect, useState } from 'react';
import { PERMISSION_MAP } from '../utils/clientSideData/permissionArray';
import { updateEmployeePermissions } from '../Apis/staffManagementApi';
function EmpCustomizePermission({ permissions, empId, isLoading, successFunction }) {
    const [permissionsState, setPermissionsState] = useState({});
    console.log(permissions)
    useEffect(() => {
        if (permissions) {
            setPermissionsState(permissions);
        }
        // return ()=> setPermissionsState(null);
    }, [permissions])
    useEffect(() => {
        if (permissionsState && Object.keys(permissionsState)?.length>0) {
            const original = JSON.stringify(permissions);
            const current = JSON.stringify(permissionsState);

            if (original != current) {
                handlePermissionChange();
                return;
            }
        }
    }, [permissionsState]);
    const handlePermissionChange = async () => {
        successFunction(permissionsState);
        await updateEmployeePermissions(empId, permissionsState);
    }
    return (
        <div className='w-full flex flex-col gap-1 p-2'>
            <div className={`${isLoading ? 'animate-wave h-3 rounded-2xl w-[170px] mb-1' : ''} text-sec-text text-[13px] md:text-[15px] font-[500]`}>{!isLoading ? 'Customized Permissions' : ''}</div>
            <div className={` w-full border-1 border-low-text/30 rounded-2xl p-2 flex flex-col gap-0.5 text-[11px] md:text-[13px] text-low-text`}>
                {
                    isLoading ?
                        <>
                            <div></div>
                        </> :
                        <>
                            {
                                PERMISSION_MAP.map((p, i) =>
                                    <div key={p.id} className={`${i != PERMISSION_MAP?.length - 1 ? ' border-b-1' : ''} flex flex-row gap-1 items-center justify-between border-divider p-1`}>
                                        <div className='min-w-0 truncate flex flex-col gap-0.5'>
                                            <div className='text-[12px] md:text-[14px] font-[500] min-w-0 truncate'>{p?.title}</div>
                                            <div className='text-[10px] md:text-[12px] text-wrap'>{p?.desc}</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={permissionsState?.[p.key] ?? false} onChange={(e) => setPermissionsState(prev => ({ ...prev, [p.key]: e.target.checked }))} />

                                            <div className="w-9 h-5 bg-low-text/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10b956]"></div>
                                        </label>
                                    </div>
                                )
                            }</>
                }
            </div>
        </div>
    )
}

export default EmpCustomizePermission
