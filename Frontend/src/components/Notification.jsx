import { useState } from "react";
import { MdClose } from "react-icons/md";
import NoNotificationSvg from "../utils/illustrations/NoNotification";


export default function Notification({ openNotification, setOpenNotification, ref }) {
    const [notifications,setNotifications] = useState([]);
    return (
        <div ref={ref} className={`${openNotification ? 'flex' : 'hidden'} shadow-xl shadow-black/40 bg-toast-bg h-[100dvh] w-[100dvw] sm:w-[450px] fixed top-0 left-0 sm:absolute sm:top-[-12px] sm:left-[-450px]
        flex flex-col gap-1 sm:rounded-2xl items-center`}>
            <div className="w-full flex border-b-1 border-divider justify-between p-2">
                <button
                    onClick={() => setOpenNotification(false)}
                    className={`size-[43px] flex justify-center rounded-[50%] items-center hover:bg-main-text/10 active:bg-main-text/20
                            text-sec-text/80 hover:text-sec-text text-[22px]`}>
                    <MdClose />
                </button>
            </div>
            <div className="flex-1 min-h-0 w-full flex flex-col gap-1 p-3 overflow-y-auto show-custom-scrollbar">
                {
                    notifications.length==0 ?
                    <div className="w-full flex flex-col gap-1 my-auto items-center py-3">
                        <div className="w-[90%] max-w-[300px] px-3">

                            <NoNotificationSvg className="w-full" />
                        </div>
                        <div className="text-center mt-0 flex flex-col gap-1.5">
                            <h3 className="text-[17px] sm:text-[19px] font-semibold text-main-text">
                                Nothing to show
                            </h3>
                            <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                                You don't have any notifications yet. Notifications will show here.
                            </p>
                        </div>
                    </div>:
                    <div></div>
                }
            </div>
            
        </div>
    )
}