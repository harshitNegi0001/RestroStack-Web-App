import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";



export default function VerifyEmail() {

    const { state } = useLocation();
    const navigate = useNavigate()
    const email = state?.email;
    if (!email) {
        navigate('/register');
    }
    const [otp, setOtp] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: ''
    });
    const [otpCountdown, setOtpCountdown] = useState(0);



    useEffect(() => {
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
        try {

        } catch (err) {
            console.log(err);
        }
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
    const verifyOtp = async (e) => {
        e.preventDefault();
        try {

            navigate('/setup-user');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div

            className="w-dvw min-h-dvh flex justify-center items-center p-4 ">
            <div
                className="w-[100%] max-w-[550px]  flex flex-col items-center gap-4 justify-center bg-half-trans-bg border-2 border-divider p-3 md:p-5 py-8 rounded-2xl">
                <div
                    className="w-[70px] h-[70px] bg-green-900/30 rounded-2xl flex justify-center items-center"
                >
                    <img src={'https://res.cloudinary.com/dns5lxuvy/image/upload/v1773221725/hl8hp0a3pi9pjzyn2tty.png'} className='w-[50px] h-[50px] object-contain' alt="" />

                </div>
                <div className='flex flex-col gap-0 items-center text-center'>
                    <h1
                        className='text-[22px] md:text-[26px] lg:text-[30px] 
                           text-main-text font-[600] '
                    >
                        Verify Email
                    </h1>
                    <span className='text-low-text/70 font-[400]
                           text-[12px] md:text-[14px] lg:text-[16px]'>
                        Enter 6-digit OTP sent on your email.
                    </span>


                </div>
                <form onSubmit={verifyOtp}
                    className="w-full flex flex-col items-center gap-7">
                    <div
                        className="w-full flex justify-center gap-2">
                        {
                            [1, 2, 3, 4, 5, 6].map(i =>
                                <input key={i} type="text" required
                                    id={`otpInput${i}`} value={otp?.[i]} onChange={(e) => handleOtpChange(e, i)}
                                    className="bg-main-bg w-[35px] hover:border-sec-text  text-center  aspect-square sm:w-[45px] rounded-xl border-1 border-divider focus:outline-1 focus:outline-active-border focus:border-active-border text-sec-text" />
                            )
                        }

                    </div>
                    <div className='w-full flex flex-col items-center gap-1 '>

                        <button type="submit"
                            className='w-[120px] mt-3 h-[35px] md:h-[50px] rounded-lg bg-linear-0 text-white text-[13px] md:text-[15px] lg:text-[17px] font-[600]
                                to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600
                                shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'>
                            Verify
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

            </div>
        </div>
    )
}