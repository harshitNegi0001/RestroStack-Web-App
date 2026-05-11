import { useEffect, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { getInviteHistory } from "../Apis/staffManagementApi";
import InviteHistoryCard from "./InviteHistoryCard";






export default function InviteTokenHistory({ setShowHist }) {
    const [inviteList, setInviteList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = async () => {
        function successFunction(data) {
            setInviteList(data);
        }
        setIsLoading(true);
        await getInviteHistory(successFunction);
        setIsLoading(false);
    }
    return (
        <>
            <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">

                <button onClick={() => setShowHist(false)}
                    className=" p-1.5  flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                        hover:bg-main-text/5 active:bg-main-text/10">
                    <IoArrowBack />
                </button><div className="flex-1 flex flex-col ">
                    <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
                        Invitation History
                    </h6>
                    <span className="text-low-text/70 text-[10px] md:text-[11px] ">
                        Track and manage sent invitations and their current status.
                    </span>
                </div>


            </div>
            {isLoading ?
                <div className="flex flex-col gap-2 px-3 py-2 min-h-0 flex-1 overflow-y-auto mask-bottom-fade show-custom-scrollbar">
                    {
                        [1, 2, 3, 4].map(i =>
                            <InviteHistoryCard isLoading={true} key={i} />
                        )
                    }
                </div> :
                inviteList.length == 0 ?
                    <div className="flex-1 min-h-0 overflow-y-auto show-custom-scrollbar flex flex-col items-center justify-center gap-1 w-full">
                        <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1776824800/uppdvvhqrps5hgxpnpwf.png" alt=""
                            className="w-[90%] max-w-[250px] object-contain" />
                        <div className="w-full flex flex-col items-center text-center gap-1">
                            <div className="w-full text-[24px] md:text-[27px] font-[600] uppercase text-main-text">
                                No Invitations Found
                            </div>
                            <div className="w-full text-[11px] sm:text-[13px] text-low-text/70 whitespace-pre-line">
                               You haven't sent any invitations yet.<br/> Once you invite a staff member, their status and token details will appear here.
                            </div>
                        </div>
                    </div> :
                    <div className="flex flex-col gap-2 px-3 py-2 min-h-0 flex-1 overflow-y-auto show-custom-scrollbar">
                        {
                            inviteList.map(i =>
                                <InviteHistoryCard isLoading={false} data={i} key={i.data} />
                            )
                        }
                    </div>
            }
        </>
    )
}