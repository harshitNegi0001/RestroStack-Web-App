import { IoSearch } from "react-icons/io5";




export default function JobFilterComponent({ searchValue, setSearchValue, jobStatus, setJobStatus, department, setDepartment, allDepartments }) {
    
    return (
        <div className="max-w-full bg-card-bg/60 p-2 gap-2 flex flex-wrap items-center rounded-2xl border-1 border-divider/50">
            <div
                className='w-[100%] max-w-[350px] md:max-w-[450px]: flex flex-col gap-1 relative'>


                <label htmlFor='search-input'
                    className='absolute bottom-1 left-1  text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px]  text-[20px] '>
                    <IoSearch />
                </label>
                <input id='search-input'
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='Search by job title'
                    className='outline-divider bg-toast-bg/60
                                    border-0 focus:outline-2 pl-9  focus:outline-active-border outline-1
                                    rounded-lg p-1.5  text-main-text text-[16px] ' />
            </div>
            <div className="flex flex-row flex-wrap gap-2">
                <div
                    className='w-[200px] flex flex-col gap-1 relative'>

                    
                    <select id="role-input"
                        value={jobStatus} onChange={(e) => setJobStatus(e.target.value)}
                        className='outline-divider bg-toast-bg/60
                            border-0 focus:outline-2  focus:outline-active-border  outline-1 
                            rounded-lg p-1.5 text-main-text text-[16px] '>
                         <option  value={null}
                                className="bg-main-bg ">
                                Select Status
                            </option>
                             <option value={'active'}
                                className="bg-main-bg ">
                                Active
                            </option>
                            <option value={'paused'}
                                className="bg-main-bg ">
                                Paused
                            </option>
                    </select>

                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
                <div
                    className='w-[200px] flex flex-col gap-1 relative'>

                    
                    <select id="role-input"
                        value={department} onChange={(e) => setDepartment(e.target.value)}
                        className='outline-divider bg-toast-bg/60
                            border-0 focus:outline-2  focus:outline-active-border  outline-1 
                            rounded-lg p-1.5 text-main-text text-[16px] '>
                         <option  value={null}
                                className="bg-main-bg ">
                                Select Deparment
                            </option>
                             {allDepartments?.map(d=><option key={d.id} value={d.value}
                                className="bg-main-bg ">
                                {d.label}
                            </option>)}
                            
                    </select>

                </div>
            </div>
        </div>
    )
}