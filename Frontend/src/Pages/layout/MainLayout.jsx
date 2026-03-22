import { useEffect, useState } from "react";
import Sidebar from "./MobileSidebar";
import Appbar from "./Appbar";
import DesktopSideabr from "./DesktopSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


export default function MainLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname == '/') {
            navigate('/dashboard');
        }
    }, []);
    return (
        <div
            className="w-[100dvw] h-[100dvh]  relative flex flex-row">
            <DesktopSideabr openSidebar={openSidebar} />
            <div
                className="flex flex-row flex-1">
                <Appbar setOpenSidebar={setOpenSidebar} />
                <Outlet/>
            </div>
            {openSidebar && <div
                onClick={() => setOpenSidebar(false)}
                className="w-full h-full lg:hidden absolute z-50 bg-low-text/40 backdrop-blur-[2px]">

            </div>}
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        </div>
    )
}