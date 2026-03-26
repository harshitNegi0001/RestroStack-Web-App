import { useEffect, useState } from "react";
import Sidebar from "./MobileSidebar";
import Appbar from "./Appbar";
import DesktopSideabr from "./DesktopSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function MainLayout() {
    const [openSidebar, setOpenSidebar] = useState(localStorage.getItem('openSidebar') == 'true' || false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isLoading } = useSelector(state => state.auth);

    useEffect(() => {
        if (pathname == '/') {
            navigate('/dashboard');
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('openSidebar', openSidebar)
    }, [openSidebar])
    return (
        <>
            {isLoading ?
                <div className="w-[100dvw] h-[100dvh] flex flex-col justify-center gap-4 items-center">
                    <div className="size-[45px]">
                        <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1773712565/dhd5mphtokjeobqrtafs.png" alt=""
                            className="size-full object-contain animate-pulse" />
                    </div>
                    <div className="flex flex-row justify-center items-center text-low-text">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-main-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Loading...</span>
            </div>
                </div> :
                <div
                    className="w-[100dvw] h-[100dvh]  relative flex flex-row">
                    <DesktopSideabr openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                    <div
                        className="flex flex-col flex-1 h-full ">
                        <Appbar setOpenSidebar={setOpenSidebar} />

                        <Outlet />

                    </div>
                    {openSidebar && <div
                        onClick={() => setOpenSidebar(false)}
                        className="w-full h-full lg:hidden absolute z-50 bg-low-text/40 backdrop-blur-[2px]">

                    </div>}
                    <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                </div>}
        </>
    )
}