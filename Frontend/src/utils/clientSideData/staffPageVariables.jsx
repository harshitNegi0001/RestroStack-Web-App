import { LuHandPlatter } from "react-icons/lu";
import { PiChefHatBold } from "react-icons/pi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { GrUserManager } from "react-icons/gr";


export const roles = [
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