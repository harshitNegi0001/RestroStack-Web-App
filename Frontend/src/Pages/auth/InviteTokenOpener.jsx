import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom"
import InviteCard from "./components/InviteCard";
import LoadingInviteCard from "./components/LoadingInviteCard";
import { verifyInviteToken } from "../../Apis/staffManagementApi";




export default function InviteTokenOpener() {
    const [searchParam] = useSearchParams();
    const [isTokenLoading, setIsTokenLoading] = useState(true);
    const [resData, setResData] = useState({
        res_name: '',
        role_name: ''
    });
    const [restriction, setRestriction] = useState({
        isRestricted: false,
        reason: ''
    });
    useEffect(() => {
        viewInviteToken();
    }, []);
    const viewInviteToken = async () => {
        const successFunction = (arg) => {
            const { data } = arg;
            setResData({ res_name: data?.res_name, role_name: data?.role_name });
        }
        await verifyInviteToken(token, 'view', successFunction);
        setIsTokenLoading(false);
    }

    const token = searchParam.get('token');

    return (
        <div className="min-w-[100dvw] min-h-[100dvh] flex justify-center items-center">
            {
                restriction.isRestricted ?
                    <>

                    </> :
                    isTokenLoading ?
                        <LoadingInviteCard /> :
                        <InviteCard res_name={resData?.res_name} role_name={resData?.role_name} token={token} />
            }
        </div>
    )
}