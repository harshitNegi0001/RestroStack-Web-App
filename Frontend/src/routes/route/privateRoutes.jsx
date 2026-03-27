import { lazy } from "react";
import ProtectedRoute from "./protectedRoutes";
import InviteTokenOpener from "../../Pages/auth/InviteTokenOpener";

const SubscriptionWindow = lazy(()=>import('../../components/SubscriptionWindow'));
const NewUserSetup = lazy(()=>import('../../Pages/auth/NewUserSetup'));

 const privateRoutes = [
    {
        id: 1,
        path: '/setup-user',
        element: <NewUserSetup />,
        needAuth:true
    },
    {
        id: 2,
        path: '/subscription_window',
        element: <SubscriptionWindow />,
        needAuth:true
    },
    {
        id:7,
        path:'/invite',
        element:<InviteTokenOpener/>,
        needAuth:true
    }
]

export const getPrivateRoutes=()=>{
    

    return  privateRoutes.map((r) => ({
        ...r,
        element: <ProtectedRoute route={r}>{r.element}</ProtectedRoute>
    }));
}
