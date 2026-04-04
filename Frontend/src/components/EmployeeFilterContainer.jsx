import { IoSearch } from "react-icons/io5";




export default function EmployeeFilter({ searchValue, setSearchValue, roles, role, setRole }) {
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
                    placeholder='Search by name or email...' required
                    className='border-divider bg-toast-bg/60
                                    border-1 focus:outline-1 pl-9  focus:outline-active-border focus:border-active-border outline-0 
                                                    rounded-lg p-1.5  text-main-text text-[16px] ' />
            </div>
            <div className="flex flex-row flex-wrap gap-2">
                <div
                    className='w-[200px] flex flex-col gap-1 relative'>

                    <label htmlFor='role-input'
                        className='absolute bottom-0.5 left-1 text-gray-500 flex justify-center items-center rounded-lg
                                                size-[30px] text-[20px]'>
                        {roles.find(c => c.value == role).icon}
                    </label>
                    <select id="role-input"
                        value={role} onChange={(e) => setRole(e.target.value)}
                        className='border-divider bg-toast-bg/60
                                                border-1 focus:outline-1 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                                                rounded-lg p-1.5 text-main-text text-[16px] '>
                        {roles.map(r =>
                            <option key={r.id} value={r.value}
                                className="bg-main-bg ">
                                {r.label}
                            </option>
                        )}
                    </select>

                </div>
            </div>
        </div>
    )
}