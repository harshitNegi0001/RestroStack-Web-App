import { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { askForOtp } from '../../Apis/authApi';




export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    const searchAndSendOtp = async (e) => {
        function successFunction() {
            // setActivePage('enter_otp');
            navigate(`/verify-email?redirectTo=${redirectTo}`, { state: { email: email, otp_type: 'reset_pass', prev: '/forgot-password' } })
        }
        // await newPassOtpGenerate(e, email, successFunction);
        await askForOtp({ email: email, otp_type: 'reset_pass' }, setIsLoading, successFunction);

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
                        className='text-[17px] md:text-[19px] lg:text-[21px] 
                           text-main-text font-[600] '
                    >
                        Search your account
                    </h1>
                    <span className='text-low-text/70 font-[400]
                           text-[10px] md:text-[11px] lg:text-[12px]'>
                        Enter your email address to find your account and reset your password.
                    </span>


                </div>
                <div
                    className='w-[100%] max-w-[450px] flex flex-col gap-1 relative'>
                    <label htmlFor="email-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Email</label>

                    <label htmlFor='email-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                        <HiOutlineMail />
                    </label>
                    <input id='email-input' type="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        required
                        className='outline-divider 
                            border-0 focus:outline-2 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-1
                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />

                </div>

                <div className='w-full flex flex-col items-center gap-1 '>

                    <button
                        onClick={searchAndSendOtp}
                        disabled={isLoading}
                        className={`mt-3 py-2 px-6  text-[12px] md:text-[13px] lg:text-[14px] font-[600] rounded-lg bg-linear-0 text-white flex items-center justify-center
                                ${isLoading ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                        {isLoading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : null}
                        {
                            isLoading ? <span className='text-white/80'>Processing...</span> : 'Generate OTP'
                        }
                    </button>

                </div>
                <div className='flex items-center justify-center gap-1.5 w-full'>
                    {/* divider */}
                    <div className='border-b-1 border-divider/60 w-[42%]'></div>
                    <span className='text-low-text/70 text-[11px] md:text-[14px]'>or</span>
                    <div className='border-b-1 border-divider/60 w-[42%]'></div>
                </div>
                <div
                    className='w-full text-center flex justify-center items-center gap-1'>
                    <span className='text-sec-text  text-[11px] md:text-[14px] '>
                        Don't have an account?
                    </span>
                    <span onClick={() => navigate('/register')}
                        className='text-active-border/70 active:text-active-border font-[600]  text-[11px] md:text-[14px]
                    hover:underline active:underline  cursor-pointer'>Sign Up</span>
                </div>
            </div>

        </div>
    )
}