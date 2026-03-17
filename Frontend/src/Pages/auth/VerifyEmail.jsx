import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { askForOtp, verifyOtp } from "../../Apis/Auth";
import { setState } from "../../Store/Auth/authReducer";
import { useDispatch } from 'react-redux';



export default function VerifyEmail() {

    const { state } = useLocation();
    const [otp, setOtp] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: ''
    });
    const [askOtpGenerate, setAskOtpGenerate] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [getOtpLoading, setGetOtpLoading] = useState(false);
    const [otpCountdown, setOtpCountdown] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = state?.email;
    const prev = state?.prev;
    const otp_type=state?.otp_type;
    const valid = (otp?.[1] && otp?.[2] && otp?.[3] && otp?.[4] && otp?.[5] && otp?.[6]);



    useEffect(() => {
        if (!email) {
            navigate('/login');
        }
        if (prev == '/login') {
            setAskOtpGenerate(true);
            return;
        }

        setOtpCountdown(180);

    }, []);

    useEffect(() => {
        if (otpCountdown == 0) {
            return;
        }
        const countdown = setInterval(() => {

            setOtpCountdown(prev => parseInt(prev) - 1);
        }, 1000);
        return () => {
            clearInterval(countdown);
        }
    }, [otpCountdown]);

    const resendOtp = async () => {
        if (otpCountdown > 0) {
            return;
        }
        const successFunction = () => {
            setAskOtpGenerate(false);
            setOtpCountdown(180);
        }
        askForOtp({email:email,otp_type:otp_type}, setGetOtpLoading, successFunction);
    }
    const handleOtpChange = (e, i) => {
        const value = e.target.value;
        const checkNumber = /^[0-9]?$/;
        if (!checkNumber.test(e.target.value)) {
            return;
        }
        setOtp(prev => ({ ...prev, [i]: value }));
        if (value && i < 6) {
            const nextInput = document.getElementById(`otpInput${i + 1}`);
            nextInput.focus();
            return;
        }
        if (!value && i > 1) {
            const prevInput = document.getElementById(`otpInput${i - 1}`);
            prevInput.focus();
        }

    }
    const handleVerification = async (e) => {
        if (!valid) {
            return;
        }
        const structuredOtp = `${otp?.[1]}${otp?.[2]}${otp?.[3]}${otp?.[4]}${otp?.[5]}${otp?.[6]}`;
        const successFunction = (userInfo) => {
            dispatch(setState({ userInfo: userInfo }));
            navigate('/setup-user');

        }
        verifyOtp(e, email, structuredOtp, setIsLoadingBtn, successFunction);

    }
    return (
        <div

            className="w-dvw min-h-dvh flex justify-center items-center p-4 ">
            {askOtpGenerate ?
                <div
                    className="w-[100%] max-w-[550px]  flex flex-col items-center gap-4 justify-center bg-half-trans-bg border-2 border-divider p-3 md:p-5 py-8 rounded-2xl">
                    <div
                        className="w-[70px] h-[70px] bg-green-900/30 rounded-2xl flex justify-center items-center"
                    >
                        <img src={'https://res.cloudinary.com/dns5lxuvy/image/upload/v1773221725/hl8hp0a3pi9pjzyn2tty.png'} className='w-[50px] h-[50px] object-contain' alt="" />
                    </div>
                    <div className='flex flex-col gap-0 items-center text-center'>
                        <h1
                            className='text-[17px] md:text-[19px] lg:text-[21px] 
                           text-main-text font-[600] '
                        >
                            Email Verification Required
                        </h1>
                        <span className='text-low-text/70 font-[400]
                           text-[10px] md:text-[11px] lg:text-[12px]'>
                            Your email is not verified yet. Please click the button below to receive a 6-digit verification code.
                        </span>


                    </div>
                    <div className='w-full flex flex-col items-center gap-1 '>

                        <button
                            onClick={resendOtp}
                            disabled={getOtpLoading}
                            className={`mt-3 py-2 px-6  text-[12px] md:text-[13px] lg:text-[14px] font-[600] rounded-lg bg-linear-0 text-white flex items-center justify-center
                                ${getOtpLoading ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                            {getOtpLoading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> : null}
                            {
                                getOtpLoading ? <span className='text-white/80'>Processing...</span> : 'Send OTP'
                            }
                        </button>

                    </div>

                </div> :
                <div
                    className="w-[100%] max-w-[550px]  flex flex-col items-center gap-4 justify-center bg-half-trans-bg border-2 border-divider p-3 md:p-5 py-8 rounded-2xl">
                    <div
                        className="w-[70px] h-[70px] bg-green-900/30 rounded-2xl flex justify-center items-center"
                    >
                        <img src={'https://res.cloudinary.com/dns5lxuvy/image/upload/v1773221725/hl8hp0a3pi9pjzyn2tty.png'} className='w-[50px] h-[50px] object-contain' alt="" />

                    </div>
                    <div className='flex flex-col gap-0 items-center text-center'>
                        <h1
                            className='text-[17px] md:text-[19px] lg:text-[21px] 
                           text-main-text font-[600] '
                        >
                            Verify Email
                        </h1>
                        <span className='text-low-text/70 font-[400]
                           text-[10px] md:text-[11px] lg:text-[12px]'>
                            Enter 6-digit OTP sent on your email.
                        </span>


                    </div>
                    <form onSubmit={handleVerification}
                        className="w-full flex flex-col items-center gap-7">
                        <div
                            className="w-full flex justify-center gap-2">
                            {
                                [1, 2, 3, 4, 5, 6].map(i =>
                                    <input key={i} type="text" required
                                        autoComplete={`input-otp[i]`}
                                        id={`otpInput${i}`} value={otp?.[i]} onChange={(e) => handleOtpChange(e, i)}
                                        className="bg-main-bg w-[35px] hover:border-sec-text  text-center  aspect-square sm:w-[45px] rounded-xl border-1 border-divider focus:outline-1 focus:outline-active-border focus:border-active-border text-sec-text" />
                                )
                            }

                        </div>
                        <div className='w-full flex flex-col items-center gap-1 '>

                            <button type="submit"
                                disabled={isLoadingBtn || !valid}
                                className={`mt-3 py-2 px-6  text-[12px] md:text-[13px] lg:text-[14px] font-[600] rounded-lg bg-linear-0 text-white flex items-center justify-center
                                ${isLoadingBtn || !valid ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                                {isLoadingBtn ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> : null}
                                {
                                    isLoadingBtn ? <span className='text-white/80'>Processing...</span> : 'Verify'
                                }
                            </button>

                        </div>
                    </form>
                    <div
                        className='w-full text-center flex justify-center items-center gap-1'>
                        {/* <span className='text-sec-text  text-[13px] md:text-[15px] lg:text-[17px]'>
                        Didn't received otp?
                    </span> */}
                        <span onClick={() => resendOtp()}
                            className=
                            {`${otpCountdown == 0 ? 'text-active-border/70 hover:text-active-border/80 active:text-active-border hover:underline active:underline font-[600] active:text-active-border' : 'text-divider '}    
                        text-[13px] md:text-[15px] lg:text-[17px]
                     cursor-pointer`}>Resend OTP</span>
                        {(otpCountdown != 0) && <span className='text-sec-text  text-[8px] md:text-[10px] lg:text-[11px]'>
                            in {otpCountdown} s
                        </span>}
                    </div>
                    {/* <div
                    className='w-full text-center flex justify-center items-center mt-2'>


                </div> */}

                </div>}
        </div>
    )
}