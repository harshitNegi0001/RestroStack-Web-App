import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function ProtectedRoute({route,children}){
    const {role,permissions,isLoading,userInfo} = useSelector(state=>state.auth);
    const isNewUser = !userInfo?.verified_email;
    const isRestrected = userInfo?.acc_status!='active';

    if(isLoading){
        return;
        // return(
        //     <>

        //     </>
        // )
    }
    if(!userInfo){
        return <Navigate to={'/login'} replace/>
    }
    if(!role){
        if(userInfo?.is_onboarded){
        return <Suspense fallback={null}>{children}</Suspense>
        }
    }
    if(role=='owner'||permissions[route.permissions]){
        return <Suspense fallback={null}>{children}</Suspense>
    }
    
}

export default ProtectedRoute;