import { MdClose } from "react-icons/md";


export default function Notification({ openNotification, setOpenNotification, ref }) {
    return (
        <div ref={ref} className={`${openNotification ? 'flex' : 'hidden'} shadow-xl shadow-black/40 bg-toast-bg h-[100dvh] w-[100dvw] sm:w-[450px] fixed top-0 left-0 sm:absolute sm:top-[-8px] sm:left-[-450px]
        flex flex-col gap-1 sm:rounded-2xl items-center`}>
            <div className="w-full flex border-b-1 border-divider justify-between p-2">
                <button
                    onClick={() => setOpenNotification(false)}
                    className={`size-[43px] flex justify-center rounded-[50%] items-center hover:bg-main-text/10 active:bg-main-text/20
                            text-sec-text/80 hover:text-sec-text text-[22px]`}>
                    <MdClose />
                </button>
            </div>
            
        </div>
    )
}