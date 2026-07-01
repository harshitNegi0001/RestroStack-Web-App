import { useEffect, useState } from "react";
import { LuHandPlatter } from "react-icons/lu";
import { PiChefHatBold } from "react-icons/pi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { GrUserManager } from "react-icons/gr";
import EmployeeFilter from "./EmployeeFilterContainer";
import EmployeeCard from "./EmployeeCard";
import { getStaffList } from "../Apis/staffManagementApi";
import LoadingEmployeeCard from "./LoadingEmployeeCard";
import NoStaff from "../utils/illustrations/NoStaff";

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
    const [debouncedSearch, setDebauncedSearch] = useState('');
    const [role, setRole] = useState('all');
    const [staffList, setStaffList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const debouncingTimer = setTimeout(() => {
            setDebauncedSearch(searchValue);
        }, 1200)
        return () => clearTimeout(debouncingTimer);
    }, [searchValue]);

    useEffect(() => {
        getFilteredStaff();

    }, [debouncedSearch, role])

    const getFilteredStaff = async () => {
        const filters = {
            query: debouncedSearch,
            role
        }
        function successFunction(data) {
            setStaffList(data);
        }
        setIsLoading(true);
        await getStaffList(filters, successFunction);
        setIsLoading(false);
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <EmployeeFilter role={role} setRole={setRole} roles={roles} searchValue={searchValue} setSearchValue={setSearchValue} />
            {
                !isLoading && staffList.length == 0 ?

                    <div className="w-full flex flex-col gap-1 items-center">
                        <div className="w-full max-w-[380px] px-3">

                            <NoStaff className="w-full" />
                        </div>
                        <div className="text-center mt-0 flex flex-col gap-1.5">
                            <h3 className="text-[17px] sm:text-[19px] font-semibold text-main-text">
                                Nothing to show here!
                            </h3>
                            <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                                Guests at this table haven't placed an order yet. Let's get them started from the Menu.
                            </p>
                        </div>
                    </div> :
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {
                            isLoading ?
                                [1, 2, 3, 4, 5, 6].map(i =>
                                    <LoadingEmployeeCard key={i} />
                                ) :
                                staffList.map(s =>
                                    <EmployeeCard data={s} key={s.id} />
                                )
                        }
                    </div>
            }

        </div>
    )
}