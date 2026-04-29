import { lazy } from "react";
import StaffPage from "../../Pages/view/StaffPage";
import RestaurantManagementPage from "../../Pages/view/RestaurantManagementPage";
import MenuBuilder from "../../components/MenuBuilder";
import MainLayout from "../../Pages/layout/MainLayout";

// const   = lazy(()=>import(''));
const Login = lazy(() => import('../../Pages/auth/Login'));
const RegisterUser = lazy(() => import('../../Pages/auth/RegisterUser'));
const PageNotFound = lazy(() => import('../../Pages/view/PageNotFound'));
const AuthWindow = lazy(() => import('../../Pages/auth/AuthWindow'));
const VerifyEmail = lazy(() => import('../../Pages/auth/VerifyEmail'));
const SubscriptionWindow = lazy(() => import('../../components/SubscriptionWindow'));
const NewUserSetup = lazy(() => import('../../Pages/auth/NewUserSetup'));
const ForgotPassword = lazy(() => import('../../Pages/auth/ForgotPassword'));
const RestrictionPage = lazy(() => import('../../components/RestrictionPages'));



export const publicRoutes = [
    {
        id: 1,
        path: '/login',
        element: <Login />

    },
    {
        id: 2,
        path: '/auth-window',
        element: <AuthWindow />

    },
    {
        id: 3,
        path: '/register',
        element: <RegisterUser />

    },
    {
        id: 4,
        path: '/verify-email',
        element: <VerifyEmail />

    },
    {
        id: 5,
        path: '*',
        element: <PageNotFound />

    },
    {
        id: 6,
        path: '/access-denied',
        element: <RestrictionPage image="https://res.cloudinary.com/dns5lxuvy/image/upload/v1775400189/aueerjkxafuplkicqvts.png" title="Access Denied" subtitle="You don't have the necessary permissions to view this page."
         buttonData={{ isButton: true ,onClick:'/dashboard',text:'Go to Dashboard'}}/>
    },
    {
        id: 7,
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        id: 8,
        path: '/offline-page',
        element: <MainLayout />,
    }
    // {
    //     id: 6,
    //     path: '/setup-user',
    //     element: <NewUserSetup />,
    //     needAuth:true
    // },
    // {
    //     id: 7,
    //     path: '/subscription_window',
    //     element: <SubscriptionWindow />,
    //     needAuth:true
    // },

    // {
    //     id: 8,
    //     path: '/',
    //     element: <MainLayout />

    // },
    // {
    //     id: 9,
    //     path: '/dashboard',
    //     element: <MainLayout />

    // },
]