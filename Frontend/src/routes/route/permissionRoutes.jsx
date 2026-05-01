import { lazy } from "react";


const Dashboard = lazy(()=>import("../../Pages/view/Dashboard"));
const StaffPage = lazy(()=>import("../../Pages/view/StaffPage"));
const JobPosts = lazy(()=>import("../../Pages/view/JobPosts"));
const RestaurantManagementPage = lazy(()=>import("../../Pages/view/RestaurantManagementPage"));
const MenuBuilder = lazy(()=>import("../../Pages/view/MenuBuilder"));



export const permissionBasedRoutes = [
    {
        id:1,
        path:'/dashboard',
        permission:'',
        element:<Dashboard />
    },
    {
        id:2,
        path:'/staff',
        permission:'can_manage_staff',
        element:<StaffPage />
    },
    {
        id:3,
        path:'/jobs',
        permission:'',
        element:<JobPosts />
    },
    {
        id:4,
        path:'/restaurant-management',
        permission:'manage_restaurant_setup',
        element:<RestaurantManagementPage/>
    },
    {
        id:4,
        path:'/menu-management',
        permission:'manage_menu',
        element:<MenuBuilder/>
    }
]