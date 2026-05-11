import { formatDate } from "../utils/clientSideData/timeFunctions";
import { WiTime4 } from "react-icons/wi";
import { TbCancel } from "react-icons/tb";
import { ImWarning } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";

const statusColor = {
    'declined': 'text-red-600 bg-red-600/10',
    'accepted': 'text-green-600 bg-green-600/10',
    'pending': 'text-low-text/70 bg-low-text/5',
    'expired': 'text-orange-600 bg-orange-600/10'
}
const statusIcon = {
    'declined': <TbCancel />,
    'pending': <WiTime4 />,
    'expired': <ImWarning />,
    'accepted': <FaCheckCircle />,
}
export default function InviteHistoryCard({ isLoading, data }) {
    const currrent_time = new Date();
    const expiry = new Date(data?.expires_at);

    const status = (data?.status == 'pending' && expiry < currrent_time) ? 'expired' : data?.status || 'pending';
    return (
        <div className={`${isLoading ? 'animate-pulse' : ''}
            bg-toast-bg flex items-center gap-1 p-2 rounded-lg`}>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
                <span className={`${isLoading ? 'w-full max-w-[180px] p-1.5 rounded-2xl animate-wave my-1' :
                    'text-[10px] sm:text-[11px] lg:text-[12px] px-2 py-1 rounded-md bg-divider/50 w-fit max-w-full min-w-0 truncate'}`}>
                    {!isLoading && 'Res-**************************************'}
                </span>
                <span className={`${isLoading ? 'w-full max-w-[120px] p-1.5 rounded-2xl animate-wave my-1' :
                    'text-sec-text text-[10px] sm:text-[11px] lg:text-[12px] capitalize px-2'
                    }`}>
                    {!isLoading ? `Role : ${data?.role_name || ''}` : null}
                </span>
                <span className={`${isLoading ? 'w-full max-w-[120px] p-1.5 rounded-2xl animate-wave my-1' :
                    'text-sec-text text-[10px] sm:text-[11px] lg:text-[12px] px-2'
                    }`}>
                    {!isLoading ? `Sent to : ${data?.sent_to || ''}` : null}
                </span>
                <span className={`${isLoading ? 'w-full max-w-[120px] p-1.5 rounded-2xl animate-wave my-1' :
                    'text-low-text/70 text-[8px] sm:text-[9px] lg:text-[10px] px-2'
                    }`}>{!isLoading ? `Date : ${formatDate(data?.created_at)}` : null}</span>
            </div>
            <div className={`${isLoading ? 'animate-wave w-[80px] rounded-lg py-3' :
                'flex items-center px-3 py-1 rounded-lg gap-0.5'}
                    ${statusColor[status]}`}>
                {
                    isLoading ?
                        <>
                        </> :
                        <>
                            {statusIcon[status]}
                            <span className={`text-[11px] sm:text-[12px] lg:text-[13px] font-[500] capitalize`}>{status}</span>
                        </>
                }
            </div>
        </div>
    )
}