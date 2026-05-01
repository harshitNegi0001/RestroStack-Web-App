import { LuLayoutDashboard } from "react-icons/lu";
import { PiChefHatBold } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdOutlineTableBar } from "react-icons/md";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { BiFoodMenu } from "react-icons/bi";
export const sidebarNavs = [
    {
        id: 1,
        title: 'Operations',
        options: [
            {
                id: 1,
                title: 'Dashboard',
                icon: <LuLayoutDashboard />,
                path: '/dashboard',
                permission: 'view_dashboard'
            },
            {
                id: 2,
                title: 'Live Orders',
                icon: <PiChefHatBold />,
                path: '/live-orders',
                permission: 'view_live_orders'
            },
            {
                id: 3,
                title: 'My Restaurant',
                icon: <IoStorefrontOutline />,
                path: '/restaurant-management',
                permission: 'manage_restaurant_setup'
            },
            {
                id: 4,
                title: 'Live Tables',
                icon: <MdOutlineTableBar />,
                path: '/res-tables',
                permission: 'can_manage_table'
            },
            {
                id: 5,
                title: 'Menu',
                icon: <BiFoodMenu />,
                path: '/menu-management',
                permission: 'manage_menu'
            },
            // {
            //     id: 6,
            //     title: 'Inventory',
            //     icon: <LuPackage />,
            //     path: '/inventory',
            //     permission: 'view_inventory'
            // },
        ]
    },
    {
        id: 2,
        title: 'Workforce',
        options: [
            {
                id: 6,
                title: 'Staff',
                icon: <HiOutlineUsers />,
                path: '/staff',
                permission: 'can_manage_staff'
            },
            {
                id: 7,
                title: 'Job Postings',
                icon: <LuBriefcaseBusiness />,
                path: '/jobs',
                permission: 'can_post_jobs'
            },
        ]
    },
    {
        id: 3,
        title: 'Finance',
        options: [
            {
                id: 8,
                title: 'Transactions',
                icon: <IoReceiptOutline />,
                path: '/transactions',
                permission: 'view_billings'
            },
            {
                id: 9,
                title: 'Subscription',
                icon: <HiOutlineCreditCard />,
                path: '/subscription',
                permission: 'buy_subscription'
            },
        ]
    },
    {
        id: 4,
        title: 'System',
        options: [
            {
                id: 10,
                title: 'Settings',
                icon: <LuSettings />,
                path: '/settings',
                permission: 'manage_settings'
            },
        ]
    }
]
