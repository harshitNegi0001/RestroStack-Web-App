import { useState } from "react"
import { verifyInviteToken } from "../../../Apis/staffManagementApi";
import { useDispatch } from "react-redux";
import { setState } from "../../../Store/Auth/authReducer";
import { useNavigate } from "react-router-dom";






export default function InviteCard({ res_name, role_name, token, restrictionFunction }) {
    const [isLoadingBtn, setIsLoadingBtn] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleJoin = async () => {
        setIsLoadingBtn('join');
        const successFunction = (arg) => {
            const { data } = arg;
            dispatch(setState(data));
            navigate('/dashboard');
        }
        await verifyInviteToken(token, 'join', successFunction, restrictionFunction);
        setIsLoadingBtn('');

    }

    const handleDecline = async () => {
        const successFunction = () => {
            navigate('/')
        }
        setIsLoadingBtn('decline');
        await verifyInviteToken(token, 'decline', successFunction);
        setIsLoadingBtn('');
    }
    return (
        <div className="flex flex-col w-[90%] max-w-[350px] lg:max-w-[450px] items-center gap-3 bg-card-bg shadow-black/30 shadow-lg px-3 py-[70px] rounded-2xl">
            <div>
                <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1774597198/jffuvurfhiqi2gbaz5hb.png" alt=""
                    className="w-[60px]" />
            </div>
            <h3 className="font-semibold text-[24px] text-active-border">
                You're invited!
            </h3>
            <div className="text-center px-2 text-[14px] text-sec-text/80 ">
                You have been invited to join the team at <b>{res_name}</b> as a <b>{role_name}</b>.
            </div>
            <div className="flex px-3 flex-col gap-0 w-full">
                <button
                    disabled={isLoadingBtn}
                    onClick={handleJoin}
                    className={`w-full mt-3 h-[35px] md:h-[40px] rounded-lg bg-linear-0 text-white text-[13px] md:text-[14px] lg:text-[16px] font-[500] flex items-center justify-center
                         
                        ${isLoadingBtn ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    {isLoadingBtn == 'join' ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : null}
                    {
                        isLoadingBtn == 'join' ? <span className='text-white/80'>Processing...</span> : 'Accept & join team'
                    }

                </button>
                <button onClick={handleDecline}
                    disabled={isLoadingBtn}
                    className={`
                         border-1 rounded-lg w-full mt-3 h-[35px] md:h-[40px] text-[13px] md:text-[14px] lg:text-[16px] font-[500] 
                        ${isLoadingBtn ? 'border-divider text-divider cursor-not-allowed' : 'border-green-600/70 text-green-600/70 hover:text-green-600 hover:border-green-600 hover:bg-toast-bg/30 active:scale-99 active:text-green-600 active:border-green-600 active:bg-toast-bg/30'}
                        `}>
                    {isLoadingBtn == 'decline' ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : null}
                    {
                        isLoadingBtn == 'decline' ? <span >Processing...</span> : 'Decline'
                    }
                </button>

            </div>

        </div>
    )
}