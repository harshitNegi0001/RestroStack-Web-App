import { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";


export default function Login() {
    const [state, setState] = useState({
        email: '',
        pass: ''
    });
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div

            className="w-dvw min-h-dvh flex justify-center items-center p-2">
            <div
                className="w-[100%] max-w-[550px] flex flex-col items-center gap-3 justify-center bg-half-trans-bg border-2 border-divider p-5 rounded-2xl">
                <div
                    className='w-full flex justify-start '>
                    <div onClick={()=>navigate('/auth-window')}
                    className='w-fit p-2 text-low-text/70 text-[12px] md:text-[14px] lg:text-[16px] hover:text-low-text/80 gap-1 flex items-center cursor-pointer active:text-low-text'>
                        <IoMdArrowRoundBack/>
                        <span>Back</span>
                    </div>
                </div>
                <div className='w-full'>
                    <form onSubmit={handleLogin}
                        className='w-full flex flex-col gap-3 items-center'
                    >
                        <div
                            className='flex flex-col items-center text-center'>
                            <h4 className='text-sec-text font-[600]
                        text-[20px] md:text-[24px] lg:text-[28px]
                        '>
                                Welcome back
                            </h4>
                            <span
                                className='text-low-text/70
                        text-[12px] md:text-[14px] lg:text-[16px]'>
                                Log in to your account to continue
                            </span>
                        </div>
                        <div
                            className='w-[100%] flex flex-col gap-1 relative'>
                            <label htmlFor="email-input"
                                className='text-sec-text pl-1 text-[13px] md:text-[15px] lg:text-[17px]'>Email</label>

                            <label htmlFor='email-input'
                                className='absolute bottom-1 md:bottom-2 left-1 md:left-2 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] md:size-[45px] 
                            text-[24px] md:text-[34px]'>
                                <HiOutlineMail />
                            </label>
                            <input id='email-input' type="email"
                                value={state.email} onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
                                placeholder='Enter your email' required
                                className='border-divider 
                            border-1 focus:outline-1 pl-9 md:pl-15 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1.5 md:py-3.5 text-main-text text-[16px] md:text-[20px]' />
                        </div>
                        <div
                            className='w-[100%] flex flex-col gap-1 relative'>
                            <label htmlFor="pass-input"
                                className='text-sec-text pl-1 text-[13px] md:text-[15px] lg:text-[17px]'>Password</label>

                            <label htmlFor='pass-input'
                                className='absolute bottom-1 md:bottom-2 left-1 md:left-2 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] md:size-[45px] 
                            text-[24px] md:text-[34px]'>
                                <HiOutlineLockClosed />
                            </label>
                            <input id='pass-input' type={visible ? 'text' : 'password'}
                                placeholder='Enter your password' required
                                value={state.pass} onChange={(e) => setState(prev => ({ ...prev, pass: e.target.value }))}
                                className='border-divider 
                            border-1 focus:outline-1 pl-9 md:pl-15 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1.5 md:py-3.5 text-main-text text-[16px] md:text-[20px]' />
                        </div>
                        <button
                            type='submit'
                            className='w-full mt-3 h-[35px] md:h-[50px] rounded-lg bg-linear-0 text-white text-[13px] md:text-[15px] lg:text-[17px] font-[600]
                         to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600
                         shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'>
                            Log In
                        </button>

                    </form>
                    {/* login form */}
                </div>
                <div className='flex items-center justify-center gap-1.5 w-full'>
                    {/* divider */}
                    <div className='border-b-1 border-divider/60 w-[42%]'></div>
                    <span className='text-low-text/70 '>or</span>
                    <div className='border-b-1 border-divider/60 w-[42%]'></div>
                </div>
                <div
                    className='w-full text-center flex justify-center items-center gap-1'>
                    <span className='text-sec-text  text-[13px] md:text-[15px] lg:text-[17px]'>
                        Don't have an account?
                    </span>
                    <span onClick={() => navigate('/register')}
                        className='text-active-border/70 active:text-active-border font-[600]  text-[13px] md:text-[15px] lg:text-[17px]
                    hover:underline active:underline  cursor-pointer'>Sign Up</span>
                </div>

            </div>
        </div>
    )
}