import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom"




export default function InviteTokenOpener() {
    const [searchParam] = useSearchParams();
    // const { userInfo } = useSelector(state => state.auth);
    const [isTokenLoading, setIsTokenLoading] = useState(true);

    const token = searchParam.get('token');

    return (
        <div className="min-w-[100dvw] min-h-[100dvh] flex justify-center items-center">
            {isTokenLoading ?
                <div className="flex items-center">

                </div> :
                <div>

                </div>
            }
        </div>
    )
}