import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


function ProtectedRoute({ route, children }) {
    const location = useLocation();
    const { role, permissions, isLoading, userInfo } = useSelector(state => state.auth);
    const isNewUser = !userInfo?.verified_email;
    const isRestrected = userInfo?.acc_status != 'active';

    if (isLoading) {
        return (<div className="w-[100dvw] h-[100dvh] flex flex-col justify-center gap-4 items-center">
            <div className="size-[45px]">
                <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1773712565/dhd5mphtokjeobqrtafs.png" alt=""
                    className="size-full object-contain animate-pulse" />
            </div>
            <div className="flex flex-row justify-center items-center text-low-text">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-sec-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading...</span>
            </div>
        </div>)
    }
    if (!userInfo) {
        return <Navigate to={`/auth-window?redirectTo=${encodeURIComponent(location.pathname + location.search)}`} replace />
    }
    // handle case based on user account_status here
    if (route.needAuth) {
        return <Suspense fallback={null}>{children}</Suspense>

    }
    if (!role) {
        if (userInfo?.is_onboarded) {
            return <Navigate to={'/setup-user'} replace />
        }
        else {
            return <Navigate to={'/job-portal'} replace />
        }
    }
    if (role == 'owner' || permissions[route.permission] || !route.permission) {
        return <Suspense fallback={null}>{children}</Suspense>
    }
    else {
        return <Navigate to={'/access-denied'} replace />
    }

}

export default ProtectedRoute;