import { lazy } from "react";


const Dashboard = lazy(()=>import("../../Pages/view/Dashboard"));



export const permissionBasedRoutes = [
    {
        id:1,
        path:'/dashboard',
        permission:'',
        element:<Dashboard />
    },
    {
        id:2,
        path:'/live-orders',
        permission:'',
        element:<Dashboard />
    }
]