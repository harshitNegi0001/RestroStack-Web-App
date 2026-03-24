import { lazy } from "react";


const Dashboard = lazy(()=>import("../../Pages/view/Dashboard"));
const StaffPage = lazy(()=>import("../../Pages/view/StaffPage"));
const JobPosts = lazy(()=>import("../../Pages/view/JobPosts"));




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
        permission:'',
        element:<StaffPage />
    },
    {
        id:3,
        path:'/jobs',
        permission:'',
        element:<JobPosts />
    }
]