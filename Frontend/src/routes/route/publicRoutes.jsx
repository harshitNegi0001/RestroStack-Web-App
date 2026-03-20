import { lazy } from "react";
import NewUserSetup from "../../Pages/auth/NewUserSetup";
import SubscriptionWindow from "../../components/SubscriptionWindow";
import MainLayout from "../../Pages/layout/MainLayout";

// const   = lazy(()=>import(''));
const Login = lazy(() => import('../../Pages/auth/Login'));
const RegisterUser = lazy(() => import('../../Pages/auth/RegisterUser'));
const PageNotFound = lazy(() => import('../../Pages/view/PageNotFound'));
const AuthWindow = lazy(() => import('../../Pages/auth/AuthWindow'));
const VerifyEmail = lazy(() => import('../../Pages/auth/VerifyEmail'));


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
        path: '/setup-user',
        element: <NewUserSetup />

    },
    {
        id: 7,
        path: '/subscription_window',
        element: <SubscriptionWindow />

    },
    {
        id: 8,
        path: '/',
        element: <MainLayout />

    },
]