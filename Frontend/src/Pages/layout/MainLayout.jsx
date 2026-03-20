import { useEffect, useState } from "react"
import Sidebar from "./MobileSidebar";
import Appbar from "./DesktopAppbar";
import DesktopSideabr from "./DesktopSidebar";



export default function MainLayout() {
    const [openSidebar, setOpenSidebar] = useState(true);
    useEffect(() => {

    }, []);
    return (
        <div
            className="w-[100dvw] h-[100dvh]  relative flex flex-row">
                <DesktopSideabr openSidebar={openSidebar}/>
            <div 
            className="flex flex-row flex-1">
                <Appbar setOpenSidebar={setOpenSidebar}/>
            </div>
            {openSidebar && <div
                onClick={() => setOpenSidebar(false)}
                className="w-full h-full lg:hidden absolute z-50 bg-low-text/40 backdrop-blur-[2px]">

            </div>}
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        </div>
    )
}