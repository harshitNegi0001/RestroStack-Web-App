import { useState } from "react";
import { LuHandPlatter } from "react-icons/lu";
import { PiChefHatBold } from "react-icons/pi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { GrUserManager } from "react-icons/gr";
import EmployeeFilter from "./EmployeeFilterContainer";
import EmployeeCard from "./EmployeeCard";

const roles = [
    {
        id: 1,
        label: 'All role',
        value: 'all'
    },
    {
        id: 2,
        label: 'Manager',
        icon: <GrUserManager />,
        value: 'manager'
    },
    {
        id: 3,
        label: 'Waiter',
        icon: <LuHandPlatter />,
        value: 'waiter'
    },
    {
        id: 4,
        label: 'Chef',
        icon: <PiChefHatBold />,
        value: 'chef'
    },
    {
        id: 5,
        label: 'Cashier',
        icon: <HiOutlineBanknotes />,
        value: 'cashier'
    },
]


export default function StaffDirectory() {
    const [searchValue, setSearchValue] = useState('');
    const [role, setRole] = useState('all');
    return (
        <div className="w-full flex flex-col gap-3">
            <EmployeeFilter role={role} setRole={setRole} roles={roles} searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {
                [1,2,3,4,5,6,7,8,9,10,11,12].map(i=>
                    <EmployeeCard data={{}} key={i}/>
                )
                }
            </div>
        </div>
    )
}